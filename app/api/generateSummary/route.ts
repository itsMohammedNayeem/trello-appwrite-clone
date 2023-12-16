import openai from "@/openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const { todos } = await request.json();

  // Communicate with OpenAI GPT
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content:
          "When responding, welcome to user and say welcome to the Trello-Clone-App! Limit the response to 200 characters.",
      },
      {
        role: "user",
        content: `Hi there, provide a summary of the following todos. Count how many todos are in each category such as todo, in progress, and done, then tell the user to have a productive day! Here's the data ${JSON.stringify(
          todos
        )}`,
      },
    ],
  });
  const data = response.choices[0].message;

  return NextResponse.json(response.choices[0].message);
}
