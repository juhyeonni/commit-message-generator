import { Command } from 'commander';
import prompt from 'password-prompt';
import CommitGenerator from './commit-generator';
import { initConfig, openCmgConfigFile, setApiKey } from './utils/fileStream';
import packageJson from '../package.json';

class CLI extends Command {
  constructor(private commitGenerator: CommitGenerator) {
    super();

    this.name('cmg')
      .version(packageJson.version)
      .description(
        '| Commit Message Generator |\n' +
          'Generate commit message from commit rule\n' +
          "You can configure commit rule by 'cmg config' command",
      )
      .initCommand()
      .parse(process.argv);
  }

  initCommand() {
    this.command('generate <inputContent>')
      .alias('g')
      .description('Generate commit message')
      .action(this.commitGenerator.generate);

    this.command('diff <filePath>')
      .alias('d')
      .description('Detect the changes and generate a commit message.')
      .action(this.commitGenerator.diffGenerate);

    this.command('setkey')
      .alias('s')
      .description('Set API key for OpenAI')
      .action(this.setApiKey);

    this.command('setmodel')
      .description('Set model for OpenAI')
      .action(this.setAIModel);

    this.command('config')
      .description('Configure commit rule')
      .option('-s, --set', 'Set commit rule')
      .action(this.configureRule);

    this.command('init')
      .description(
        "Initialize the project commit rule config 'cmg-config.json'",
      )
      .action(this.initConfig);

    return this;
  }

  setApiKey() {
    prompt('API key: ').then(apiKey => {
      console.log("API key is set, you don't need to set apikey again");
      setApiKey(apiKey);
    });
  }

  getAIModel() {
    console.log('get AI model');
  }

  setAIModel() {
    console.log('set AI model');
  }

  // TODO: 룰을 브라우징할 수 있는 기능 추가
  configureRule(options: { set: boolean }) {
    console.log('configure rule');

    if (options.set) {
      console.log('Rule file selection is not yet implemented!');
    } else {
      openCmgConfigFile('cmg-config.json');
    }
  }

  initConfig() {
    console.log('init config');

    initConfig();
  }
}

export default CLI;
