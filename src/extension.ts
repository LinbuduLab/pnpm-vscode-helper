import { ExtensionRegistry } from './Registry';
import { ExtensionHooks } from './Hooks';
import { ProgressHelper } from './utils/Progress';

import * as vscode from 'vscode';

export async function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "pnpm-vscode-helper" is now active!'
  );

  await ExtensionHooks.pre();

  ExtensionRegistry.registerLocaleCommand(context);
  ExtensionRegistry.registerCompletionProviders(context);
  // ExtensionRegistry.registerCodeLenCommand(context);
  // ExtensionRegistry.registerCodeLensProvider(context);
  ExtensionRegistry.registerWorkspaceCommand(context);
  ExtensionRegistry.registerCreatorCommand(context);
  ExtensionRegistry.registerScanWorkspaceCommand(context);
  ExtensionRegistry.registerHoverProvider(context);
  ExtensionRegistry.registerDefinitionProvider(context);

  ProgressHelper.sample(context);
}

export function deactivate() {}
