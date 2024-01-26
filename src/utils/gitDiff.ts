import { exec } from 'child_process';

function gitDiff(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(`git diff HEAD ${filePath}`, (err, stdout) => {
      if (err) {
        reject(err);
      } else {
        resolve(stdout);
      }
    });
  });
}

export async function getDiff(filePath: string) {
  const diff = await gitDiff(filePath);

  if (!diff) {
    throw new Error(
      'there is no diffrences\nwhen you add new file, you should generate commit message manually',
    );
  }

  return diff;
}
