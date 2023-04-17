import { OpenAIApi } from 'openai';
import { Configuration, CommitRule } from './interfaces';

class CommitGenerator {
  private formattedRule: string;
  private openai: OpenAIApi;

  constructor(configuration: Configuration) {
    const { rule, openai } = configuration;

    this.openai = openai;
    this.formattedRule = this.formatRule(rule);
  }

  formatRule(rule: CommitRule): string {
    const { commitFormat, typeOfCommit, localRules }: CommitRule = rule;

    const typeOfCommitString = typeOfCommit
      .map(item => `- ${item.type}: ${item.description}`)
      .join('\n');

    const localRulesString = localRules.map(localRule => `- ${localRule}`).join('\n');

    const ruleString =
      'Write a commit message following the format and rules below.\n' +
      '## Format\n' +
      `${commitFormat}\n` +
      '## Rules\n' +
      '### Type of Commit\n' +
      `${typeOfCommitString}\n` +
      '### Local rules\n' +
      `${localRulesString}\n`;

    return ruleString;
  }

  async genCommitMsg(reqMessage: string): Promise<string> {
    const prompt = `${this.formattedRule} request: ${reqMessage}`;

    const completion = await this.openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      max_tokens: 100,
      temperature: 0.3,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return completion.data.choices[0].message?.content || 'failed to generate commit message';
  }
}

export default CommitGenerator;
