import * as vscode from 'vscode';
import { Locale } from './Commands/Locale';
import { CodeLen } from './Commands/CodeLen';
import { PnpmConfigurationCompletion } from './Languages/Completion';
import { CodelensProvider } from './Providers/CodeLen';
import { Utils } from './utils';

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

  public static registerCodeLenCommand(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      vscode.commands.registerCommand(
        Utils.composeCommand(CodeLen.EnableCodeLen.command),
        CodeLen.EnableCodeLen.callback
      ),
      vscode.commands.registerCommand(
        Utils.composeCommand(CodeLen.DisableCodeLen.command),
        CodeLen.DisableCodeLen.callback
      ),
      vscode.commands.registerCommand(
        Utils.composeCommand(CodeLen.CodeLenClickHandler.command),
        CodeLen.CodeLenClickHandler.callback
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

  public static registerCodeLensProvider(context: vscode.ExtensionContext) {
    vscode.languages.registerCodeLensProvider('*', new CodelensProvider());
  }
}
