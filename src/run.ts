import CommitGenerator from './commit-generator';
import { CommitRule, Configuration } from './interfaces';
import { getCommitRuleJson } from './utils/commitRule';
import { createOpenAIApi } from './utils/openAIApi';

async function run(reqMsg: string, apiKey: string): Promise<void> {
  const rule: CommitRule = getCommitRuleJson();
  const openai = createOpenAIApi(apiKey);

  const configuration: Configuration = {
    rule,
    openai,
  };

  const commitGenerator = new CommitGenerator(configuration);
  const msg = await commitGenerator.genCommitMsg(reqMsg);

  console.log(msg);
}

export default run;
