import path from 'path';
import fs from 'fs';
import os from 'os';
import { exec } from 'child_process';
import { CmgConfig, CommitRule } from '../interfaces/cmg-config.interface';

const applicationDir = path.resolve(__dirname, '..');
const cmgConfigPath = path.resolve(applicationDir, './cmgConfig.json');
const apiKeyFilePath = path.resolve(applicationDir, '.apikey');

/**
 * getCommitRule function
 *
 * This function reads a JSON file from the file system at the path specified by `commitRuleJsonPath`.
 * It then parses the content of the file into a JavaScript object and casts it to the `CommitRule` type.
 *
 * @returns {CommitRule} The parsed content of the JSON file as a `CommitRule` object.
 */
export function getCommitRule(): CommitRule {
  const cmgConfigFile = fs.readFileSync(cmgConfigPath);
  const commitRule = JSON.parse(cmgConfigFile.toString()) as CommitRule;

  return commitRule;
}

export function openCmgConfigFile(filePath: string) {
  const osType = os.type();
  const cmgConfigFilePath = path.resolve(applicationDir, filePath);

  switch (osType) {
    case 'Windows_NT':
      exec(`start ${cmgConfigFilePath}`, error => {
        if (error) {
          console.error(error.message);
        }
      });
      break;
    case 'Linux':
      exec(`xdg-open ${cmgConfigFilePath}`, error => {
        if (error) {
          console.error(error.message);
        }
      });
      break;
    case 'Darwin':
      exec(`open ${cmgConfigFilePath}`, error => {
        if (error) {
          console.error(error.message);
        }
      });
      break;
    default:
      throw new Error(`Unsupported OS found: ${osType}`);
  }
}

/**
 * Get the API key from the .apikey file
 * @returns {string} The API key
 */
export function getApiKey(): string {
  if (!fs.existsSync(apiKeyFilePath)) {
    fs.writeFileSync(apiKeyFilePath, '');
  }
  const apiKeyFile = fs.readFileSync(apiKeyFilePath);
  const apiKey = apiKeyFile.toString();

  if (!apiKey) {
    console.error(
      '⚠️  API key is not set yet. Please set API key first. Use `setkey` command to set API key.',
    );
  }

  return apiKey;
}

/**
 * Set the API key to the .apikey file
 */
export function setApiKey(apiKey: string): void {
  fs.writeFileSync(apiKeyFilePath, apiKey);
}

export function getAIModel() {
  const cmgConfigFile = fs.readFileSync(cmgConfigPath);
  const cmgConfig = JSON.parse(cmgConfigFile.toString()) as CmgConfig;

  return cmgConfig.gpt_model;
}

export function setAIModel(model: string) {
  const cmgConfigFile = fs.readFileSync(cmgConfigPath);
  const cmgConfig = JSON.parse(cmgConfigFile.toString()) as CmgConfig;
  cmgConfig.gpt_model = model;

  fs.writeFileSync(cmgConfigPath, JSON.stringify(cmgConfig));
}
