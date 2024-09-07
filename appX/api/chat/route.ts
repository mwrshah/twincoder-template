import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { bedrock } from '@ai-sdk/amazon-bedrock';

import { streamText, convertToCoreMessages, StreamData } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const data = new StreamData();
  data.append({ test: 'value' });

  const result = await streamText({
    model: openai('gpt-4-turbo'),
    messages: convertToCoreMessages(messages),
    onFinish() {
      data.close();
    },
  });

  return result.toDataStreamResponse({ data });
}
