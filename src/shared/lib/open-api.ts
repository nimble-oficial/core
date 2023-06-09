import { Configuration, OpenAIApi } from "openai";

const openApiConfig = new Configuration({
  organization: process.env.OPEN_AI_API_ORGANIZATION,
  apiKey: process.env.OPEN_AI_API_KEY,
});

export const openai = new OpenAIApi(openApiConfig);
