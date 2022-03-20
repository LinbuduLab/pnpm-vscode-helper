import * as vscode from 'vscode';

import { ExtensionRegistry } from './Registry';
import { ExtensionHooks } from './Hooks';

export async function activate(context: vscode.ExtensionContext) {
  await ExtensionHooks.execute(context);

  // --- COMMAND START ---
  ExtensionRegistry.registerLocaleCommand(context);
  ExtensionRegistry.registerCodeLenCommand(context);
  ExtensionRegistry.registerWorkspaceCommand(context);
  ExtensionRegistry.registerPrivateExtensionConfigCommand(context);
  ExtensionRegistry.registerCreatorCommand(context);
  ExtensionRegistry.registerPackageCommand(context);
  ExtensionRegistry.registerInstallCommand(context);
  ExtensionRegistry.registerScanWorkspaceCommand(context);
  // --- COMMAND END ---

  // --- PROVIDER START ---
  ExtensionRegistry.registerCompletionProviders(context);
  ExtensionRegistry.registerCodeLensProvider(context);
  ExtensionRegistry.registerHoverProvider(context);
  ExtensionRegistry.registerDefinitionProvider(context);
  // -- PROVIDER END ---
}

export function deactivate() {}
