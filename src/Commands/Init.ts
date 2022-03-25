import * as vscode from 'vscode';
import { ICommandRegistry } from '../Utils/Typings';
import { ExtensionConfiguration } from '../Configurations';

export class Init {
  public static get InitInteractively(): ICommandRegistry {
    return {
      command: 'init-interactively',
      callback: async (args: any) => {},
    };
  }
}
