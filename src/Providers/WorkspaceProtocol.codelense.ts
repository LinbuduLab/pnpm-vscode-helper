import * as vscode from 'vscode';
import { CodeLen } from '../Commands/CodeLen';
import { ExtensionConfiguration } from '../Configurations';
import { Utils } from '../Utils';

/**
 * CodelensProvider
 */
export class WorkspaceProtocolCodelenseProvider
  implements vscode.CodeLensProvider
{
  private codeLenses: vscode.CodeLens[] = [];

  private regex: RegExp;

  private _onDidChangeCodeLenses: vscode.EventEmitter<void> =
    new vscode.EventEmitter<void>();

  public readonly onDidChangeCodeLenses: vscode.Event<void> =
    this._onDidChangeCodeLenses.event;

  constructor() {
    this.regex = /(.+)/g;

    vscode.workspace.onDidChangeConfiguration((_) => {
      this._onDidChangeCodeLenses.fire();
    });
  }

  public provideCodeLenses(
    document: vscode.TextDocument,
    token: vscode.CancellationToken
  ): vscode.CodeLens[] | Thenable<vscode.CodeLens[]> {
    if (ExtensionConfiguration.codeLen.read()) {
      this.codeLenses = [];
      const regex = new RegExp(this.regex);
      const text = document.getText();
      let matches;
      while ((matches = regex.exec(text)) !== null) {
        const line = document.lineAt(document.positionAt(matches.index).line);
        const indexOf = line.text.indexOf(matches[0]);
        const position = new vscode.Position(line.lineNumber, indexOf);
        const range = document.getWordRangeAtPosition(
          position,
          new RegExp(this.regex)
        );
        console.log('range: ', range);
        if (range) {
          this.codeLenses.push(new vscode.CodeLens(range));
        }
      }
      return this.codeLenses;
    }
    return [];
  }

  public resolveCodeLens(
    codeLens: vscode.CodeLens,
    token: vscode.CancellationToken
  ) {
    console.log('codeLens: ', codeLens);
    if (ExtensionConfiguration.codeLen.read()) {
      codeLens.command = {
        title: 'Codelens provided by sample extension',
        tooltip: 'Tooltip provided by sample extension',
        command: Utils.composeCommand(CodeLen.CodeLenClickHandler.command),
        arguments: ['Argument 1', false],
      };
      return codeLens;
    }
    return null;
  }
}