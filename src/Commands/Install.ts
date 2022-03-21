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
        const pkgs = ExtensionConfiguration.packages.read();
        const selectedTargetPackages = await vscode.window.showQuickPick(
          Object.keys(pkgs),
          {
            canPickMany: true,
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
