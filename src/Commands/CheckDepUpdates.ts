import * as vscode from 'vscode';
import { ICommandRegistry } from '../Utils/Typings';
import { Utils } from '../Utils';
import { ExtensionConfiguration } from '../Configurations';
import * as ncu from 'npm-check-updates';

export class CheckDepUpdates {
  public static get Update(): ICommandRegistry {
    return {
      command: 'check-dep-updates',
      callback: async (args: any) => {
        const selectedInfo = await Utils.Workspace.selectMultiplePackages(
          'No packages found in current workspace'
        );

        if (!selectedInfo) {
          return;
        }

        const { selectedTargetPackage, workspacePackages } = selectedInfo;

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
