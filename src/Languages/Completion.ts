import * as vscode from 'vscode';
import * as path from 'path';
import {
  NPMRC_COMPLETION_KEYS,
  NPMRC_COMPLETION_ITEMS,
  PNPM_WORKSPACE_YAML_KEYS,
  PNPM_WORKSPACE_YAML_ITEMS,
} from '../Constants/NPMRC';

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

  public static trigger: string = ':';

  public provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext
  ) {
    const line = document.lineAt(position);

    const lineText = `${line.text.substring(0, position.character)}`;

    const completionItems = (
      PNPM_WORKSPACE_YAML_ITEMS[lineText.trimEnd().replace(':', '')] ?? []
    ).map(
      (item) =>
        new vscode.CompletionItem(
          { label: item, description: 'pnpm workspace configuration' },
          vscode.CompletionItemKind.Value
        )
    );

    console.log('completionItems: ', completionItems);

    return new vscode.CompletionList(completionItems);
  }
}

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
      NPMRC_COMPLETION_ITEMS[lineText.replace('=', '')] ?? []
    ).map(
      (item) =>
        new vscode.CompletionItem(
          { label: item, description: 'pnpm configuration' },
          vscode.CompletionItemKind.Value
        )
    );

    return new vscode.CompletionList(completionItems);
  }

  public static sample1(context: vscode.ExtensionContext) {
    const provider1 = vscode.languages.registerCompletionItemProvider(
      'plaintext',
      {
        provideCompletionItems(
          document: vscode.TextDocument,
          position: vscode.Position,
          token: vscode.CancellationToken,
          context: vscode.CompletionContext
        ) {
          // a simple completion item which inserts `Hello World!`
          const simpleCompletion = new vscode.CompletionItem('Hello World!');

          // a completion item that inserts its text as snippet,
          // the `insertText`-property is a `SnippetString` which will be
          // honored by the editor.
          const snippetCompletion = new vscode.CompletionItem(
            'Good part of the day'
          );
          snippetCompletion.insertText = new vscode.SnippetString(
            'Good ${1|morning,afternoon,evening|}. It is ${1}, right?'
          );
          const docs: any = new vscode.MarkdownString(
            'Inserts a snippet that lets you select [link](x.ts).'
          );
          snippetCompletion.documentation = docs;
          docs.baseUri = vscode.Uri.parse('http://example.com/a/b/c/');

          // a completion item that can be accepted by a commit character,
          // the `commitCharacters`-property is set which means that the completion will
          // be inserted and then the character will be typed.
          const commitCharacterCompletion = new vscode.CompletionItem(
            'console'
          );
          commitCharacterCompletion.commitCharacters = ['.'];
          commitCharacterCompletion.documentation = new vscode.MarkdownString(
            'Press `.` to get `console.`'
          );

          // a completion item that retriggers IntelliSense when being accepted,
          // the `command`-property is set which the editor will execute after
          // completion has been inserted. Also, the `insertText` is set so that
          // a space is inserted after `new`
          const commandCompletion = new vscode.CompletionItem('new');
          commandCompletion.kind = vscode.CompletionItemKind.Keyword;
          commandCompletion.insertText = 'new ';
          commandCompletion.command = {
            command: 'editor.action.triggerSuggest',
            title: 'Re-trigger completions...',
          };

          // return all completion items as array
          return [
            simpleCompletion,
            snippetCompletion,
            commitCharacterCompletion,
            commandCompletion,
          ];
        },
      }
    );
    return provider1;
  }

  public static sample2(context: vscode.ExtensionContext) {
    const provider2 = vscode.languages.registerCompletionItemProvider(
      'plaintext',
      {
        provideCompletionItems(
          document: vscode.TextDocument,
          position: vscode.Position
        ) {
          // get all text until the `position` and check if it reads `console.`
          // and if so then complete if `log`, `warn`, and `error`
          const linePrefix = document
            .lineAt(position)
            .text.substr(0, position.character);
          if (!linePrefix.endsWith('console.')) {
            return undefined;
          }

          return [
            new vscode.CompletionItem('log', vscode.CompletionItemKind.Method),
            new vscode.CompletionItem('warn', vscode.CompletionItemKind.Method),
            new vscode.CompletionItem(
              'error',
              vscode.CompletionItemKind.Method
            ),
          ];
        },
      },
      '.' // triggered whenever a '.' is being typed
    );

    return provider2;
  }
}

export class PnpmWorkspaceConfigurationCompletion {}