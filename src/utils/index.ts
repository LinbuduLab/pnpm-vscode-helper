export interface ICommandRegistry {
  command: string;
  callback: (...args: any[]) => any;
}

export class Constants {
  public static get ExtensionPrefix() {
    return 'pnpm-vscode-helper';
  }

  public static get ExtensionIdentifier() {
    return 'pnpm-vscode-helper';
  }

  public static get PackageJsonMatcher() {
    return new RegExp(/\/package\.json$/);
  }
}

export class Utils {
  public static composeCommand(command: string) {
    return `${Constants.ExtensionIdentifier}.${command}`;
  }

  public static composeDepsFieldMatcher(word: string) {
    return new RegExp(
      `"(dependencies|devDependencies)":\\s*?\\{[\\s\\S]*?${word.replace(
        /\//g,
        '\\/'
      )}[\\s\\S]*?\\}`,
      'gm'
    );
  }

  public static resolveWorkSpaceModulePath(
    workDir: string,
    moduleName: string
  ) {
    return `${workDir}/node_modules/${moduleName.replace(/"/g, '')}`;
  }
}

export class ProjectWorkspaceScanner {}
