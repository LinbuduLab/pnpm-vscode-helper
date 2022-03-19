import { ExtensionContext, window, commands, ProgressLocation } from 'vscode';

export class ProgressHelper {
  public static sample(context: ExtensionContext) {
    context.subscriptions.push(
      commands.registerCommand('pnpm-vscode-helper.startTask', () => {
        window.withProgress(
          {
            location: ProgressLocation.Notification,
            title: 'I am long running!',
            cancellable: true,
          },
          (progress, token) => {
            token.onCancellationRequested(() => {
              console.log('User canceled the long running operation');
            });

            progress.report({ increment: 0 });

            setTimeout(() => {
              progress.report({
                increment: 10,
                message: 'I am long running! - still going...',
              });
            }, 1000);

            setTimeout(() => {
              progress.report({
                increment: 40,
                message: 'I am long running! - still going even more...',
              });
            }, 2000);

            setTimeout(() => {
              progress.report({
                increment: 50,
                message: 'I am long running! - almost there...',
              });
            }, 3000);

            const p = new Promise<void>((resolve) => {
              setTimeout(() => {
                resolve();
              }, 5000);
            });

            return p;
          }
        );
      })
    );
  }
}
