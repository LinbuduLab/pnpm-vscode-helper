import * as vscode from 'vscode';
import { Locale } from './Commands/Locale';
import { CodeLen } from './Commands/CodeLen';
import { Workspace } from './Commands/Workspace';
import { ScanWorkspace } from './Commands/Scanner';
import { Package } from './Commands/Package';
import { Creator } from './Commands/Creator';
import { Install } from './Commands/Install';
import { PnpmConfigurationCompletion } from './Languages/Completion';
import { CodelensProvider } from './Providers/CodeLen';
import { Utils } from './utils';
import { PackageJsonHoverProvider } from './Providers/Hover';
import { PackageJsonDefinitionProvider } from './Providers/Definition';

export class ExtensionRegistry {
  public static registerLocaleCommand(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      // Locale
      vscode.commands.registerCommand(
        Utils.composeCommand(Locale.ToggleLocale.command),
        Locale.ToggleLocale.callback
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

  public static registerWorkspaceCommand(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      vscode.commands.registerCommand(
        Utils.composeCommand(Workspace.ToggleWorkspaceFeatureStatus.command),
        Workspace.ToggleWorkspaceFeatureStatus.callback
      )
    );
  }

  public static registerScanWorkspaceCommand(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      vscode.commands.registerCommand(
        Utils.composeCommand(ScanWorkspace.Scan.command),
        ScanWorkspace.Scan.callback
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

  public static registerHoverProvider(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      vscode.languages.registerHoverProvider(
        PackageJsonHoverProvider.selector,
        new PackageJsonHoverProvider()
      )
    );
  }

  public static registerDefinitionProvider(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      vscode.languages.registerDefinitionProvider(
        PackageJsonDefinitionProvider.selector,
        new PackageJsonDefinitionProvider()
      )
    );
  }

  public static registerCreatorCommand(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      vscode.commands.registerCommand(
        Utils.composeCommand(Creator.CreateNPMRCConfig.command),
        Creator.CreateNPMRCConfig.callback
      ),
      vscode.commands.registerCommand(
        Utils.composeCommand(Creator.CreatePNPMWorkspaceConfig.command),
        Creator.CreatePNPMWorkspaceConfig.callback
      )
    );
  }

  public static registerPackageCommand(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      vscode.commands.registerCommand(
        Utils.composeCommand(Package.SelectPackage.command),
        Package.SelectPackage.callback
      )
    );
  }

  public static registerInstallCommand(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      vscode.commands.registerCommand(
        Utils.composeCommand(Install.InstallWorkspaceRootDepsOnly.command),
        Install.InstallWorkspaceRootDepsOnly.callback
      ),
      vscode.commands.registerCommand(
        Utils.composeCommand(Install.InstallSelectPackagesDepsOnly.command),
        Install.InstallSelectPackagesDepsOnly.callback
      )
    );
  }
}
