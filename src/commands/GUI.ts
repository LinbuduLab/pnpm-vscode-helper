import * as vscode from 'vscode';
import { ICommandRegistry, Constants, Utils } from '../utils';
import { ExtensionConfiguration } from '../Configurations';

export class GUI {
  public static get OpenExtensionConfigureGUI(): ICommandRegistry {
    return {
      command: 'open-configure-gui',
      callback: async (args: any) => {},
    };
  }
}
