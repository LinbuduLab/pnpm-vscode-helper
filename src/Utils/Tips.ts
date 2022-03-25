import * as vscode from 'vscode';

export class Tips {
  public static NoPackageSelectedTip() {
    vscode.window.showInformationMessage('No package selected.');
  }
}
