# commit-message-generator

OpenAI사의 `GPT3.5 turbo`을 활용한 commit message를 대신 작성해주는 패키지이다.

`GPT3.5 turbo` 모델에서 지원하는 언어는 모두 사용이 가능하다.

## Installation

`npm` 또는 `yarn`을 사용하여 패키지를 설치할 수 있다.

- yarn

```bash
yarn global add commit-message-generator
```

- npm

```bash
npm install -g commit-message-generator
```

## Usage

1. `-k` 옵션 또는 `--apikey` 옵션을 사용하여 `openai api key`를 등록한다.

```bash
cmg -k <apikey>
```

2. 인자값으로 커밋하고 싶은 내용을 작성한다.

```bash
cmg <reqeust message>
```

3. 내용을 확인한다.

```bash
cmg "프로젝트 초기화 작업"

# output
🎉 init: Initialize the project
```

## Configuration

### Format and Rules

해당 패키지가 설치되어 있는 디렉리에 `commit.rule.json` 파일이 있다.

이 파일을 사용자가 자유롭게 수정가능하다.

- `commitFormat`: 출력 커밋 메시지의 형식이다.
- `typeOfCommit`: 커밋의 형식을 정의한다.
- `localRules`: 커밋 메시지의 제한을 둘 수 있다.
