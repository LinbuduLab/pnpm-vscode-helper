import * as vscode from 'vscode';
import { ICommandRegistry } from '../Utils/Typings';
import { ExtensionConfiguration } from '../Configurations';

/**
 * @not-at-this-time
 */
export class Init {
  public static get InitInteractively(): ICommandRegistry {
    return {
      command: 'init-interactively',
      callback: async (args: any) => {},
    };
  }
}
