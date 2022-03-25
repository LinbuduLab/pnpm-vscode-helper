import * as vscode from 'vscode';
import { IConfiguration } from '../Utils/Typings';
import { Constants } from '../Constants';

export class ShamefullyHoistConfiguration implements IConfiguration<boolean> {
  public identifier = 'shamefullyHoistEnabled';

  public defaultConfig = false;

  public read() {
    return vscode.workspace
      .getConfiguration(Constants.ExtensionIdentifier)
      .get<boolean>(this.identifier, this.defaultConfig);
  }

  public write(input: boolean): void {
    vscode.workspace
      .getConfiguration(Constants.ExtensionIdentifier)
      .update(this.identifier, input, vscode.ConfigurationTarget.Workspace);
  }
}

export class WorkspacePackagesConfiguration
  implements IConfiguration<Record<string, string>>
{
  public identifier = 'workspacePackages';

  public defaultConfig = {};

  public read() {
    return vscode.workspace
      .getConfiguration(Constants.ExtensionIdentifier)
      .get<Record<string, string>>(this.identifier, this.defaultConfig);
  }

  public write(input: Record<string, string>): void {
    vscode.workspace
      .getConfiguration(Constants.ExtensionIdentifier)
      .update(this.identifier, input, vscode.ConfigurationTarget.Workspace);
  }
}
