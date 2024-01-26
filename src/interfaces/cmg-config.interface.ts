import OpenAI from 'openai';

export interface CmgConfig extends CommitRule {
  gpt_model: OpenAI.Chat.ChatCompletionCreateParams['model'];
}

export interface CommitRule {
  format: string;
  commitTypes: [
    {
      type: string;
      description: string;
    },
  ];
  localRules: string[];
}
