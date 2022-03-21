import * as vscode from 'vscode';
import { Utils } from '../Utils';
import { ICommandRegistry } from '../Utils/Typings';
import { ExtensionConfiguration } from '../Configurations';

export class Install {
  public static get InstallWorkspaceRootDepsOnly(): ICommandRegistry {
    return {
      command: 'install-workspace-root-deps',
      callback: async (args: any) => {
        const { dependencies = {}, devDependencies = {} } =
          Utils.readPackageJson();
        const { dependenciesWithVersion, devDependenciesWithVersion } =
          Utils.processDepsRecord(dependencies, devDependencies);

        Utils.Terminal.createTerminalForDepsInstallation(
          dependenciesWithVersion
        );
        Utils.Terminal.createTerminalForDevDepsInstallation(
          devDependenciesWithVersion
        );
      },
    };
  }

  public static get CheckDepsUpdateForSelectedPackages(): ICommandRegistry {
    return {
      command: 'check-deps-update-for-selected-packages',
      callback: async (args: any) => {},
    };
  }

  public static get InstallSelectPackagesDepsOnly(): ICommandRegistry {
    return {
      command: 'install-selected-packages-deps',
      callback: async (args: any) => {
        const workspacePackages =
          (await Utils.Workspace.collectWorkspacePackages()) ?? {};

        const workspacePackagesChoices = Object.keys(workspacePackages);

        if (!workspacePackagesChoices.length) {
          vscode.window.showInformationMessage(
            'No packages found in current workspace'
          );
        }
        const selectedTargetPackages = await vscode.window.showQuickPick(
          workspacePackagesChoices,
          {
            title: 'Package Selector',
            canPickMany: true,
            placeHolder:
              'Select packages which you want to install dependencies',
          }
        );

        if (!Boolean(selectedTargetPackages?.length)) {
          return;
        }

        Utils.Terminal.createTerminalForDirectInstallation(
          selectedTargetPackages
        );
      },
    };
  }
}
