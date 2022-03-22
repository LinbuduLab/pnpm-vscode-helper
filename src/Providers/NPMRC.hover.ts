import * as vscode from 'vscode';
import * as path from 'path';
import { Utils } from '../Utils';
import { PackageJsonHoverTips } from '../Constants/PackageJson';

export class NPMRCHoverProvider implements vscode.HoverProvider {
  public static selector: vscode.DocumentSelector = {
    pattern: '/**/.npmrc',
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

    return new vscode.Hover('matched');
  }
}
