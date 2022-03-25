import * as vscode from 'vscode';
import { ICommandRegistry } from '../Utils/Typings';
import { ExtensionConfiguration } from '../Configurations';
import { Utils } from '../Utils';
import * as path from 'path';
import { PackageJson } from 'type-fest';

export class RemoveDeps {
  public static get SelectPackageDepsAndRemove(): ICommandRegistry {
    return {
      command: 'remove-package-deps',
      callback: async (args: any) => {
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
