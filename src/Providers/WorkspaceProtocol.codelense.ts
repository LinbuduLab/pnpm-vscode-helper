import * as vscode from 'vscode';
import { CodeLen } from '../Commands/Codelen';
import { ExtensionConfiguration } from '../Configurations';
import { Utils } from '../Utils';

/**
 * Codelense provider for workspace: protocol jump.
 */
export class WorkspaceProtocolCodelenseProvider
  implements vscode.CodeLensProvider
{
  public static selector = 'json';

  private codeLenses: vscode.CodeLens[] = [];

  private regex: RegExp = /workspace\:/g;

  private _onDidChangeCodeLenses: vscode.EventEmitter<void> =
    new vscode.EventEmitter<void>();

  public readonly onDidChangeCodeLenses: vscode.Event<void> =
    this._onDidChangeCodeLenses.event;

  constructor() {
    vscode.workspace.onDidChangeConfiguration((_) => {
      this._onDidChangeCodeLenses.fire();
    });
  }

  public async provideCodeLenses(
    document: vscode.TextDocument,
    token: vscode.CancellationToken
  ): Promise<vscode.CodeLens[]> {
    this.codeLenses = [];

    if (!ExtensionConfiguration.codelen.read()) {
      return this.codeLenses;
    }

    if (!(await Utils.Workspace.checkInsidePNPMWorkspace())) {
      return this.codeLenses;
    }

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

      const { text, firstNonWhitespaceCharacterIndex } = line;

      const pair = text.slice(firstNonWhitespaceCharacterIndex);

      const [packageIdentifier] = pair.split(':');

      if (range) {
        this.codeLenses.push(
          new vscode.CodeLens(range, {
            title: 'Click to open workspace package folder',
            command: Utils.composeCommand(CodeLen.CodeLenClickHandler.command),
            arguments: [
              packageIdentifier.replaceAll("'", '').replaceAll('"', ''),
            ],
          })
        );
      }
    }
    return this.codeLenses;
  }

  public resolveCodeLens(
    codeLens: vscode.CodeLens,
    token: vscode.CancellationToken
  ) {
    if (!ExtensionConfiguration.codelen.read()) {
      return null;
    }

    return codeLens;
  }
}
