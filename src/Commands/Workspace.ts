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
          placeHolder: "e.g. 'build:prod', 'build:dev', 'develop', ...",
        });

        ExtensionConfiguration.extraWorkspaceScript.write([script ?? '']);

        vscode.window.showInformationMessage(
          `New workspace script '${script}' added.`
        );
      },
    };
  }
}
