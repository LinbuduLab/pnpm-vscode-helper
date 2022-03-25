import * as vscode from 'vscode';
import * as yaml from 'js-yaml';
import * as path from 'path';

import { ICommandRegistry } from '../Utils/Typings';

/**
 * @deprecated
 */
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
