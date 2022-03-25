import * as vscode from 'vscode';
import { IConfiguration, Locale } from '../Utils/Typings';
import { Constants } from '../Constants';

// [[GroupIdentifier,['pkg1','pkg2']],[]]

type WorkspacePackageGroup = Array<[string, string[]]>;

export class WorkspacePackageGroupConfiguration
  implements IConfiguration<WorkspacePackageGroup>
{
  public identifier = 'workspacePackageGroups';

  public defaultConfig = [];

  public read(): WorkspacePackageGroup {
    return vscode.workspace
      .getConfiguration(Constants.ExtensionIdentifier)
      .get<WorkspacePackageGroup>(this.identifier, this.defaultConfig);
  }

  public write(input: WorkspacePackageGroup): void {
    vscode.workspace
      .getConfiguration(Constants.ExtensionIdentifier)
      .update(this.identifier, input, vscode.ConfigurationTarget.Workspace);
  }
}
