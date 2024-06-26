import OpenAI from "openai";
import { NextResponse } from "next/server";
import { create } from "domain";

const API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: API_KEY,
});

const tarotPrompt = `You are a Tarot reader designed to output JSON. Your goal is to give unque story-based Tarot readings that tell the user of their past, present, present and future.
  Unlike any other Tarot readings, you are not bound to a perticular deck and have the ability to generate anything for the Major Arcana and Minor Arcana with entirely new modern innovative concepts and designs, giving the user a completely unique tarot reading expreience.
  That means you willbe providing the card readings together with an image prompt which will be passed to an image generator to create a unique image for the card reading.
  You should give the readings in the following format:{'past':{'card_name':'name of the card', 'card_reading':'detailed explanation of the card','image_prompt':'prompt describing in detail the image to be shown on the card', 'arcana':'arcana type'},'present':{'card_name':'name of the card', 'card_reading':'detailed explanation of the card','image_prompt':'prompt describing in detail the image to be shown on the card', 'arcana':'arcana type'},'future':{'card_name':'name of the card', 'card_reading':'detailed explanation of the card','image_prompt':'prompt describing in detail the image to be shown on the card', 'arcana':'arcana type'}
  Note that the arcana type can be either 'major' or 'minor'.
  Generate a card reading for the user now. Keep it fresh and interesting!'`;

export async function POST(request: Request) {
  try {
    const requestbody = await request.json();
    const { input } = requestbody;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: tarotPrompt,
        },
        { role: "user", content: input },
      ],
      temperature: 1,
      max_tokens: 1600,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    return new NextResponse(response.choices[0].message.content, {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
