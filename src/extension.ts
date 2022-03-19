import { ExtensionRegistry } from './Registry';
import { ProgressHelper } from './utils/Progress';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "pnpm-vscode-helper" is now active!'
  );

  ExtensionRegistry.registerLocaleCommand(context);
  ExtensionRegistry.registerCompletionProviders(context);
  ExtensionRegistry.registerCodeLenCommand(context);
  ExtensionRegistry.registerCodeLensProvider(context);
  ExtensionRegistry.registerWorkspaceCommand(context);
  ExtensionRegistry.registerScanWorkspaceCommand(context);

  ProgressHelper.sample(context);
}

export function deactivate() {}
