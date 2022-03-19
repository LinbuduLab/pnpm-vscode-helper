import * as vscode from 'vscode';
import { IParsedPNPMWorkspaceYAMLContent } from '../Commands/Scanner';
import { ExtensionConfiguration } from '../Configurations';
import * as yaml from 'js-yaml';
import * as globby from 'globby';
import { Utils } from '../utils';
import { PackageJson } from 'type-fest';
import path = require('path');

export class ExtensionHooks {
  public static async pre() {
    await ExtensionHooks.preCheckShamefullyHoistConfig();
    await ExtensionHooks.preCollectWorkspacePackages();
  }

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
    const packageInfos: string[] = [];

    for (const dirPattern of packagesDirPatterns) {
      const wsPath = Utils.resolveCurrentWorkspaceAbsolutePath();

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
        packageInfos.push(content.name);
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

    // todo: .rc parser
    const [, _ = ''] = content.split('shamefully-hoist=');

    const shamefullyHoistEnabled = _.startsWith('true');

    ExtensionConfiguration.shamefullyHoist.write(shamefullyHoistEnabled);

    shamefullyHoistEnabled &&
      vscode.window.showInformationMessage('shamefully-hoist enabled.');
  }
}
