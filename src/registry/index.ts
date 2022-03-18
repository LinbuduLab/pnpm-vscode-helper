import * as vscode from 'vscode';
import { Locale } from '../commands/Locale';
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
}
