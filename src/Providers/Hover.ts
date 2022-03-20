import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { Utils } from '../Utils';
import { WorkspaceYAMLHoverTips } from '../Constants/WorkspaceYAML';
import { PackageJson } from 'type-fest';
import * as yaml from 'js-yaml';

export class PNPMWorkspaceYAMLHoverProvider implements vscode.HoverProvider {
  public static selector: vscode.DocumentSelector = {
    pattern: '/**/pnpm-workspace.yaml',
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

export class PackageJsonHoverProvider implements vscode.HoverProvider {
  public static selector: vscode.DocumentSelector = {
    pattern: '/**/package.json',
  };

  public provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ) {
    const fileName = document.fileName;
    const workDir = path.posix.dirname(fileName);
    const word = document.getText(document.getWordRangeAtPosition(position));

    const json = document.getText();
    if (Utils.composeDepsFieldMatcher(word).test(json)) {
      const destPath = `${Utils.resolveWorkSpaceModulePath(
        workDir,
        word
      )}/package.json`;

      if (fs.existsSync(destPath)) {
        const content = <PackageJson>require(destPath);
        return new vscode.Hover(
          `* **名称**：${content.name}\n* **版本**：${content.version}\n* **许可协议**：${content.license}`
        );
      }
      return null;
    }
  }
}
