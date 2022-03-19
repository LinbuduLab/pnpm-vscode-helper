import consola from 'consola';

export class Logger {
  identifier: string;

  constructor(identifier: string) {
    this.identifier = `[pnpm-vscode-helper] ${identifier}`;
  }

  public log(...args: any[]) {
    consola.log(this.identifier, args);
  }

  public error(...args: any[]) {
    consola.error(this.identifier, args);
  }
}
