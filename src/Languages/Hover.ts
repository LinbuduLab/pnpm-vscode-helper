import * as vscode from 'vscode';

export class ExtensionHoverProvider {
  public static Sample() {
    vscode.languages.registerHoverProvider('javascript', {
      provideHover(document, position, token) {
        return {
          contents: ['Hover Content'],
        };
      },
    });
  }
}

export class SampleHoverProvider implements vscode.HoverProvider {
  public provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ) {
    console.log(document.fileName);
    return new vscode.Hover('xxxxxx');
  }
}
