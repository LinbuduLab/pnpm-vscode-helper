import * as vscode from 'vscode';
import { Utils } from '../Utils';
import { ICommandRegistry, PackageFilterType } from '../Utils/Typings';
import { ExtensionConfiguration } from '../Configurations';
import * as path from 'path';
import { PackageJson } from 'type-fest';
import { uniq } from 'lodash';
export class Package {
  // todo: use selected package scripts
  // public static scripts: string[] = ['dev', 'start', 'build', 'install'];
  public static scripts: string[] = [];

  public static operations: PackageFilterType[] = [
    'self',
    'withDependencies',
    'withDependents',
    'dependenciesOnly',
    'dependentsOnly',
  ];

  public static get SelectPackage(): ICommandRegistry {
    return {
      command: 'select-workspace-package',
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
          workspacePackagesChoices
        );

        if (!selectedTargetPackage) {
          return;
        }

        const selectedPackagePackageJson = path.posix.resolve(
          workspacePackages[selectedTargetPackage],
          'package.json'
        );

        const packageJsonContent = await vscode.workspace.fs.readFile(
          vscode.Uri.from({
            scheme: 'file',
            path: selectedPackagePackageJson,
          })
        );

        const { scripts = {} } = <PackageJson>(
          JSON.parse(packageJsonContent.toString())
        );

        const selectedScript = await vscode.window.showQuickPick(
          uniq(
            Package.scripts
              .concat(ExtensionConfiguration.extraWorkspaceScript.read())
              .concat(Object.keys(scripts))
          )
        );

        if (!selectedScript) {
          return;
        }

        const selectedOperation = <PackageFilterType>(
          await vscode.window.showQuickPick(Package.operations)
        );

        if (!selectedOperation) {
          return;
        }

        Utils.Terminal.createTerminalForScriptExecution(
          selectedTargetPackage,
          selectedScript,
          selectedOperation
        );
      },
    };
  }

  // [groupName, [packages]]
  public GroupPackages(): ICommandRegistry {
    return {
      command: 'grouping-packages',
      callback: async (args: any) => {
        // select packages
        // create group
        // save settings
      },
    };
  }
}
