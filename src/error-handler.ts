import chalk from 'chalk';

export function exitWithErrorMessage(process: NodeJS.Process, mesasge: string) {
  process.stderr.write(chalk.red(`${mesasge}\n`));
  process.exit(1);
}
