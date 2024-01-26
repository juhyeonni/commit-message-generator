# commit-message-generator

OpenAI사의 GPT 모델을 활용하여 **커밋 메시지**를 대신 작성해주는 패키지이다.  
기본으로 설정된 GPT 모델은 `gpt-3.5-turbo` 입니다.

## Installation

[[npmjs] commit-message-generator](https://www.npmjs.com/package/commit-message-generator)

`npm` 또는 `yarn`을 사용하여 패키지를 설치할 수 있다.

- yarn

```bash
yarn global add commit-message-generator
```

- npm

```bash
npm install -g commit-message-generator
```

## 🤔 Usage

### **⭐️ API KEY 등록하기(required)**

`setkey` 명령어를 사용하여 `openai api key`를 등록한다.

```bash
cmg setkey
```

### 작업내용을 나열하여 직접 커밋메시지를 생성

1. `generate` 명령어와 인자값으로 커밋하고 싶은 내용을 작성한다.

```bash
cmg generate <request message>

or

cmg g <request message>
```

2. 내용을 확인한다.

```bash
cmg generate "프로젝트 초기화 작업"

# output
🎉 init: Initialize the project
```

### 지정된 파일/디렉토리의 변경사항을 파악하여 자동으로 커밋메시지를 작성

1. `diff` 명령어를 사용하여 파일/디렉토리를 지정

```bash
cmg diff <filePath>

or

cmg d <filePath>
```

2. 내용을 확인한다.

```bash
cmg diff src/components/TestComponent

# output
feat: add console log for testing
```

![add_testcode](https://user-images.githubusercontent.com/64972038/233854228-064bcef6-0676-4bbb-8403-90eb26b67399.png)

## 🛠️ Configuration

###  커밋 룰 설정
`config` 명령어를 사용하여 커밋 규칙을 설정할 수 있다. 
실행 시 config 파일을 열 수 있다.

```bash
cmg config
```
이 파일을 사용자가 자유롭게 수정가능하다.

- `format`: 출력 커밋 메시지의 형식이다.
- `commitTypes`: 커밋의 형식을 정의한다.
- `localRules`: 커밋 메시지의 제한을 둘 수 있다.
- `gpt_model`: GPT Model을 설정한다.

### GPT 모델 설정하기 (미구현!)
`setmodel` 명령어를 사용하여 사용할 AI 모델을 설정할 수 있다.

```bash
cmg setmodel
```


