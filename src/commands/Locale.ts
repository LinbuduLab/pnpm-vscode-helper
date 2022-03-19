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

  public static get supportedLocales() {
    return ['en-US', 'zh-CN'];
  }

  public static get ToggleLocale(): ICommandRegistry {
    return {
      command: 'toggleLocale',
      callback: () => {
        vscode.window.showQuickPick(Locale.supportedLocales).then((v) => {
          if (!v) {
            return;
          }

          ExtensionConfiguration.locale.write(v);
          vscode.window.showInformationMessage(
            'Locale Changed! ' + ExtensionConfiguration.locale.read()
          );
        });
      },
    };
  }
}
