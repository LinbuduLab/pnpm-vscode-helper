import * as vscode from 'vscode';
import {
  PNPM_WORKSPACE_YAML_KEYS,
  PNPM_WORKSPACE_YAML_ITEMS,
  PNPMWorkspaceYAMLKeyUnions,
} from '../Constants/WorkspaceYAML';

export class PNPMWorkspaceYAMLKeyCompletion
  implements vscode.CompletionItemProvider
{
  public static selector: vscode.DocumentSelector = {
    pattern: '/**/pnpm-workspace.yaml',
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

    const completions = PNPM_WORKSPACE_YAML_KEYS.filter((key) =>
      key.startsWith(lineText)
    ).map(
      (item) =>
        new vscode.CompletionItem(
          { label: item, description: 'pnpm workspace configuration' },
          vscode.CompletionItemKind.Field
        )
    );

    return new vscode.CompletionList(completions);
  }
}

export class PNPMWorkspaceYAMLCompletion
  implements vscode.CompletionItemProvider
{
  public static selector: vscode.DocumentSelector = {
    pattern: '/**/pnpm-workspace.yaml',
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
      PNPM_WORKSPACE_YAML_ITEMS[
        <PNPMWorkspaceYAMLKeyUnions>(
          lineText.replace(PNPMWorkspaceYAMLCompletion.trigger, '')
        )
      ] ?? []
    ).map(
      (item) =>
        new vscode.CompletionItem(
          { label: item, description: 'pnpm workspace configuration' },
          vscode.CompletionItemKind.Value
        )
    );

    return new vscode.CompletionList([
      new vscode.CompletionItem(
        { label: 'item', description: 'pnpm workspace configuration' },
        vscode.CompletionItemKind.Value
      ),
    ]);
  }
}
