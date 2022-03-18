import * as vscode from 'vscode';
import { ICommandRegistry, Constants } from '../utils';

export class CodeLen {
  public static get EnableCodeLen(): ICommandRegistry {
    return {
      command: 'enableCodeLens',
      callback: () => {
        vscode.workspace
          .getConfiguration(Constants.ExtensionPrefix)
          .update('enableCodeLens', true, true);

        vscode.window.showInformationMessage(`PNPM CodeLens Enabled.`);
      },
    };
  }

  public static get DisableCodeLen(): ICommandRegistry {
    return {
      command: 'disableCodeLens',
      callback: () => {
        vscode.workspace
          .getConfiguration(Constants.ExtensionPrefix)
          .update('enableCodeLens', false, true);

        vscode.window.showInformationMessage(`PNPM CodeLens Disabled.`);
      },
    };
  }

  public static get CodeLenClickHandler(): ICommandRegistry {
    return {
      command: 'codelensAction',
      callback: (args: any) => {
        vscode.window.showInformationMessage(
          `CodeLens action clicked with args=${args}`
        );
      },
    };
  }
}
