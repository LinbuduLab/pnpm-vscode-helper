import * as vscode from 'vscode';
import { Utils } from '../Utils';
import { ICommandRegistry } from '../Utils/Typings';
import { ExtensionConfiguration } from '../Configurations';

export class Creator {
  public static get CreateNPMRCConfig(): ICommandRegistry {
    return {
      command: 'create-npm-rc-config',
      callback: (args: any) => {
        Utils.Workspace.createFile('/extension-tmp/.npm1rc', 'hoist=true');
      },
    };
  }

  public static get CreatePNPMWorkspaceConfig(): ICommandRegistry {
    return {
      command: 'create-pnpm-workspace-config',
      callback: (args: any) => {
        Utils.Workspace.createFile('/extension-tmp/pnpm-workspace.yaml', 'tmp');
      },
    };
  }
}
