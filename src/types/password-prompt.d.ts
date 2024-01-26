declare module 'password-prompt' {
  interface PromptOptions {
    method?: 'mask' | 'hide';
    required?: boolean;
    default?: string;
  }

  function prompt(ask: string, options?: PromptOptions): Promise<string>;

  export = prompt;
}
