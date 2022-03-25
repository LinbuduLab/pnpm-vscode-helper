import * as vscode from 'vscode';
import * as ncu from 'npm-check-updates';

import { Utils } from '../Utils';
import type { ICommandRegistry } from '../Utils/Typings';

export class CheckDepUpdates {
  public static get Update(): ICommandRegistry {
    return {
      command: 'check-dep-updates',
      callback: async (args: any) => {
        const selectedInfo = await Utils.Workspace.selectMultiplePackages(
          'Select workspace packages you want to update its dependencies:'
        );

        if (!selectedInfo) {
          Utils.Tips.NoPackageSelectedTip();
          return;
        }

        const { selectedTargetPackage, workspacePackages } = selectedInfo;

        const promises = selectedTargetPackage.map((p) => {
          return ncu.run({
            cwd: workspacePackages[p],
            upgrade: true,
          });
        });

        vscode.window.withProgress(
          {
            location: vscode.ProgressLocation.Notification,
            title: 'Checking and Updating Dependencies...',
            cancellable: true,
          },
          (progress, token) => {
            return new Promise((resolve, reject) => {
              token.onCancellationRequested(() => {
                reject();
              });

              Promise.all(promises).then(() => {
                vscode.window.showInformationMessage(
                  `Deps updated for packages: ${selectedTargetPackage.join(
                    ', '
                  )}`
                );
                resolve(void 0);
              });
            });
          }
        );
      },
    };
  }
}
