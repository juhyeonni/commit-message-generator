import OpenAI from 'openai';
import { getDiff } from './utils/gitDiff';
import { Formatter } from './interfaces/formatter.interface';

class CommitGenerator {
  constructor(
    private openai: OpenAI,
    private model: OpenAI.Chat.ChatCompletionCreateParams['model'],
    private formatter: Formatter,
  ) {
    this.generate = this.generate.bind(this);
    this.diffGenerate = this.diffGenerate.bind(this);
  }

  async communicate(requests: string[]) {
    const responses = await Promise.all(
      requests.map(chunk =>
        this.openai.chat.completions.create({
          messages: [{ role: 'user', content: chunk }],
          model: this.model,
          temperature: 0.3,
        }),
      ),
    );

    const combinedResponse = responses.reduce(
      (combined, response) =>
        combined + response['choices'][0]['message']['content'],
      '',
    );

    return combinedResponse;
  }

  async generate(inputContent: string) {
    const requests = this.formatter.formatRequestMessage(inputContent);
    const response = await this.communicate(requests);
    console.log(response);
  }

  async diffGenerate(diffPath: string) {
    const diff = await getDiff(diffPath);
    const requests = this.formatter.formatRequestMessage(diff);
    const response = await this.communicate(requests);
    console.log(response);
  }
}

export default CommitGenerator;
