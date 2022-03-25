import * as vscode from 'vscode';

import { ExtensionRegistry } from './Registry';
import { ExtensionHooks } from './Hooks';

export async function activate(context: vscode.ExtensionContext) {
  await ExtensionHooks.execute(context);

  // --- COMMAND START ---
  ExtensionRegistry.registerCheckDepsUpdateCommand(context);
  ExtensionRegistry.registerCodeLensCommand(context);
  ExtensionRegistry.registerRemoveDepsCommand(context);
  ExtensionRegistry.registerWorkspaceCommand(context);
  ExtensionRegistry.registerPrivateExtensionConfigCommand(context);
  ExtensionRegistry.registerCreatorCommand(context);
  ExtensionRegistry.registerCongifureCommand(context);
  ExtensionRegistry.registerPackageCommand(context);
  ExtensionRegistry.registerInstallCommand(context);
  ExtensionRegistry.registerScanWorkspaceCommand(context);
  // --- COMMAND END ---

  // --- PROVIDER START ---
  ExtensionRegistry.registerCompletionProviders(context);
  ExtensionRegistry.registerCodelensProvider(context);
  ExtensionRegistry.registerHoverProvider(context);
  ExtensionRegistry.registerDefinitionProvider(context);
  // -- PROVIDER END ---
}

export function deactivate() {}
