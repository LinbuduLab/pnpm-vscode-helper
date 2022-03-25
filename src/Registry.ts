import * as vscode from 'vscode';

import { Workspace } from './Commands/Workspace';
import { ScanWorkspace } from './Commands/Scanner';
import { CheckDepUpdates } from './Commands/CheckDepUpdates';
import { Configure } from './Commands/Configure';
import { Package } from './Commands/Package';
import { Creator } from './Commands/Creator';
import { Install } from './Commands/Install';
import { Upgrage } from './Commands/Upgrade';
import { RemoveDeps } from './Commands/RemoveDeps';
import { Publish } from './Commands/Publish';
import { PrivateExtensionConfigure } from './Commands/PrivateConfigure';

import { WorkspaceProtocolCodelenseProvider } from './Providers/WorkspaceProtocol.codelense';
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
import { RegisterHelper } from './Utils/RegisterHelper';
import { CodeLen } from './Commands/Codelen';

export class ExtensionRegistry {
  public static registerPublishCommand(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      RegisterHelper.registerCommand(Publish.PublishInteractively)
    );
  }
  public static registerRemoveDepsCommand(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      RegisterHelper.registerCommand(RemoveDeps.SelectPackageDepsAndRemove)
    );
  }

  public static registerCheckDepsUpdateCommand(
    context: vscode.ExtensionContext
  ) {
    context.subscriptions.push(
      RegisterHelper.registerCommand(CheckDepUpdates.Update),
      RegisterHelper.registerCommand(Upgrage.BuiltInUpgrade)
    );
  }

  public static registerCongifureCommand(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      RegisterHelper.registerCommand(Configure.ToggleCodelenStatus),
      RegisterHelper.registerCommand(Configure.ToggleHoverProviderStatus),
      RegisterHelper.registerCommand(Configure.ToggleCompletionProviderStatus),
      RegisterHelper.registerCommand(Configure.ToggleLocaleProviderStatus)
    );
  }

  public static registerCodeLensCommand(context: vscode.ExtensionContext) {
    RegisterHelper.registerCommand(CodeLen.CodeLenClickHandler);
  }

  public static registerWorkspaceCommand(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      RegisterHelper.registerCommand(Workspace.CreateExtraWorkspaceScripts)
    );
  }

  public static registerPrivateExtensionConfigCommand(
    context: vscode.ExtensionContext
  ) {
    context.subscriptions.push(
      RegisterHelper.registerCommand(
        PrivateExtensionConfigure.CreatePrivateConfig
      ),
      RegisterHelper.registerCommand(
        PrivateExtensionConfigure.RemovePrivateConfig
      )
    );
  }

  public static registerScanWorkspaceCommand(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      RegisterHelper.registerCommand(ScanWorkspace.Scan)
    );
  }

  public static registerCreatorCommand(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      RegisterHelper.registerCommand(Creator.CreateNPMRCConfig),
      RegisterHelper.registerCommand(Creator.CreatePNPMWorkspaceConfig)
    );
  }

  public static registerPackageCommand(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      RegisterHelper.registerCommand(Package.SelectPackage),
      RegisterHelper.registerCommand(Package.GroupWorkspacePackages)
    );
  }

  public static registerInstallCommand(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      RegisterHelper.registerCommand(Install.InstallWorkspaceRootDepsOnly),
      RegisterHelper.registerCommand(Install.InstallSelectPackagesDepsOnly)
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

  public static registerCodelensProvider(context: vscode.ExtensionContext) {
    vscode.languages.registerCodeLensProvider(
      '*',
      new WorkspaceProtocolCodelenseProvider()
    );
  }

  public static registerDefinitionProvider(context: vscode.ExtensionContext) {
    context.subscriptions.push();
  }
}
