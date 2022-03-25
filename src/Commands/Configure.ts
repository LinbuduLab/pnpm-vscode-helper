import * as vscode from 'vscode';
import { Utils } from '../Utils';
import { ICommandRegistry, Locale as LocaleType } from '../Utils/Typings';
import { ExtensionConfiguration } from '../Configurations';
import { LocaleFactory } from '../Locales';

/**
 * disable for global or for current workspace...?
 * move codelense here
 * - codelens
 * - locale
 */
export class Configure {
  public static get ToggleCodelenStatus(): ICommandRegistry {
    return {
      command: 'toggle-codelen-status',
      callback: async (args: any) => {
        const raw = ExtensionConfiguration.codelen.read();

        const res = await Utils.Workspace.createStatusSelector('codelen', raw);

        raw !== res && ExtensionConfiguration.codelen.write(res);
      },
    };
  }

  public static get ToggleHoverProviderStatus(): ICommandRegistry {
    return {
      command: 'ToggleHoverProviderStatus',
      callback: async (args: any) => {},
    };
  }

  public static get ToggleCompletionProviderStatus(): ICommandRegistry {
    return {
      command: 'ToggleCompletionProviderStatus',
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
