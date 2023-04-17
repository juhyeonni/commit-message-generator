import path from 'path';
import fs from 'fs';

const applicationDir = path.resolve(__dirname, '..');
const apiKeyFilePath = path.resolve(applicationDir, '.apikey');

/**
 * Get the API key from the .apikey file
 * @returns {string} The API key
 */
function getApiKey(): string {
  if (!fs.existsSync(apiKeyFilePath)) {
    throw new Error('API key must be set');
  }
  const apiKeyFile = fs.readFileSync(apiKeyFilePath);
  const apiKey = apiKeyFile.toString().split('=')[1];

  return apiKey;
}

/**
 * Set the API key to the .apikey file
 */
function setApiKey(apiKey: string): void {
  const data = `OPENAI_API_KEY=${apiKey}`;

  fs.writeFileSync(apiKeyFilePath, data);
}

export { getApiKey, setApiKey };
