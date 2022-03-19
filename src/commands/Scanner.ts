import * as vscode from 'vscode';
import { ICommandRegistry } from '../utils';
import { ExtensionConfiguration } from '../Configurations';
import * as yaml from 'js-yaml';
import * as path from 'path';

const x = async () => {
  // TODO: 在

  vscode.workspace.getWorkspaceFolder;

  if (!vscode.window.activeTextEditor) {
    return vscode.window.showInformationMessage('Open a file first');
  }

  async function countAndTotalOfFilesInFolder(
    folder: vscode.Uri
  ): Promise<{ total: number; count: number }> {
    let total = 0;
    let count = 0;
    for (const [name, type] of await vscode.workspace.fs.readDirectory(
      folder
    )) {
      if (type === vscode.FileType.File) {
        const filePath = path.posix.join(folder.path, name);
        const stat = await vscode.workspace.fs.stat(
          folder.with({ path: filePath })
        );
        total += stat.size;
        count += 1;
      }
    }
    return { total, count };
  }

  const fileUri = vscode.window.activeTextEditor.document.uri;
  const folderPath = path.posix.dirname(fileUri.path);
  const folderUri = fileUri.with({ path: folderPath });
  vscode.window.showInformationMessage('folderUri: ' + folderUri);

  const info = await countAndTotalOfFilesInFolder(folderUri);
  const doc = await vscode.workspace.openTextDocument({
    content: `${info.count} files in ${folderUri.toString(
      true
    )} with a total of ${info.total} bytes`,
  });
  vscode.window.showTextDocument(doc, {
    viewColumn: vscode.ViewColumn.Beside,
  });
};

export class ScanWorkspace {
  public static get Scan(): ICommandRegistry {
    return {
      command: 'scan-workspace',
      callback: async () => {
        const pnpmWorkspaceConfigFile = await vscode.workspace.findFiles(
          'pnpm-workspace.yaml',
          '**/node_modules/**',
          1
        );

        if (!pnpmWorkspaceConfigFile.length) {
          vscode.window.showWarningMessage(
            'file pnpm-workspace.yaml is not found'
          );
          return;
        }

        const content = await vscode.workspace.fs.readFile(
          pnpmWorkspaceConfigFile[0]
        );

        const parsed = <IParsedPNPMWorkspaceYAMLContent>(
          yaml.load(content.toString())
        );
      },
    };
  }
}

export interface IParsedPNPMWorkspaceYAMLContent {
  packages: string[];
}
