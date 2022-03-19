import { PackageJson } from 'type-fest';
import * as vscode from 'vscode';

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
  public static resolveCurrentWorkspaceAbsolutePath() {
    const wsPath = vscode.workspace.workspaceFolders![0].uri.fsPath;
    return wsPath;
  }

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

  public static createFile(filePath: string, fileContent: string) {
    const wsedit = new vscode.WorkspaceEdit();
    const wsPath = vscode.workspace.workspaceFolders![0].uri.fsPath;
    const fileUri = vscode.Uri.file(wsPath + filePath);

    wsedit.createFile(fileUri, { ignoreIfExists: true });

    wsedit.insert(fileUri, new vscode.Position(0, 0), fileContent);

    vscode.workspace.applyEdit(wsedit);
    vscode.workspace.openTextDocument(fileUri);

    vscode.window.showInformationMessage(`Created file: ${filePath}`);
  }

  public static readPackageJson(packageDir?: string): PackageJson {
    const wsPath = vscode.workspace.workspaceFolders![0].uri.fsPath;
    const packageJsonPath = `${packageDir ?? wsPath}/package.json`;
    const packageJson = require(packageJsonPath);
    return packageJson;
  }

  public static processDepsRecord(
    dependencies: Record<string, string> = {},
    devDependencies: Record<string, string> = {}
  ) {
    return {
      dependenciesWithVersion: [...Object.entries(dependencies)].reduce<
        string[]
      >((prev, [identifier, version]) => {
        return ['workspace:', 'file:'].includes(version)
          ? prev
          : prev.concat(`${identifier}@${version}`);
      }, []),
      devDependenciesWithVersion: [...Object.entries(devDependencies)].reduce<
        string[]
      >((prev, [identifier, version]) => {
        return ['workspace:', 'file:'].includes(version)
          ? prev
          : prev.concat(`${identifier}@${version}`);
      }, []),
    };
  }
}

export class ProjectWorkspaceScanner {}
