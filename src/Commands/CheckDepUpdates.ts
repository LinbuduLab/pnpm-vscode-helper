import * as vscode from 'vscode';
import { ICommandRegistry } from '../Utils/Typings';
import { Utils } from '../Utils';
import { ExtensionConfiguration } from '../Configurations';
import * as ncu from 'npm-check-updates';
import * as path from 'path';

export class CheckDepUpdates {
  public static get Update(): ICommandRegistry {
    return {
      command: 'check-dep-updates',
      callback: async (args: any) => {
        const workspacePackages =
          (await Utils.Workspace.collectWorkspacePackages()) ?? {};

        const workspacePackagesChoices = Object.keys(workspacePackages);

        if (!workspacePackagesChoices.length) {
          vscode.window.showInformationMessage(
            'No packages found in current workspace'
          );
        }

        const selectedTargetPackage = await vscode.window.showQuickPick(
          workspacePackagesChoices,
          {
            canPickMany: true,
            placeHolder: 'Select packages you want to update deps for',
          }
        );

        if (!selectedTargetPackage?.length) {
          return;
        }

        const promises = selectedTargetPackage.map((p) => {
          return ncu.run({
            cwd: workspacePackages[p],
            upgrade: true,
            // registry: 'https://registry.npmmirror.com',
          });
        });

        vscode.window.withProgress(
          {
            location: vscode.ProgressLocation.Notification,
            title: 'Updating',
            // cancellable: true,
          },
          (progress, token) => {
            // token.onCancellationRequested(() => {
            //   vscode.window.showInformationMessage(`Update cancelled`);
            // });

            return Promise.all(promises);
          }
        );

        vscode.window.showInformationMessage(
          `Deps updated for packages: ${selectedTargetPackage.join(', ')}`
        );
      },
    };
  }
}
