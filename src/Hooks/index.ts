import * as vscode from 'vscode';
import * as yaml from 'js-yaml';
import * as globby from 'globby';
import * as path from 'path';

import { PackageJson } from 'type-fest';

import { IParsedPNPMWorkspaceYAMLContent } from '../Commands/Scanner';
import { ExtensionConfiguration } from '../Configurations';
import { Utils } from '../Utils';

export class ExtensionHooks {
  public static async pre(context: vscode.ExtensionContext) {
    await ExtensionHooks.experimentalWorks(context);
    await ExtensionHooks.preCheckShamefullyHoistConfig();
    await ExtensionHooks.preCollectWorkspacePackages();
  }

  public static async preCollectWorkspacePackages() {
    // vscode.window.withProgress(
    //   {
    //     location: vscode.ProgressLocation.Notification,
    //     title: 'I am long running!',
    //     cancellable: true,
    //   },
    //   (progress, token) => {
    //     return new Promise(async (resolve, reject) => {
    //       resolve(void 0);
    //     });
    //   }
    // );
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

    // todo: .rc parser
    const [, _ = ''] = content.split('shamefully-hoist=');

    const shamefullyHoistEnabled = _.startsWith('true');

    ExtensionConfiguration.shamefullyHoist.write(shamefullyHoistEnabled);

    shamefullyHoistEnabled &&
      vscode.window.showInformationMessage('shamefully-hoist enabled.');
  }

  public static async experimentalWorks(context: vscode.ExtensionContext) {
    vscode.window.onDidChangeTerminalState((t) => {
      console.log(t.name);
    });
  }
}
