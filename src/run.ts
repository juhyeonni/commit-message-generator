import CommitGenerator from './commit-generator';
import OpenAI from 'openai';
import CLI from './cli';
import { getAIModel, getApiKey, getCommitRule } from './utils/fileStream';
import RequestFormatter from './formatter';

function run() {
  const openai = new OpenAI({
    apiKey: getApiKey(),
  });
  const model = getAIModel();
  const formatter = new RequestFormatter(4096, getCommitRule());

  const commitGenerator = new CommitGenerator(openai, model, formatter);

  new CLI(commitGenerator);
}

export default run;
