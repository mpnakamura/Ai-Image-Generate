import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: NextRequest) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'POSTメソッドのみ受け付けます' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const { prompt } = await request.json();

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data[0].url;
    return new Response(JSON.stringify({ imageUrl }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'APIリクエストに失敗しました' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
