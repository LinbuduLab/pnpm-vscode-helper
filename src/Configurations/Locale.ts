import * as vscode from 'vscode';
import { IConfiguration, Locale } from '../Utils/Typings';
import { Constants } from '../Constants';

export class LocaleConfigurations implements IConfiguration<Locale> {
  public identifier = 'locale';

  public defaultConfig: Locale = 'en-US';

  public read() {
    return vscode.workspace
      .getConfiguration(Constants.ExtensionIdentifier)
      .get<Locale>(this.identifier, this.defaultConfig);
  }

  public write(input: Locale): void {
    vscode.workspace
      .getConfiguration(Constants.ExtensionIdentifier)
      .update(this.identifier, input, true);
  }
}
