import * as vscode from 'vscode';
import { Utils } from '.';
import { ICommandRegistry } from './Typings';

export class RegisterHelper {
  public static registerCommand(input: ICommandRegistry) {
    return vscode.commands.registerCommand(
      Utils.composeCommand(input.command),
      input.callback
    );
  }

  public static registerHoverProvider(input: vscode.HoverProvider) {}
}
