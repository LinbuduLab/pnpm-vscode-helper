import * as vscode from 'vscode';
import { IConfiguration, Locale } from '../Utils/Typings';
import { Constants } from '../Constants';

interface IPrivateConfig {
  username?: string;
  email?: string;
}

export class PrivateExtensionConfigConfiguration
  implements IConfiguration<IPrivateConfig>
{
  public identifier = 'privateExtConfig';

  public defaultConfig = {};

  public read(): IPrivateConfig {
    return vscode.workspace
      .getConfiguration(Constants.ExtensionIdentifier)
      .get<IPrivateConfig>(this.identifier, this.defaultConfig);
  }

  public write(input: IPrivateConfig): void {
    vscode.workspace
      .getConfiguration(Constants.ExtensionIdentifier)
      .update(this.identifier, input, true);
  }
}
