import { OpenAIApi, Configuration } from 'openai';

function createOpenAIApi(apiKey: string): OpenAIApi {
  // Set up OpenAI API configuration
  const configuration = new Configuration({
    apiKey: apiKey,
  });

  // Create OpenAI API instance
  const openai = new OpenAIApi(configuration);

  return openai;
}

export { createOpenAIApi };
