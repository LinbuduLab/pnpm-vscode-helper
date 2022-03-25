import * as vscode from 'vscode';
import { IConfiguration, Locale } from '../Utils/Typings';
import { Constants } from '../Constants';

export class ExtraWorkspaceScriptsConfigConfiguration
  implements IConfiguration<string[]>
{
  public identifier = 'extraWorkspaceScripts';

  public defaultConfig = [];

  public read(): string[] {
    return vscode.workspace
      .getConfiguration(Constants.ExtensionIdentifier)
      .get<string[]>(this.identifier, this.defaultConfig);
  }

  public write(input: string[]): void {
    vscode.workspace
      .getConfiguration(Constants.ExtensionIdentifier)
      .update(this.identifier, input, vscode.ConfigurationTarget.Workspace);
  }
}
