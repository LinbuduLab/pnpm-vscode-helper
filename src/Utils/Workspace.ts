import * as vscode from 'vscode';

export class WorkspaceUtils {
  public static resolveCurrentWorkspaceAbsolutePath() {
    const wsPath = vscode.workspace.workspaceFolders![0].uri.fsPath;
    return wsPath;
  }

  public static resolveWorkSpaceModulePath(
    workDir: string,
    moduleName: string
  ) {
    return `${workDir}/node_modules/${moduleName.replace(/"/g, '')}`;
  }

  public static createFile(filePath: string, fileContent: string) {
    const wsedit = new vscode.WorkspaceEdit();
    const wsPath = vscode.workspace.workspaceFolders![0].uri.fsPath;
    const fileUri = vscode.Uri.file(wsPath + filePath);

    wsedit.createFile(fileUri, { ignoreIfExists: true });

    wsedit.insert(fileUri, new vscode.Position(0, 0), fileContent);

    vscode.workspace.applyEdit(wsedit);
    vscode.workspace.openTextDocument(fileUri);

    vscode.window.showInformationMessage(`Created file: ${filePath}`);
  }

  public static async createConfirmDialog(message: string): Promise<boolean> {
    const confirm = await vscode.window.showInformationMessage(
      message,
      'Confirm',
      'Cancel'
    );

    return confirm === 'Confirm';
  }
}
