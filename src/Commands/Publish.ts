import * as vscode from 'vscode';
import { ICommandRegistry } from '../Utils/Typings';
import { ExtensionConfiguration } from '../Configurations';
import * as semver from 'semver';
import { Utils } from '../Utils';
import * as path from 'path';
import { PackageJson } from 'type-fest';

export class Publish {
  public static get PublishInteractively(): ICommandRegistry {
    return {
      command: 'publish-interactively',
      callback: async (args: any) => {
        // input version or choose release type
        const workspacePackages =
          (await Utils.Workspace.collectWorkspacePackages()) ?? {};

        const workspacePackagesChoices = Object.keys(workspacePackages);

        if (!workspacePackagesChoices.length) {
          Utils.Tips.NoPackageFoundTip();
          return;
        }

        const selectedTargetPackage = await vscode.window.showQuickPick(
          workspacePackagesChoices,
          {
            title: 'Select target package',
          }
        );

        if (!selectedTargetPackage) {
          return;
        }

        const selectedPackagePackageJson = path.posix.resolve(
          workspacePackages[selectedTargetPackage],
          'package.json'
        );

        const packageJsonContent = await vscode.workspace.fs.readFile(
          vscode.Uri.from({
            scheme: 'file',
            path: selectedPackagePackageJson,
          })
        );

        const parsedJsonContent = <PackageJson>(
          JSON.parse(packageJsonContent.toString())
        );

        const { version } = parsedJsonContent;

        if (!version) {
          vscode.window.showErrorMessage(
            `No version field present in package.json of package: ${selectedTargetPackage}`
          );
          return;
        }

        const bumpedVersionOrReleaseType = await vscode.window.showQuickPick(
          [
            'semver:major',
            'semver:minor',
            'semver:patch',
            'semver:prerelease',
            'input',
          ],
          {
            title: 'How to bump version?',
            placeHolder: `Current version: ${version}, select semver version increment or input your own version`,
          }
        );

        if (!bumpedVersionOrReleaseType) {
          return;
        }

        const bumpedVersion =
          bumpedVersionOrReleaseType === 'input'
            ? await vscode.window.showInputBox({
                placeHolder: `Input target version, current: ${version}`,
              })
            : semver.inc(
                version,
                <semver.ReleaseType>(
                  bumpedVersionOrReleaseType.replace('semver:', '')
                )
              );

        if (!bumpedVersion) {
          vscode.window.showInformationMessage(
            `Publish for package ${selectedTargetPackage} canceled.`
          );
          return;
        }

        if (!semver.valid(bumpedVersion)) {
          vscode.window.showInformationMessage(
            `Invalid release version: ${bumpedVersion}`
          );
          return;
        }

        const defaultTag = 'latest';
        const defaultAccess = 'public';

        // tag
        const inputTag = await vscode.window.showInputBox({
          placeHolder: `Input publish tag(default: ${defaultTag})`,
        });

        const tag = inputTag?.length ? inputTag : defaultTag;

        // access
        const access =
          (await vscode.window.showQuickPick(['public', 'restricted'], {
            placeHolder: `Select publish access(default: ${defaultAccess})`,
          })) ?? defaultAccess;

        // git-checks
        const skipGitChecks = await vscode.window.showQuickPick(
          ['true', 'false'],
          {
            placeHolder: `Skip git checks?(default: false)`,
          }
        );

        // confirm?
        const confirm = await Utils.Workspace.createConfirmDialog(
          `This will update version and publish package: '${selectedTargetPackage}@${bumpedVersion}(tag: ${tag})' to npm. Confirm?`
        );

        if (!confirm) {
          vscode.window.showInformationMessage(
            `Publish for package ${selectedTargetPackage} canceled.`
          );
          return;
        }

        const fileUri = vscode.Uri.file(selectedPackagePackageJson);

        parsedJsonContent.version = bumpedVersion;

        await vscode.workspace.fs.writeFile(
          fileUri,
          Buffer.from(JSON.stringify(parsedJsonContent, null, 2))
        );

        const command = `pnpm publish --registry=https://registry.npmjs.org/ --filter='${selectedTargetPackage}' --tag=${tag} --access=${access} ${
          skipGitChecks ? '--no-git-checks' : ''
        } `;

        // todo: git push tag?

        const commandTerminal = vscode.window.createTerminal(
          `Publish for ${selectedTargetPackage}`
        );

        commandTerminal.show(false);
        commandTerminal.sendText(command);
      },
    };
  }

  public static get Sample2(): ICommandRegistry {
    return {
      command: 'sample-command2',
      callback: async (args: any) => {},
    };
  }
}
