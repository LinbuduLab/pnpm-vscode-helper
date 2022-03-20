import * as vscode from 'vscode';

export class TerminalUtils {
  public static createTerminalForDirectInstallation(
    packagesFilter: string[] = []
  ) {
    const depsTerminal = vscode.window.createTerminal(
      `Dependencies Installation Terminal`
    );

    const locationArgs = packagesFilter.length
      ? `--filter='${packagesFilter.join(',')}'`
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
      ? `--filter='${packagesFilter.join(',')}'`
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
      ? `--filter='${packagesFilter.join(',')}'`
      : '--workspace-root';

    devDepsTerminal.show(false);
    devDepsTerminal.sendText(
      `pnpm install ${devDeps.join(' ')} --save-dev ${locationArgs}`
    );
  }
}
