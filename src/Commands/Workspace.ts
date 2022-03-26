import * as vscode from 'vscode';
import { ICommandRegistry } from '../Utils/Typings';
import { ExtensionConfiguration } from '../Configurations';

export class Workspace {
  public static get CreateExtraWorkspaceScripts(): ICommandRegistry {
    return {
      command: 'create-extra-workspace-scripts',
      callback: async (args: any) => {
        const script = await vscode.window.showInputBox({
          title: 'Extra script to add',
          prompt: undefined,
          placeHolder:
            'Split script name with "," like: build:prod,build:dev,develop',
        });

        const splited = (script ?? '')?.split(',').filter((seg) => seg.length);

        ExtensionConfiguration.extraWorkspaceScript.write(splited);

        vscode.window.showInformationMessage(
          `Workspace script '${splited.join(', ')}' added.`
        );
      },
    };
  }

  public static get RemoveExtraWorkspaceScripts(): ICommandRegistry {
    return {
      command: 'remove-extra-workspace-scripts',
      callback: async (args: any) => {
        const origin = ExtensionConfiguration.extraWorkspaceScript.read();

        if (!origin.length) {
          vscode.window.showInformationMessage(
            'No extra workspace script found.'
          );
          return;
        }

        const script2Remove =
          (await vscode.window.showQuickPick(origin, {
            canPickMany: true,
            title: 'Remove workspace scripts',
            placeHolder:
              'Select scripts you want to remove from current workspace',
          })) ?? [];

        const updated = origin.filter((o) => !script2Remove.includes(o));

        ExtensionConfiguration.extraWorkspaceScript.write(updated);

        vscode.window.showInformationMessage(
          `Workspace script '${script2Remove.join(', ')}' removed.`
        );
      },
    };
  }
}
