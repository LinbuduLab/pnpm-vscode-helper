import * as vscode from 'vscode';
import { ICommandRegistry, Constants } from '../utils';
import { ExtensionConfiguration } from '../Configurations';

export class CodeLen {
  public static get EnableCodeLen(): ICommandRegistry {
    return {
      command: 'enableCodeLens',
      callback: () => {
        ExtensionConfiguration.codeLenConfig.write(true);

        vscode.window.showInformationMessage(`PNPM CodeLens Enabled.`);
      },
    };
  }

  public static get DisableCodeLen(): ICommandRegistry {
    return {
      command: 'disableCodeLens',
      callback: () => {
        ExtensionConfiguration.codeLenConfig.write(false);

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
