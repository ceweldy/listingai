import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { productName, platform, condition, features, category } = await request.json();

    if (!productName) {
      return NextResponse.json({ error: 'Product name is required' }, { status: 400 });
    }

    const prompt = `You are an expert e-commerce listing writer. Generate an optimized product listing for ${platform}.

Product: ${productName}
Condition: ${condition}
${category ? `Category: ${category}` : ''}
${features ? `Additional Details: ${features}` : ''}

Generate the following in JSON format:
1. "title" - An optimized, keyword-rich title (max 80 chars for eBay, 200 for Amazon)
2. "description" - A compelling product description (2-3 paragraphs, professional but friendly tone)
3. "bulletPoints" - Array of 5 key selling points/features (short, punchy)
4. "keywords" - Array of 8-10 relevant search keywords

Make sure to:
- Include relevant keywords naturally in the title and description
- Highlight the condition and any unique features
- Use persuasive language that converts browsers to buyers
- Be accurate and don't make claims not supported by the provided details
- Format appropriately for ${platform}'s style

Respond ONLY with valid JSON, no markdown or explanation.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert e-commerce copywriter. Always respond with valid JSON only, no markdown formatting.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = completion.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No response from AI');
    }

    // Parse the JSON response
    let listing;
    try {
      // Remove any markdown code blocks if present
      const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
      listing = JSON.parse(cleanContent);
    } catch {
      console.error('Failed to parse AI response:', content);
      throw new Error('Failed to parse listing');
    }

    return NextResponse.json(listing);
  } catch (error) {
    console.error('Generate error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate listing' },
      { status: 500 }
    );
  }
}
