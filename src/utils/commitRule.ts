import path from 'path';
import fs from 'fs';
import { CommitRule } from '../interfaces';

const applicationDir = path.resolve(__dirname, '..');
const commitRuleJsonPath = path.resolve(applicationDir, 'commit.rule.json');

/**
 * Get the commit rule from the commit.rule.json file
 * @returns {CommitRule} The commit rule
 */
function getCommitRuleJson(): CommitRule {
  const ruleFile = fs.readFileSync(commitRuleJsonPath);
  const ruleJson = JSON.parse(ruleFile.toString());
  return ruleJson;
}

export { getCommitRuleJson };
