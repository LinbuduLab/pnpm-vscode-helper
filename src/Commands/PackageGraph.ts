import * as vscode from 'vscode';
import { ICommandRegistry } from '../Utils/Typings';
import { ExtensionConfiguration } from '../Configurations';

/**
 * There is nothing here now :P
 */
export class PackageGraph {
  public static get DisplayWorkspaceProjectGraph(): ICommandRegistry {
    return {
      command: 'display-workspace-project-graph',
      callback: async (args: any) => {},
    };
  }
}
