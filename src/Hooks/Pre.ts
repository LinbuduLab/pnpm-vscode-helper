import * as vscode from 'vscode';
import * as yaml from 'js-yaml';
import * as globby from 'globby';
import * as path from 'path';
import * as ini from 'ini';

import { PackageJson } from 'type-fest';

import { IParsedPNPMWorkspaceYAMLContent } from '../Commands/Scanner';
import { ExtensionConfiguration } from '../Configurations';
import { Utils } from '../Utils';

export class ExtensionPreHook {
  public static async preCollectWorkspacePackages() {
    const pnpmWorkspaceConfigFile = await vscode.workspace.findFiles(
      'pnpm-workspace.yaml',
      '**/node_modules/**',
      1
    );

    if (!pnpmWorkspaceConfigFile.length) {
      vscode.window.showWarningMessage('file pnpm-workspace.yaml is not found');
      return;
    }

    const content = await vscode.workspace.fs.readFile(
      pnpmWorkspaceConfigFile[0]
    );

    const parsed = <IParsedPNPMWorkspaceYAMLContent>(
      yaml.load(content.toString())
    );

    const packagesDirPatterns = parsed.packages;

    const packageDirs: string[] = [];
    const packageInfos: Record<string, string> = {};

    for (const dirPattern of packagesDirPatterns) {
      const wsPath = Utils.Workspace.resolveCurrentWorkspaceAbsolutePath();

      const result = globby.sync(`${dirPattern}`, {
        cwd: wsPath,
        expandDirectories: false,
        deep: 1,
        onlyDirectories: true,
        absolute: true,
      });

      packageDirs.push(...result);
    }

    vscode.window.showInformationMessage(
      `${packageDirs.length} packages found.`
    );

    for (const packageDir of packageDirs) {
      const packageJsonDir = path.posix.resolve(packageDir, 'package.json');

      const content = <PackageJson>JSON.parse(
        (
          await vscode.workspace.fs.readFile(
            vscode.Uri.from({
              path: packageJsonDir,
              scheme: 'file',
            })
          )
        ).toString()
      );

      if (content.name) {
        packageInfos[content.name] = packageDir;
      }
    }

    ExtensionConfiguration.packages.write(packageInfos);
  }

  public static async preCheckShamefullyHoistConfig() {
    const npmRC = await vscode.workspace.findFiles(
      '.npmrc',
      '**/node_modules/**',
      1
    );

    if (!npmRC.length) {
      // todo: remove
      vscode.window.showWarningMessage('file .npmrc is not found');
      return;
    }

    const content = (await vscode.workspace.fs.readFile(npmRC[0])).toString();

    const parsed = ini.parse(content);

    const shamefullyHoistEnabled = parsed['shamefully-hoist'] ?? false;

    ExtensionConfiguration.shamefullyHoist.write(shamefullyHoistEnabled);

    shamefullyHoistEnabled &&
      vscode.window.showInformationMessage('shamefully-hoist enabled.');
  }
}
