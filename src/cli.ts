import { Command } from 'commander';
import { getApiKey, setApiKey } from './utils/apiKey';
import run from './run';

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
    .parse(process.argv);

  const reqMsg = program.args[0];

  const options = program.opts();

  const { apikey } = options;

  if (apikey) {
    setApiKey(apikey);
    console.log("API key is set, you don't need to set apikey again");
    process.exit(0);
  }

  if (!reqMsg) {
    console.error('request message must be set');
    program.help();
    process.exit(1);
  }

  // get apikey
  const OPENAI_API_KEY = getApiKey();

  if (!OPENAI_API_KEY) {
    console.error('API key must be set');
    program.help();
    process.exit(1);
  }

  run(reqMsg, OPENAI_API_KEY);
}

export default cli;

// // console.log(options.apikey);
// console.log(program.args);

// const reqMsg = program.args[0];

// // TODO: apikey가 있는지 확인한다.
// // - 없으면 apikey를 입력받도록 usage를 출력한다.
// // - 있으면 commit-generator를 실행한다.

// // OPENAI_API_KEY를 입력받아서 .env 파일에 저장한다.
