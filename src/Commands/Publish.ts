import * as vscode from 'vscode';
import { ICommandRegistry } from '../Utils/Typings';
import { ExtensionConfiguration } from '../Configurations';
import * as semver from 'semver';
import { Utils } from '../Utils';
import * as path from 'path';
import * as fs from 'fs-extra';
import { PackageJson } from 'type-fest';

export class Publish {
  public static get PublishNodePackage(): ICommandRegistry {
    return {
      command: 'publish-node-package',
      callback: async (args: any) => {
        const insideWorkspace =
          await Utils.Workspace.checkInsidePNPMWorkspace();

        if (insideWorkspace) {
          vscode.window.showInformationMessage(
            'For workspace package publish, use command "publish-workspace-package" instead.'
          );
          return;
        }

        const ws = vscode.workspace.workspaceFolders![0].uri.fsPath;

        const targetPackagePackageJsonPath = path.posix.resolve(
          ws,
          'package.json'
        );

        if (!fs.existsSync(targetPackagePackageJsonPath)) {
          vscode.window.showInformationMessage(
            `package.json not found in ${ws}`
          );
          return;
        }

        const packageJsonContent = await vscode.workspace.fs.readFile(
          vscode.Uri.from({
            scheme: 'file',
            path: targetPackagePackageJsonPath,
          })
        );

        const parsedJsonContent = <PackageJson>(
          JSON.parse(packageJsonContent.toString())
        );

        const { name, version } = parsedJsonContent;

        if (!version) {
          vscode.window.showErrorMessage(
            `No version field present in package.json.`
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
            `Publish for package ${name} canceled.`
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
          `This will update version and publish package: '${name}@${bumpedVersion}(tag: ${tag})' to npm. Confirm?`
        );

        if (!confirm) {
          vscode.window.showInformationMessage(
            `Publish for package ${name} canceled.`
          );
          return;
        }

        const fileUri = vscode.Uri.file(targetPackagePackageJsonPath);

        parsedJsonContent.version = bumpedVersion;

        await vscode.workspace.fs.writeFile(
          fileUri,
          Buffer.from(JSON.stringify(parsedJsonContent, null, 2))
        );

        const command = `pnpm publish --registry=https://registry.npmjs.org/ --tag=${tag} --access=${access} ${
          skipGitChecks ? '--no-git-checks' : ''
        } `;

        // todo: git push tag?

        const commandTerminal = vscode.window.createTerminal(
          `Publish for ${name}`
        );

        commandTerminal.show(false);
        commandTerminal.sendText(command);
      },
    };
  }

  public static get PublishWorkspacePackage(): ICommandRegistry {
    return {
      command: 'publish-workspace-package',
      callback: async (args: any) => {
        const insideWorkspace = await Utils.Workspace.checkInsidePNPMWorkspace(
          true
        );

        if (!insideWorkspace) {
          vscode.window.showInformationMessage(
            'For plain node library publish, use command "publish-node-package" instead.'
          );
          return;
        }
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
