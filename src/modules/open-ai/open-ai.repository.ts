import { Injectable } from "@nestjs/common";
import { ChatCompletionResponseMessage } from "openai";
import { openai } from "src/shared/lib/open-api";

@Injectable()
export class OpenAiRepository {
  async createChatCompletion(
    content: string,
  ): Promise<ChatCompletionResponseMessage> {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content }],
    });

    return completion.data.choices[0].message;
  }
}
