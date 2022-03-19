import * as vscode from 'vscode';
import { IParsedPNPMWorkspaceYAMLContent } from '../Commands/Scanner';
import { ExtensionConfiguration } from '../Configurations';
import * as yaml from 'js-yaml';
import { Logger } from '../Utils/Logger';

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

    const packagesDir = parsed.packages;

    for (const dir of packagesDir) {
      // console.log('nnn', await vscode.workspace.findFiles(dir));
    }
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
