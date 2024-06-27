import OpenAI from "openai";
import { NextResponse } from "next/server";
import { create } from "domain";

const API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: API_KEY,
});

export async function POST(request: Request) {
  try {
    const requestbody = await request.json();
    const { input } = requestbody;
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: input,
      n: 1,
      size: "1024x1024",
    });
    return new NextResponse(JSON.stringify(response.data[0].url), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
