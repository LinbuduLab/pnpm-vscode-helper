import * as vscode from 'vscode';
import { ExtensionConfiguration } from '../Configurations';
import { ICommandRegistry } from '../Utils';
import { Locale as LocaleType } from '../Utils/typings';
import { LocaleFactory } from '../Locales';

export class Locale {
  public static get ToggleLocale(): ICommandRegistry {
    return {
      command: 'toggleLocale',
      callback: () => {
        vscode.window
          .showQuickPick(LocaleFactory.supportedLocales)
          .then((v) => {
            if (!v) {
              return;
            }

            ExtensionConfiguration.locale.write(<LocaleType>v);
            vscode.window.showInformationMessage(
              LocaleFactory.ToggleLocaleTip(<LocaleType>v)
            );
          });
      },
    };
  }
}
