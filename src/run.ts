import CommitGenerator from './commit-generator';
import { CommitRule, Configuration } from './interfaces';
import { AdditionalOptions } from './interfaces/AdditionalOptions.interface';
import { getCommitRuleJson } from './utils/commitRule';
import { createOpenAIApi } from './utils/openAIApi';
import { getDiff } from './utils/gitDiff';

async function run(
  reqMsg: string,
  apiKey: string,
  addtionalOptions: AdditionalOptions,
): Promise<void> {
  const { diffPath } = addtionalOptions;

  const rule: CommitRule = getCommitRuleJson();
  const openai = createOpenAIApi(apiKey);

  const configuration: Configuration = {
    rule,
    openai,
  };
  const commitGenerator = new CommitGenerator(configuration);

  if (diffPath) return runWithDiff(commitGenerator, diffPath);
  if (reqMsg) return runCommon(commitGenerator, reqMsg);
}

async function runCommon(commitGenerator: CommitGenerator, reqMsg: string) {
  const msg = await commitGenerator.genCommitMsg(reqMsg);

  console.log(msg);
}

async function runWithDiff(commitGenerator: CommitGenerator, diffPath: string) {
  const diff = await getDiff(diffPath);
  const reqMsg =
    "Below is the result of a git diff. Check out the diffrences and figure out what's changed." +
    diff;

  const msg = await commitGenerator.genCommitMsg(reqMsg);

  console.log(msg);
}

export default run;
