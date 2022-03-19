import * as vscode from 'vscode';
import { ICommandRegistry, Constants, Utils } from '../utils';
import { ExtensionConfiguration } from '../Configurations';

export class Init {
  public static get InitWithInteractive(): ICommandRegistry {
    return {
      command: 'init',
      callback: async (args: any) => {},
    };
  }
}
