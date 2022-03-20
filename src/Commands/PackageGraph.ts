import * as vscode from 'vscode';
import { ICommandRegistry } from '../Utils/Typings';
import { ExtensionConfiguration } from '../Configurations';

export class PackageGraph {
  public static get DisplayWorkspaceProjectGraph(): ICommandRegistry {
    return {
      command: 'display-workspace-project-graph',
      callback: async (args: any) => {},
    };
  }
}
