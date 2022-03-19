import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { Utils } from '../utils';
import { PackageJson } from 'type-fest';

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
