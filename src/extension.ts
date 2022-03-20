import { ExtensionRegistry } from './Registry';
import { ExtensionHooks } from './Hooks';
import { ProgressHelper } from './utils/Progress';

import * as vscode from 'vscode';

export async function activate(context: vscode.ExtensionContext) {
  await ExtensionHooks.pre(context);

  ExtensionRegistry.registerLocaleCommand(context);
  ExtensionRegistry.registerCompletionProviders(context);
  // ExtensionRegistry.registerCodeLenCommand(context);
  // ExtensionRegistry.registerCodeLensProvider(context);
  ExtensionRegistry.registerWorkspaceCommand(context);
  ExtensionRegistry.registerPrivateExtensionConfigCommand(context);
  ExtensionRegistry.registerCreatorCommand(context);
  ExtensionRegistry.registerPackageCommand(context);
  ExtensionRegistry.registerInstallCommand(context);
  ExtensionRegistry.registerScanWorkspaceCommand(context);
  ExtensionRegistry.registerHoverProvider(context);
  ExtensionRegistry.registerDefinitionProvider(context);

  ProgressHelper.sample(context);
}

export function deactivate() {}
