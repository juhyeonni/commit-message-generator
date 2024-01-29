import path from 'path';
import fs from 'fs';
import os from 'os';
import { exec } from 'child_process';
import { CmgConfig, CommitRule } from '../interfaces/cmg-config.interface';

const applicationDir = path.resolve(__dirname, '..');
const cmgConfigPath = path.resolve(applicationDir, './cmg-config.json');
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

export function initConfig() {
  const cmgConfig = {
    format: '<type>(<scope>): <subject>\n<optional body>\n<optional footer>',
    commitTypes: [
      {
        type: '✨ feat',
        description: 'Introduces a new feature to the application',
      },
      {
        type: '🐛 fix',
        description: 'Fixes a bug in the application',
      },
      {
        type: '📚 docs',
        description: 'Updates to documentation',
      },
      {
        type: '💎 style',
        description: 'Improves the format/structure of the code',
      },
      {
        type: '🔨 refactor',
        description: 'Code change that neither fixes a bug nor adds a feature',
      },
      {
        type: '🚀 perf',
        description: 'Improves performance',
      },
      {
        type: '🚨 test',
        description: 'Adds missing tests or corrects existing ones',
      },
      {
        type: '📦 build',
        description:
          'Changes that affect the build system or external dependencies',
      },
      {
        type: '👷 ci',
        description: 'Changes to our CI configuration files and scripts',
      },
      {
        type: '🔧 chore',
        description:
          'Routine task or maintenance, updates to the build process or auxiliary tools/libraries',
      },
      {
        type: '🎉 init',
        description: 'Initialize the project',
      },
      {
        type: '🔖 release',
        description: 'Release a new version',
      },
      {
        type: '➕ plus',
        description: 'add dependency',
      },
      {
        type: '➖ minus',
        description: 'remove dependency',
      },
    ],
    localRules: [
      '<scope> is indicates the scope affected by the change. Optional (if not given, do not add)',
      "<subject> is a short summary of the commit. Write it in 50 characters or less and don't include periods",
      '<body> is a longer description of the commit. Optional (if not given, do not add)',
      '<footer> is a place to put additional information about the commit. Optional (if not given, do not add)',
      "if the request doesn't make sense, return 'request error'",
      "If the 'Type of Commit' has an emoji, include that emoji in the <type>.",
      'Please writing commit message in English',
    ],
    gpt_model: 'gpt-3.5-turbo',
  };

  fs.writeFileSync(cmgConfigPath, JSON.stringify(cmgConfig));
}
