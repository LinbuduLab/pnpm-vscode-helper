import * as vscode from 'vscode';
import { ICommandRegistry } from '../utils';
import { ExtensionConfiguration } from '../Configurations';

export class Locale {
  public static get Sample(): ICommandRegistry {
    return {
      command: 'helloWorld',
      callback: () => {
        vscode.window.showInformationMessage(
          'Hello World from pnpm-vscode-helper!!!(locale!)'
        );
      },
    };
  }

  public static get ToggleLocale(): ICommandRegistry {
    return {
      command: 'toggleLocale',
      callback: () => {
        ExtensionConfiguration.localeConfig.write('zh-CN');
        vscode.window.showInformationMessage(
          'Locale Changed! ' + ExtensionConfiguration.localeConfig.read()
        );
      },
    };
  }
}
