import * as vscode from 'vscode';
import { ICommandRegistry, Constants, Utils } from '../utils';
import { ExtensionConfiguration } from '../Configurations';

/**
 * info with pnpm init
 */

export class PrivateExtensionConfigure {
  public static get CreatePrivateConfig(): ICommandRegistry {
    return {
      command: 'create-private-extension-config',
      callback: async (args: any) => {},
    };
  }

  public static get RemovePrivateConfig(): ICommandRegistry {
    return {
      command: 'remove-private-extension-config',
      callback: async (args: any) => {},
    };
  }
}
