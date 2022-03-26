import * as vscode from 'vscode';
import { PackageUtils } from './Package';
import { PackageFilterType } from './Typings';

export class TerminalUtils {
  public static createTerminalForDirectInstallation(
    packagesFilter: string[] = []
  ) {
    const depsTerminal = vscode.window.createTerminal(
      `Dependencies Installation Terminal`
    );

    const locationArgs = packagesFilter.length
      ? `${packagesFilter.map((filter) => `--filter='${filter}'`).join(' ')}`
      : '--workspace-root';

    depsTerminal.show(false);
    depsTerminal.sendText(`pnpm install ${locationArgs}`);
  }

  public static createTerminalForDepsInstallation(
    deps: string[],
    packagesFilter: string[] = []
  ) {
    const depsTerminal = vscode.window.createTerminal(
      `Dependencies Installation Terminal`
    );

    const locationArgs = packagesFilter.length
      ? `${packagesFilter.map((filter) => `--filter='${filter}'`).join(' ')}`
      : '--workspace-root';

    depsTerminal.show(false);
    depsTerminal.sendText(`pnpm install ${deps.join(' ')} ${locationArgs}`);
  }

  public static createTerminalForDevDepsInstallation(
    devDeps: string[],
    packagesFilter: string[] = []
  ) {
    const devDepsTerminal = vscode.window.createTerminal(
      `DevDependencies Installation Terminal`
    );

    const locationArgs = packagesFilter.length
      ? `${packagesFilter.map((filter) => `--filter='${filter}'`).join(' ')}`
      : '--workspace-root';

    devDepsTerminal.show(false);
    devDepsTerminal.sendText(
      `pnpm install ${devDeps.join(' ')} --save-dev ${locationArgs}`
    );
  }

  public static createTerminalForScriptExecution(
    targetPackage: string,
    script: string,
    executeType: PackageFilterType = 'self'
  ) {
    const executionTerminal = vscode.window.createTerminal(
      `Script Execution Terminal`
    );

    const locationArgs = PackageUtils.targetFilterTypeFactory(
      targetPackage,
      executeType
    );

    executionTerminal.show(false);
    executionTerminal.sendText(
      `pnpm${
        script === 'install' ? '' : ' run'
      } ${script} ${locationArgs} --if-present`
    );
  }
}
