import * as vscode from 'vscode';

import { Locale } from './Commands/Locale';
import { CodeLen } from './Commands/CodeLen';
import { Workspace } from './Commands/Workspace';
import { ScanWorkspace } from './Commands/Scanner';
import { Package } from './Commands/Package';
import { Creator } from './Commands/Creator';
import { Install } from './Commands/Install';
import { PrivateExtensionConfigure } from './Commands/PrivateConfigure';

import { CodelensProvider } from './Providers/CodeLen';
import { PackageJsonHoverProvider } from './Providers/PackageJson.hover';
import { NPMRCHoverProvider } from './Providers/NPMRC.hover';
import {
  PnpmConfigurationKeyCompletion,
  PnpmConfigurationCompletion,
} from './Providers/NPMRC.completion';

import { PNPMWorkspaceYAMLHoverProvider } from './Providers/WorkspaceYAML.hover';
import {
  PNPMWorkspaceYAMLKeyCompletion,
  PNPMWorkspaceYAMLCompletion,
} from './Providers/WorkspaceYAML.completion';

import { Utils } from './utils';

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

  public static registerPrivateExtensionConfigCommand(
    context: vscode.ExtensionContext
  ) {
    context.subscriptions.push(
      vscode.commands.registerCommand(
        Utils.composeCommand(
          PrivateExtensionConfigure.CreatePrivateConfig.command
        ),
        PrivateExtensionConfigure.CreatePrivateConfig.callback
      ),
      vscode.commands.registerCommand(
        Utils.composeCommand(
          PrivateExtensionConfigure.RemovePrivateConfig.command
        ),
        PrivateExtensionConfigure.RemovePrivateConfig.callback
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
      ),
      vscode.commands.registerCommand(
        Utils.composeCommand(
          Install.CheckDepsUpdateForSelectedPackages.command
        ),
        Install.CheckDepsUpdateForSelectedPackages.callback
      )
    );
  }

  public static registerHoverProvider(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      vscode.languages.registerHoverProvider(
        PackageJsonHoverProvider.selector,
        new PackageJsonHoverProvider()
      ),
      vscode.languages.registerHoverProvider(
        PNPMWorkspaceYAMLHoverProvider.selector,
        new PNPMWorkspaceYAMLHoverProvider()
      ),
      vscode.languages.registerHoverProvider(
        NPMRCHoverProvider.selector,
        new NPMRCHoverProvider()
      )
    );
  }

  public static registerCompletionProviders(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      vscode.languages.registerCompletionItemProvider(
        PnpmConfigurationKeyCompletion.selector,
        new PnpmConfigurationKeyCompletion(),
        PnpmConfigurationKeyCompletion.trigger
      ),
      vscode.languages.registerCompletionItemProvider(
        PnpmConfigurationCompletion.selector,
        new PnpmConfigurationCompletion(),
        PnpmConfigurationCompletion.trigger
      ),
      vscode.languages.registerCompletionItemProvider(
        PNPMWorkspaceYAMLKeyCompletion.selector,
        new PNPMWorkspaceYAMLKeyCompletion(),
        PNPMWorkspaceYAMLKeyCompletion.trigger
      ),
      vscode.languages.registerCompletionItemProvider(
        PNPMWorkspaceYAMLCompletion.selector,
        new PNPMWorkspaceYAMLCompletion(),
        PNPMWorkspaceYAMLCompletion.trigger
      )
    );
  }

  public static registerCodeLensProvider(context: vscode.ExtensionContext) {
    // vscode.languages.registerCodeLensProvider('*', new CodelensProvider());
  }

  public static registerDefinitionProvider(context: vscode.ExtensionContext) {
    context.subscriptions.push();
  }
}
