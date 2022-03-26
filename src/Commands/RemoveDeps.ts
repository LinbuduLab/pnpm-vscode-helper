import * as vscode from 'vscode';
import { ICommandRegistry } from '../Utils/Typings';
import { ExtensionConfiguration } from '../Configurations';
import { Utils } from '../Utils';
import * as path from 'path';
import * as fs from 'fs-extra';
import { PackageJson } from 'type-fest';

export class RemoveDeps {
  public static get SelectWorkspaceDepsAndRemove(): ICommandRegistry {
    return {
      command: 'remove-workspace-root-deps',
      callback: async (args: any) => {
        const workspaceRootPath =
          vscode.workspace.workspaceFolders![0].uri.fsPath;

        const workspaceRootPackageJsonPath = path.posix.resolve(
          workspaceRootPath,
          'package.json'
        );

        if (!fs.existsSync(workspaceRootPackageJsonPath)) {
          vscode.window.showInformationMessage(
            `No package.json file found in ${workspaceRootPath}`
          );
          return;
        }

        const raw = await vscode.workspace.fs.readFile(
          vscode.Uri.from({
            scheme: 'file',
            path: workspaceRootPackageJsonPath,
          })
        );

        const { dependencies = {}, devDependencies = {} } = <PackageJson>(
          JSON.parse(raw.toString())
        );

        const merged = [
          ...Object.keys(dependencies),
          ...Object.keys(devDependencies),
        ];

        if (!merged.length) {
          vscode.window.showInformationMessage(
            `No dependencies found in workspace root: ${workspaceRootPath}`
          );
          return;
        }

        const selectedRemoveDeps =
          (await vscode.window.showQuickPick(merged, {
            canPickMany: true,
            placeHolder:
              'Select dependencies you want to remove from workspace root:',
          })) ?? [];

        if (!selectedRemoveDeps.length) {
          return;
        }

        const insideWorkspace =
          await Utils.Workspace.checkInsidePNPMWorkspace();

        const command = `pnpm remove ${selectedRemoveDeps.join(' ')} ${
          insideWorkspace ? '--workspace-root' : ''
        }`;

        const commandTerminal =
          vscode.window.createTerminal(`PNPM VSCode Helper`);

        commandTerminal.show(false);

        commandTerminal.sendText(command);
      },
    };
  }

  public static get SelectPackageDepsAndRemove(): ICommandRegistry {
    return {
      command: 'remove-workspace-package-deps',
      callback: async (args: any) => {
        const insideWorkspace = await Utils.Workspace.checkInsidePNPMWorkspace(
          true
        );

        if (!insideWorkspace) {
          return;
        }

        const workspacePackages =
          (await Utils.Workspace.collectWorkspacePackages()) ?? {};

        const workspacePackagesChoices = Object.keys(workspacePackages);

        if (!workspacePackagesChoices.length) {
          Utils.Tips.NoPackageFoundTip();
          return;
        }

        const WorkspaceRootIdentifier = 'WorkspaceRoot';

        workspacePackagesChoices.unshift(WorkspaceRootIdentifier);

        const selected = await vscode.window.showQuickPick(
          workspacePackagesChoices,
          {
            placeHolder:
              'Select workspace packages you want to remove its dependencies:',
          }
        );

        if (!selected) {
          Utils.Tips.NoPackageSelectedTip();
          return;
        }

        const packageJsonBasePath =
          selected === WorkspaceRootIdentifier
            ? Utils.Workspace.resolveCurrentWorkspaceAbsolutePath()
            : workspacePackages[selected];

        const targetPackageJsonContent = await vscode.workspace.fs.readFile(
          vscode.Uri.from({
            scheme: 'file',
            path: path.posix.resolve(packageJsonBasePath, 'package.json'),
          })
        );

        const { dependencies = {}, devDependencies = {} } = <PackageJson>(
          JSON.parse(targetPackageJsonContent.toString())
        );

        const merged = [
          ...Object.keys(dependencies),
          ...Object.keys(devDependencies),
        ];

        if (!merged.length) {
          vscode.window.showInformationMessage(
            `No dependencies found in package: ${selected}`
          );
          return;
        }

        const selectedRemoveDeps =
          (await vscode.window.showQuickPick(merged, {
            canPickMany: true,
            placeHolder: 'Select dependencies you want to remove:',
          })) ?? [];

        if (!selectedRemoveDeps.length) {
          return;
        }

        const command = `pnpm remove ${selectedRemoveDeps.join(' ')}`;

        const commandTerminal =
          vscode.window.createTerminal(`PNPM VSCode Helper`);

        commandTerminal.show(false);

        commandTerminal.sendText(`cd ${packageJsonBasePath}`);

        commandTerminal.sendText(command);
      },
    };
  }
}
