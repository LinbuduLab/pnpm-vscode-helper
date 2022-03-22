import * as vscode from 'vscode';
import * as path from 'path';
import {
  NPMRC_COMPLETION_KEYS,
  NPMRC_COMPLETION_ITEMS,
  NPMRCKeyUnions,
} from '../Constants/NPMRC';

export class PnpmConfigurationKeyCompletion
  implements vscode.CompletionItemProvider
{
  public static selector: vscode.DocumentSelector = {
    pattern: '/**/.npmrc',
    scheme: 'file',
  };

  public static trigger: string = '*';

  public provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext
  ) {
    const line = document.lineAt(position);

    const lineText = `${line.text.substring(0, position.character)}`;

    const completions = NPMRC_COMPLETION_KEYS.filter((key) =>
      key.startsWith(lineText)
    ).map(
      (item) =>
        new vscode.CompletionItem(
          { label: item, description: 'pnpm configuration' },
          vscode.CompletionItemKind.Field
        )
    );

    return new vscode.CompletionList(completions);
  }
}

export class PnpmConfigurationCompletion
  implements vscode.CompletionItemProvider
{
  public static selector: vscode.DocumentSelector = {
    pattern: '/**/.npmrc',
    scheme: 'file',
  };

  public static trigger: string = '=';

  public provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext
  ) {
    const line = document.lineAt(position);

    const lineText = `${line.text.substring(0, position.character)}`;

    const completionItems = (
      NPMRC_COMPLETION_ITEMS[<NPMRCKeyUnions>lineText.replace('=', '')] ?? []
    ).map(
      (item) =>
        new vscode.CompletionItem(
          { label: item, description: 'pnpm configuration' },
          vscode.CompletionItemKind.Value
        )
    );

    return new vscode.CompletionList(completionItems);
  }
}

export class PnpmWorkspaceConfigurationCompletion {}
