import * as vscode from 'vscode';
import { ICommandRegistry, Constants } from '../utils';
import {
  ExtensionConfiguration,
  SharedBooleanConfigChoices,
} from '../Configurations';

export class Workspace {
  public static get supportedChoices(): SharedBooleanConfigChoices {
    return ['enable', 'disable'];
  }

  public static get ToggleWorkspaceFeatureStatus(): ICommandRegistry {
    return {
      command: 'toggleWorkspaceFeature',
      callback: () => {
        vscode.window.showQuickPick(Workspace.supportedChoices).then((v) => {
          if (!v) {
            return;
          }

          ExtensionConfiguration.workspace.write(v === 'enable');
          vscode.window.showInformationMessage(
            '`Workspace` Feature Status Changed! '
          );
        });
      },
    };
  }
}
