import * as vscode from 'vscode';
import { ICommandRegistry, Constants, Utils } from '../utils';
import { ExtensionConfiguration } from '../Configurations';

/**
 * we provide 2 ways to execute package task:
 * - select a package, choose the behavior
 * - select a behavior, choose the package
 */
export class Package {
  public static get SelectPackage(): ICommandRegistry {
    return {
      command: 'select-workspace-package',
      callback: (args: any) => {
        const validPackages = ExtensionConfiguration.packages.read();

        vscode.window.showQuickPick(validPackages).then((v) => {
          if (!v) {
            return;
          }

          vscode.window.showInformationMessage(
            `package >>> ${v} <<< selected.`
          );
        });
      },
    };
  }
}
