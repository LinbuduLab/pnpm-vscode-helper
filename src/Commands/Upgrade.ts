import * as vscode from 'vscode';
import { ICommandRegistry } from '../Utils/Typings';
import { ExtensionConfiguration } from '../Configurations';
import { Utils } from '../Utils';

interface UpgragdFeatures {
  recursive: boolean;
  workspace: boolean;
  latest: boolean;
  dev: boolean;
  prod: boolean;
  interactive: boolean;
}

const initialUpgradeFeatures: UpgragdFeatures = {
  recursive: false,
  workspace: false,
  dev: true,
  prod: true,
  latest: false,
  interactive: false,
};

const featureDescriptions: Record<keyof UpgragdFeatures, string> = {
  recursive:
    'Concurrently runs update in all subdirectories with a package.json',
  latest: 'Ignores the version range specified in package.json',
  workspace: 'Tries to link all packages from the workspace',
  dev: 'Only update packages in devDependencies',
  prod: 'Only update packages in dependencies and optionalDependencies',
  interactive: 'Show outdated dependencies and select which ones to update.',
};

export class Upgrage {
  public static get BuiltInUpgrade(): ICommandRegistry {
    return {
      command: 'built-in-upgrade',
      callback: async (args: any) => {
        const selectedInfo = await Utils.Workspace.selectMultiplePackages(
          'Select workspace packages you want to update its dependencies:'
        );

        if (!selectedInfo) {
          Utils.Tips.NoPackageSelectedTip();
          return;
        }

        // todo: support filter range here?
        const selectedWorkspaceFeatures = await vscode.window.showQuickPick(
          Object.keys(initialUpgradeFeatures).map((feature) => ({
            label: feature,
            description: featureDescriptions[<keyof UpgragdFeatures>feature],
            picked: ['dev', 'prod'].includes(feature),
          })),
          {
            canPickMany: true,
            placeHolder:
              'Select workspace features you want to enable for upgrading:',
          }
        );

        const features = (selectedWorkspaceFeatures ?? []).map(
          (feature) => feature.label
        );

        const command = `pnpm up ${selectedInfo.selectedTargetPackage
          .map((p) => `--filter='${p}'`)
          .join(' ')} ${features.map((f) => `--${f}`).join(' ')}`;

        const commandTerminal =
          vscode.window.createTerminal(`PNPM VSCode Helper`);

        commandTerminal.show(false);
        commandTerminal.sendText(command);
      },
    };
  }
}
