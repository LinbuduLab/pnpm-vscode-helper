import * as vscode from 'vscode';

import { ExtensionConfiguration } from '../Configurations';
import { Utils } from '../Utils';

export class ExtensionExperimentalHook {
  public static async experimentalWorks(context: vscode.ExtensionContext) {}
}
