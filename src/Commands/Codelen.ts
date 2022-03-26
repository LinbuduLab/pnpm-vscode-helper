import * as vscode from 'vscode';
import * as path from 'path';
import { Utils } from '../Utils';
import type { ICommandRegistry } from '../Utils/Typings';

export class CodeLen {
  public static get CodeLenClickHandler(): ICommandRegistry {
    return {
      command: 'codelensAction',
      callback: async (packageName: string) => {
        if (!packageName) {
          return;
        }

        const workspacePackages =
          (await Utils.Workspace.collectWorkspacePackages()) ?? {};

        if (!(packageName in workspacePackages)) {
          Utils.Tips.PackageNotFoundTip(packageName);
          return;
        }

        const target = vscode.Uri.from({
          scheme: 'file',
          path: path.posix.resolve(
            workspacePackages[packageName],
            'package.json'
          ),
        });

        const opened = await vscode.workspace.openTextDocument(target);

        await vscode.window.showTextDocument(
          opened,
          vscode.ViewColumn.Beside,
          false
        );
      },
    };
  }
}
