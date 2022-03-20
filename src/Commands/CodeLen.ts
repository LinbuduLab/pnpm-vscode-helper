import * as vscode from 'vscode';
import { ICommandRegistry } from '../Utils/Typings';
import { ExtensionConfiguration } from '../Configurations';

export class CodeLen {
  public static get EnableCodeLen(): ICommandRegistry {
    return {
      command: 'enableCodeLens',
      callback: () => {
        ExtensionConfiguration.codeLen.write(true);

        const locale = ExtensionConfiguration.locale.read();
        vscode.window.showInformationMessage(
          locale === 'en-US' ? `PNPM CodeLens Enabled.` : 'PNPM 智能提示已启用'
        );
      },
    };
  }

  public static get DisableCodeLen(): ICommandRegistry {
    return {
      command: 'disableCodeLens',
      callback: () => {
        ExtensionConfiguration.codeLen.write(false);

        const locale = ExtensionConfiguration.locale.read();
        vscode.window.showInformationMessage(
          locale === 'en-US' ? `PNPM CodeLens Disabled.` : 'PNPM 智能提示已禁用'
        );
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
