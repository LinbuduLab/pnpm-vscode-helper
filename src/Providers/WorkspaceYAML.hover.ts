import * as vscode from 'vscode';
import * as path from 'path';
import { WorkspaceYAMLHoverTips } from '../Constants/WorkspaceYAML';

export class PNPMWorkspaceYAMLHoverProvider implements vscode.HoverProvider {
  public static selector: vscode.DocumentSelector = {
    pattern: '/**/pnpm-workspace.yaml',
    scheme: 'file',
  };

  public provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ) {
    const fileName = document.fileName;
    const workDir = path.posix.dirname(fileName);
    const word = document.getText(document.getWordRangeAtPosition(position));

    const purifiedWord = word.replace(':', '');

    if (purifiedWord === 'packages') {
      return WorkspaceYAMLHoverTips.PackagesFieldTip();
    }

    // const yamlContent = document.getText();
    const tips = WorkspaceYAMLHoverTips.OtherYamlFieldHoverTip();

    if (!Object.keys(tips).includes(purifiedWord)) {
      return null;
    }

    // const parsed = <Record<string, string>>yaml.load(yamlContent);

    // const hoverKeyMapped = parsed[purifiedWord];

    return new vscode.Hover(tips[<keyof typeof tips>purifiedWord]);
  }
}
