import { Command } from 'commander';
import { getApiKey, setApiKey } from './utils/apiKey';
import run from './run';
import { AdditionalOptions } from './interfaces/AdditionalOptions.interface';

function cli() {
  const program = new Command()
    .name('cmg')
    .version('1.0.2')
    .usage('[options] <request message>')
    .description(
      '| Commit Message Generator |\n' +
        'Generate commit message from commit rule\n' +
        'if you want to configure commit rule, please edit `commit.rule.json` file',
    )
    .option('-k, --apikey <apikey>', 'set API key for OpenAI')
    .option('-d, --diff <filePath>', 'generate commit message from diffPath')
    .parse(process.argv);

  const reqMsg = program.args[0];

  const options = program.opts();

  const { apikey, diff } = options;
  const additionalOptions: AdditionalOptions = { diffPath: diff };

  // set apikey
  if (apikey) {
    setApiKey(apikey);
    console.log("API key is set, you don't need to set apikey again");
    process.exit(0);
  }

  // get apikey
  const OPENAI_API_KEY = getApiKey();

  if (!OPENAI_API_KEY) {
    console.error('API key must be set');
    program.help();
    process.exit(1);
  }
  run(reqMsg, OPENAI_API_KEY, additionalOptions);
}

export default cli;
