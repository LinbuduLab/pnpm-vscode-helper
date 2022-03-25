import * as vscode from 'vscode';
import { IConfiguration, Locale } from '../Utils/Typings';
import { Constants } from '../Constants';

export class CodelenConfiguration implements IConfiguration<boolean> {
  public identifier = 'enableCodeLens';

  public defaultConfig = false;

  public read() {
    return vscode.workspace
      .getConfiguration(Constants.ExtensionIdentifier)
      .get<boolean>(this.identifier, this.defaultConfig);
  }

  public write(input: boolean): void {
    vscode.workspace
      .getConfiguration(Constants.ExtensionIdentifier)
      .update(this.identifier, input, true);
  }
}
