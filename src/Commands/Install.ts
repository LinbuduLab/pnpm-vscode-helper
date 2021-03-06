import * as vscode from 'vscode';
import { Utils } from '../Utils';
import { ICommandRegistry } from '../Utils/Typings';
import { ExtensionConfiguration } from '../Configurations';

export class Install {
  public static get InstallWorkspaceRootDepsOnly(): ICommandRegistry {
    return {
      command: 'install-workspace-root-deps',
      callback: async (args: any) => {
        const insideWorkspace = await Utils.Workspace.checkInsidePNPMWorkspace(
          true
        );
        if (!insideWorkspace) {
          return;
        }

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

  public static get InstallSelectPackagesDepsOnly(): ICommandRegistry {
    return {
      command: 'install-selected-packages-deps',
      callback: async (args: any) => {
        const insideWorkspace = await Utils.Workspace.checkInsidePNPMWorkspace(
          true
        );
        if (!insideWorkspace) {
          return;
        }

        const workspacePackages =
          (await Utils.Workspace.collectWorkspacePackages()) ?? {};

        const workspacePackagesChoices = Object.keys(workspacePackages);

        if (!workspacePackagesChoices.length) {
          Utils.Tips.NoPackageFoundTip();
          return;
        }

        const selectedTargetPackages = await vscode.window.showQuickPick(
          workspacePackagesChoices,
          {
            title: 'Select workspace packages',
            canPickMany: true,
            placeHolder:
              'Select packages you want to install dependencies for:',
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
