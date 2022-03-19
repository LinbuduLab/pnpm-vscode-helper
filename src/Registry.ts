import * as vscode from 'vscode';
import { Locale } from './Commands/Locale';
import { CodeLen } from './Commands/CodeLen';
import { Workspace } from './Commands/Workspace';
import { ScanWorkspace } from './Commands/Scanner';
import { PnpmConfigurationCompletion } from './Languages/Completion';
import { CodelensProvider } from './Providers/CodeLen';
import { Utils } from './utils';
import { SampleHoverProvider } from './Languages/Hover';
import * as fs from 'fs';
import * as path from 'path';
import { ExtensionConfiguration } from './Configurations';

export class ExtensionRegistry {
  public static registerLocaleCommand(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      // Locale
      vscode.commands.registerCommand(
        Utils.composeCommand(Locale.ToggleLocale.command),
        Locale.ToggleLocale.callback
      ),
      // Sample
      vscode.commands.registerCommand(
        Utils.composeCommand(Locale.Sample.command),
        Locale.Sample.callback
      )
    );
  }

  public static registerCodeLenCommand(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      vscode.commands.registerCommand(
        Utils.composeCommand(CodeLen.EnableCodeLen.command),
        CodeLen.EnableCodeLen.callback
      ),
      vscode.commands.registerCommand(
        Utils.composeCommand(CodeLen.DisableCodeLen.command),
        CodeLen.DisableCodeLen.callback
      ),
      vscode.commands.registerCommand(
        Utils.composeCommand(CodeLen.CodeLenClickHandler.command),
        CodeLen.CodeLenClickHandler.callback
      )
    );
  }

  public static registerWorkspaceCommand(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      vscode.commands.registerCommand(
        Utils.composeCommand(Workspace.ToggleWorkspaceFeatureStatus.command),
        Workspace.ToggleWorkspaceFeatureStatus.callback
      )
    );
  }

  public static registerScanWorkspaceCommand(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      vscode.commands.registerCommand(
        Utils.composeCommand(ScanWorkspace.Scan.command),
        ScanWorkspace.Scan.callback
      )
    );
  }

  public static registerCompletionProviders(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      // Pnpm Configuration in .npmrc file
      PnpmConfigurationCompletion.sample1(context),
      PnpmConfigurationCompletion.sample2(context)
      // Pnpm Worksapce Configuration in pnpm-workspace.yaml file
      // Pnpm File Configuration in .pnpmfile.cjs file
    );
  }

  public static registerCodeLensProvider(context: vscode.ExtensionContext) {
    vscode.languages.registerCodeLensProvider('*', new CodelensProvider());
  }

  public static registerHoverProvider(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      vscode.languages.registerHoverProvider(
        // {
        //   pattern: 'pnpm-workspace.yaml',
        // },
        'json',
        {
          provideHover(document, position, token) {
            const fileName = document.fileName;
            const workDir = path.dirname(fileName);
            const word = document.getText(
              document.getWordRangeAtPosition(position)
            );

            if (/\/package\.json$/.test(fileName)) {
              console.log('进入provideHover方法');
              const json = document.getText();
              if (
                new RegExp(
                  `"(dependencies|devDependencies)":\\s*?\\{[\\s\\S]*?${word.replace(
                    /\//g,
                    '\\/'
                  )}[\\s\\S]*?\\}`,
                  'gm'
                ).test(json)
              ) {
                let destPath = `${workDir}/node_modules/${word.replace(
                  /"/g,
                  ''
                )}/package.json`;
                if (fs.existsSync(destPath)) {
                  const content = require(destPath);
                  console.log('hover已生效');
                  // hover内容支持markdown语法
                  return new vscode.Hover(
                    `* **名称**：${content.name}\n* **版本**：${content.version}\n* **许可协议**：${content.license}`
                  );
                }
              }
            }
          },
        }
      )
    );
  }

  public static async preProcess(context: vscode.ExtensionContext) {
    const npmRC = await vscode.workspace.findFiles(
      '.npmrc',
      '**/node_modules/**',
      1
    );
    if (!npmRC.length) {
      // todo: remove
      vscode.window.showWarningMessage('file .npmrc is not found');
      return;
    }

    const content = (await vscode.workspace.fs.readFile(npmRC[0])).toString();

    // todo: .rc parser
    const [, _] = content.split('shamefully-hoist=');

    const shamefullyHoistEnabled = _.startsWith('true');

    ExtensionConfiguration.shamefullyHoist.write(shamefullyHoistEnabled);

    shamefullyHoistEnabled &&
      vscode.window.showInformationMessage('shamefully-hoist enabled.');
  }
}
