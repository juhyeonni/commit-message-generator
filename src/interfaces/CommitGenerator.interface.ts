import { OpenAIApi } from 'openai';
import { CommitRule } from './CommitRule.interface';

export interface Configuration {
  openai: OpenAIApi;
  rule: CommitRule;
}
