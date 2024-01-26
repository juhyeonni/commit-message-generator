import { CommitRule } from './interfaces/cmg-config.interface';
import { Formatter } from './interfaces/formatter.interface';

class RequestFormatter implements Formatter {
  constructor(
    private maxTokens: number,
    private commitRule: CommitRule,
  ) {
    this.formatRequestMessage = this.formatRequestMessage.bind(this);
    this.splitMessageIntoChunks = this.splitMessageIntoChunks.bind(this);
  }

  formatRequestMessage(requestMessage: string): string[] {
    const { commitTypes, format, localRules } = this.commitRule;

    const typeConventions = commitTypes
      .map(item => `- ${item.type}: ${item.description}`)
      .join('\n');

    const localRulesString = localRules
      .map(localRule => `- ${localRule}`)
      .join('\n');

    const ruleString =
      'Write a commit message following the format and rules below\n' +
      '## Format\n' +
      `${format}\n` +
      '## Rules\n' +
      '### Type of Commit\n' +
      `${typeConventions}\n` +
      '### Local Rules\n' +
      `${localRulesString}\n` +
      '## Request Message\n' +
      `${requestMessage}\n`;

    const requests = this.splitMessageIntoChunks(ruleString);

    return requests;
  }

  private splitMessageIntoChunks(message: string): string[] {
    const chunks = [];

    while (message.length > 0) {
      const chunk = message.substring(0, this.maxTokens);
      message = message.substring(this.maxTokens);
      chunks.push(chunk);
    }

    return chunks;
  }
}

export default RequestFormatter;
