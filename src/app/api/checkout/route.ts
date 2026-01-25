import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(request: NextRequest) {
  try {
    const { plan, quantity } = await request.json();

    let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    let mode: Stripe.Checkout.SessionCreateParams.Mode = 'payment';

    if (plan === 'credits') {
      // Pay-per-listing credits ($0.50 each, minimum 10)
      const numCredits = Math.max(10, quantity || 10);
      lineItems = [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${numCredits} Listing Credits`,
              description: 'AI-generated product listings. Never expire.',
            },
            unit_amount: 50, // $0.50 in cents
          },
          quantity: numCredits,
        },
      ];
    } else if (plan === 'unlimited') {
      // Monthly subscription
      mode = 'subscription';
      lineItems = [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'ListingAI Unlimited',
              description: 'Unlimited AI-generated listings per month',
            },
            unit_amount: 1900, // $19.00 in cents
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ];
    } else {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/generate`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Checkout failed' },
      { status: 500 }
    );
  }
}
