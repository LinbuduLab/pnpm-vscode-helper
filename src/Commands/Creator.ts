import * as vscode from 'vscode';
import { Utils } from '../Utils';
import { ICommandRegistry } from '../Utils/Typings';
import { ExtensionConfiguration } from '../Configurations';
import { NPMRCInitialContent } from '../Constants/NPMRC';
import { WorkspaceYAMLInitialContent } from '../Constants/WorkspaceYAML';

export class Creator {
  public static get CreateNPMRCConfig(): ICommandRegistry {
    return {
      command: 'create-npm-rc-config',
      callback: (args: any) => {
        Utils.Workspace.createFile('.npmrc', NPMRCInitialContent.content);
      },
    };
  }

  public static get CreatePNPMWorkspaceConfig(): ICommandRegistry {
    return {
      command: 'create-pnpm-workspace-config',
      callback: (args: any) => {
        Utils.Workspace.createFile(
          'pnpm-workspace.yaml',
          WorkspaceYAMLInitialContent.content
        );
      },
    };
  }
}
