export interface ICommandRegistry {
  command: string;
  callback: (...args: any[]) => any;
}

export class Constans {
  public static get ExtensionPrefix() {
    return 'pnpm-vscode-helper';
  }
}

export class Utils {
  public static composeCommand(command: string) {
    return `${Constans.ExtensionPrefix}.${command}`;
  }
}
