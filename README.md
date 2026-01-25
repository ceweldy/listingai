# ListingAI 🚀

AI-powered product listing generator for eBay, Amazon, Etsy, and more.

## Features

- 🎯 Optimized titles, descriptions, and keywords
- ⚡ Generate listings in under 60 seconds
- 💳 Pay-per-listing ($0.50) or unlimited ($19/mo)
- 🛒 Supports eBay, Amazon, Etsy, Poshmark, Mercari, and more

## Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ceweldy/listingai&env=OPENAI_API_KEY,STRIPE_SECRET_KEY,NEXT_PUBLIC_BASE_URL)

## Manual Setup

1. **Clone the repo:**
   ```bash
   git clone https://github.com/ceweldy/listingai
   cd listingai
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your keys
   ```

3. **Run locally:**
   ```bash
   npm run dev
   ```

4. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import the GitHub repo
   - Add environment variables:
     - `OPENAI_API_KEY` - Your OpenAI API key
     - `STRIPE_SECRET_KEY` - Your Stripe secret key  
     - `NEXT_PUBLIC_BASE_URL` - Your deployed URL

## Environment Variables

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | OpenAI API key for GPT-4o-mini |
| `STRIPE_SECRET_KEY` | Stripe secret key for payments |
| `NEXT_PUBLIC_BASE_URL` | Your deployed URL (e.g., https://listingai.vercel.app) |

## Pricing Model

- **Free**: 3 listings (no account needed)
- **Credits**: $0.50/listing (buy 10+ at a time)
- **Unlimited**: $19/month

## TODO

- [ ] User authentication (for tracking credits)
- [ ] Credit tracking system
- [ ] Stripe webhook for payment confirmation
- [ ] Image upload for AI-enhanced descriptions
- [ ] Listing templates/history

## License

MIT
