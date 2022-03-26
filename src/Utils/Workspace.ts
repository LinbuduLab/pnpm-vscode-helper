import * as vscode from 'vscode';
import * as yaml from 'js-yaml';
import * as globby from 'globby';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as ini from 'ini';

import { PackageJson } from 'type-fest';

import { IParsedPNPMWorkspaceYAMLContent } from '../Commands/Scanner';
import { ExtensionConfiguration } from '../Configurations';
import { Utils } from '../Utils';
import { FeatureStatusType, FEATURE_STATUS_ITEMS } from '../Constants/Shared';
import { groupBy } from 'lodash';

export class WorkspaceUtils {
  public static async checkInsidePNPMWorkspace(showMessage = false) {
    const pnpmWorkspaceConfigFile = path.posix.resolve(
      vscode.workspace.workspaceFolders![0].uri.fsPath,
      'pnpm-workspace.yaml'
    );

    if (!fs.existsSync(pnpmWorkspaceConfigFile)) {
      showMessage &&
        vscode.window.showInformationMessage(
          'pnpm-workspace.yaml not found in current project, workspace related commands not available.'
        );
      return false;
    }

    return true;
  }

  public static resolveCurrentWorkspaceAbsolutePath() {
    const wsPath = vscode.workspace.workspaceFolders![0].uri.fsPath;
    return wsPath;
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

    vscode.window.showInformationMessage(
      `File ${filePath} created successfully.`
    );
  }

  public static async createConfirmDialog(message: string): Promise<boolean> {
    const confirm = await vscode.window.showInformationMessage(
      message,
      'Confirm',
      'Cancel'
    );

    return confirm === 'Confirm';
  }

  public static async collectWorkspacePackages() {
    const pnpmWorkspaceConfigFile = await vscode.workspace.findFiles(
      'pnpm-workspace.yaml',
      '**/node_modules/**',
      1
    );

    if (!pnpmWorkspaceConfigFile.length) {
      vscode.window.showWarningMessage(
        'File pnpm-workspace.yaml not found in current workspace.'
      );
      return;
    }

    const content = await vscode.workspace.fs.readFile(
      pnpmWorkspaceConfigFile[0]
    );

    const parsed = <IParsedPNPMWorkspaceYAMLContent>(
      yaml.load(content.toString())
    );

    const { ignorePatterns = [], matcherPatterns = [] } = groupBy(
      parsed.packages,
      (p) => (p.startsWith('!') ? 'ignorePatterns' : 'matcherPatterns')
    );

    const packageDirs: string[] = [];
    const packageInfos: Record<string, string> = {};

    for (const dirPattern of matcherPatterns) {
      const wsPath = Utils.Workspace.resolveCurrentWorkspaceAbsolutePath();

      const result = globby.sync(`${dirPattern}`, {
        cwd: wsPath,
        expandDirectories: false,
        deep: 1,
        onlyDirectories: true,
        absolute: true,
        ignore: ignorePatterns,
      });

      packageDirs.push(...result);
    }

    // vscode.window.showInformationMessage(
    //   `${packageDirs.length} packages found.`
    // );

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

    return packageInfos;
  }

  public static async createStatusSelector(feature: string, current: boolean) {
    const result = <FeatureStatusType>((await vscode.window.showQuickPick(
      FEATURE_STATUS_ITEMS,
      {
        placeHolder: `Enable/Disable ${feature}, current status: ${
          current ? 'Enabled' : 'Disabled'
        }`,
      }
    )) ?? 'enable');

    return result === 'enable';
  }

  public static async selectMultiplePackages(placeHolder?: string) {
    const workspacePackages =
      (await Utils.Workspace.collectWorkspacePackages()) ?? {};

    const workspacePackagesChoices = Object.keys(workspacePackages);

    if (!workspacePackagesChoices.length) {
      vscode.window.showInformationMessage(
        'No packages found in current workspace'
      );
      return;
    }

    const selectedTargetPackage = await vscode.window.showQuickPick(
      workspacePackagesChoices,
      { canPickMany: true, placeHolder }
    );

    if (!selectedTargetPackage?.length) {
      return null;
    }

    return {
      workspacePackages,
      selectedTargetPackage,
    };
  }
}
