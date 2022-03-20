import * as vscode from 'vscode';
import { ICommandRegistry } from '../Utils/Typings';
import { ExtensionConfiguration } from '../Configurations';

/**
 * we provide 2 ways to execute package task:
 * - select a package, choose the behavior
 * - select a behavior, choose the package
 */
export class Package {
  public static operations: string[] = [
    'self',
    'withDependencies',
    'withDependents',
  ];

  public static get SelectPackage(): ICommandRegistry {
    return {
      command: 'select-workspace-package',
      callback: async (args: any) => {
        const selectedTargetPackage = await vscode.window.showQuickPick(
          Object.keys(ExtensionConfiguration.packages.read())
        );
        if (!selectedTargetPackage) {
          return;
        }

        vscode.window.showInformationMessage(
          `package >>> ${selectedTargetPackage} <<< selected.`
        );

        const selectedOperations = await vscode.window.showQuickPick(
          Package.operations
        );

        if (!selectedOperations) {
          return;
        }

        vscode.window.showInformationMessage(
          `operation >>> ${selectedOperations} <<< selected.`
        );
      },
    };
  }
}
