import * as vscode from 'vscode';
import { Utils } from '../Utils';
import { ICommandRegistry, Locale as LocaleType } from '../Utils/Typings';
import { ExtensionConfiguration } from '../Configurations';
import { LocaleFactory } from '../Locales';

/**
 * disable for global or for current workspace...?
 * move codelense here
 */
export class Configure {
  public static get ToggleCodelenseStatus(): ICommandRegistry {
    return {
      command: 'sample-command1',
      callback: async (args: any) => {},
    };
  }

  public static get ToggleHoverProviderStatus(): ICommandRegistry {
    return {
      command: 'sample-command2',
      callback: async (args: any) => {},
    };
  }

  public static get ToggleCompletionProviderStatus(): ICommandRegistry {
    return {
      command: 'sample-command3',
      callback: async (args: any) => {},
    };
  }

  public static get ToggleLocaleProviderStatus(): ICommandRegistry {
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
