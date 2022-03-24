import * as vscode from 'vscode';
import { ICommandRegistry } from '../Utils/Typings';
import { ExtensionConfiguration } from '../Configurations';
import { Utils } from '../Utils';
import path = require('path');

export class CodeLen {
  public static get CodeLenClickHandler(): ICommandRegistry {
    return {
      command: 'codelensAction',
      callback: async (packageName: string) => {
        vscode.window.showInformationMessage(
          `CodeLens action clicked with args=${packageName}`
        );
        const workspacePackages =
          (await Utils.Workspace.collectWorkspacePackages()) ?? {};

        if (!(packageName in workspacePackages)) {
          vscode.window.showInformationMessage(
            `Package '${packageName}' not found in current workspace.`
          );
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
