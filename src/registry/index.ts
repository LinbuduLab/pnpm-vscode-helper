import * as vscode from 'vscode';
import { Locale } from '../commands/Locale';
import { PnpmConfigurationCompletion } from '../languages/Completion';
import { Utils } from '../utils';

export class ExtensionRegistry {
  public static registerLocaleCommand(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      // Locale
      vscode.commands.registerCommand(
        Utils.composeCommand(Locale.ToggleLocale.command),
        Locale.ToggleLocale.callback
      ),
      // Sample
      vscode.commands.registerCommand(
        Utils.composeCommand(Locale.Sample.command),
        Locale.Sample.callback
      )
    );
  }

  public static registerCompletionProviders(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      // Pnpm Configuration in .npmrc file
      PnpmConfigurationCompletion.sample1(context),
      PnpmConfigurationCompletion.sample2(context)
      // Pnpm Worksapce Configuration in pnpm-workspace.yaml file
      // Pnpm File Configuration in .pnpmfile.cjs file
    );
  }
}
