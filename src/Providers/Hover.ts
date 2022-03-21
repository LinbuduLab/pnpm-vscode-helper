import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { Utils } from '../Utils';
import { WorkspaceYAMLHoverTips } from '../Constants/WorkspaceYAML';
import { PackageJson } from 'type-fest';
import * as yaml from 'js-yaml';
import { PackageJsonHoverTips } from '../Constants/PackageJson';

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

    const purifiedWord = word.replaceAll('"', '');

    const isPNPMSpecifiedConfigField =
      (Utils.Matcher.composePNPMConfigFieldMatcher(word).test(json) &&
        PackageJsonHoverTips.supportedConfigFields.includes(purifiedWord)) ||
      PackageJsonHoverTips.supportedConfigRootFields.includes(purifiedWord);

    const hoverTips = PackageJsonHoverTips.ConfigFieldHoverTip();
    const matched = hoverTips[<keyof typeof hoverTips>purifiedWord];

    return isPNPMSpecifiedConfigField && matched
      ? new vscode.Hover(matched)
      : null;
  }
}
