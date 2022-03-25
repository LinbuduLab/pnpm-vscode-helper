import * as vscode from 'vscode';

export class Tips {
  public static NoPackageSelectedTip() {
    vscode.window.showInformationMessage('No package selected.');
  }

  public static NoPackageFoundTip() {
    vscode.window.showInformationMessage(
      'No package found in current workspace.'
    );
  }

  public static PackageNotFoundTip(packageName: string) {
    vscode.window.showInformationMessage(
      `Package '${packageName}' not found in current workspace.`
    );
  }
}
