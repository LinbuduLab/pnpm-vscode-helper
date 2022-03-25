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
          Utils.Tips.NoPackageFoundTip();
          return;
        }

        const selectedTargetPackage = await vscode.window.showQuickPick(
          workspacePackagesChoices,
          {
            title: 'Select target package',
          }
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
          ),
          {
            title: 'Select project script',
            placeHolder: `Selected project: ${selectedTargetPackage}`,
          }
        );

        if (!selectedScript) {
          return;
        }

        const selectedOperation = <PackageFilterType>(
          await vscode.window.showQuickPick(Package.operations, {
            title: 'Select filter type',
            placeHolder: `Selected project: ${selectedTargetPackage}, selected script: ${selectedScript}`,
          })
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
  public static get GroupWorkspacePackages(): ICommandRegistry {
    return {
      command: 'grouping-packages',
      callback: async (args: any) => {
        const selectedInfo = await Utils.Workspace.selectMultiplePackages();

        if (!selectedInfo) {
          return;
        }

        const { selectedTargetPackage } = selectedInfo;

        const groupIdentifier = await vscode.window.showInputBox({
          title: 'Input group name',
          placeHolder: "e.g. 'Node-Project', 'React-Project'",
        });

        if (!groupIdentifier) {
          return;
        }

        ExtensionConfiguration.workspacePackageGroup.write(
          ExtensionConfiguration.workspacePackageGroup
            .read()
            .concat([[groupIdentifier, selectedTargetPackage]])
        );
      },
    };
  }
}
