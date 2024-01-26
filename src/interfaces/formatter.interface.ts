export interface Formatter {
  formatRequestMessage(requestMessage: string): string[];
}
