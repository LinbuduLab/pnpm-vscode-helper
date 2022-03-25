import * as vscode from 'vscode';
import * as path from 'path';

import { Utils } from '../Utils';
import type { ICommandRegistry } from '../Utils/Typings';
import { ExtensionConfiguration } from '../Configurations';

export class CodeLen {
  public static get CodeLenClickHandler(): ICommandRegistry {
    return {
      command: 'codelensAction',
      callback: async (packageName: string) => {
        const workspacePackages =
          (await Utils.Workspace.collectWorkspacePackages()) ?? {};

        if (!(packageName in workspacePackages)) {
          Utils.Tips.PackageNotFoundTip(packageName);
          return;
        }

        const opened = await vscode.workspace.openTextDocument(
          vscode.Uri.from({
            scheme: 'file',
            path: path.posix.resolve(
              workspacePackages[packageName],
              'package.json'
            ),
          })
        );

        await vscode.window.showTextDocument(
          opened,
          vscode.ViewColumn.Active,
          false
        );
        // try open package.json main > ?
      },
    };
  }
}
