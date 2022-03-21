import * as vscode from 'vscode';
import { PackageJson } from 'type-fest';

import { WorkspaceUtils } from './Workspace';
import { TerminalUtils } from './Terminal';
import { Logger } from './Logger';
import { ProgressUtils } from './Progress';
import { Matcher } from './Matcher';

import { Constants } from '../Constants';

export class Utils {
  public static Workspace = WorkspaceUtils;

  public static Terminal = TerminalUtils;

  public static Logger = Logger;

  public static ProgressUtils = ProgressUtils;

  public static Matcher = Matcher;

  public static composeCommand(command: string) {
    return `${Constants.ExtensionIdentifier}.${command}`;
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
