import * as vscode from 'vscode';
import { Utils } from '../Utils';
import { ICommandRegistry } from '../Utils/Typings';
import { ExtensionConfiguration } from '../Configurations';

/**
 * info with pnpm init
 */

export class PrivateExtensionConfigure {
  public static get CreatePrivateConfig(): ICommandRegistry {
    return {
      command: 'create-private-extension-config',
      callback: async (args: any) => {
        const username = await vscode.window.showInputBox({
          prompt: 'username',
          placeHolder: 'Input your npm username',
        });

        const email = await vscode.window.showInputBox({
          prompt: 'email',
          placeHolder: 'Input your npm email',
        });

        // validate
        // crypto
        if (username && email) {
          ExtensionConfiguration.privateExtConfig.write({
            username,
            email,
          });

          vscode.window.showInformationMessage('Private config saved.');
        }
      },
    };
  }

  public static get RemovePrivateConfig(): ICommandRegistry {
    return {
      command: 'remove-private-extension-config',
      callback: async (args: any) => {
        const confirm = await Utils.Workspace.createConfirmDialog(
          'Are you sure you want to remove private config?'
        );

        if (confirm) {
          ExtensionConfiguration.privateExtConfig.write({
            username: undefined,
            email: undefined,
          });
          vscode.window.showInformationMessage('Private config removed.');
        }
      },
    };
  }
}
