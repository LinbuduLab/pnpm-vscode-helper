import * as vscode from 'vscode';
import { ICommandRegistry } from '../Utils/Typings';
import { ExtensionConfiguration } from '../Configurations';

/**
 * @not-at-this-time
 */
export class GlobalInfo {
  public static get Sample1(): ICommandRegistry {
    return {
      command: 'sample-command1',
      callback: async (args: any) => {},
    };
  }

  public static get Sample2(): ICommandRegistry {
    return {
      command: 'sample-command2',
      callback: async (args: any) => {},
    };
  }
}
