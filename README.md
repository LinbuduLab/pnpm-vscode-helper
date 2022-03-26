<p align="center">
  <img src="https://raw.githubusercontent.com/LinbuduLab/pnpm-vscode-helper/main/assets/pnpm-logo.png?raw=true" alt="pnpm-icon" width="150">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <img src="https://raw.githubusercontent.com/LinbuduLab/pnpm-vscode-helper/main/assets/vscode-logo-forked.png?raw=true" alt="vscode-icon" width="150">
  <br>
</p>
<h1 align="center"> pnpm-vscode-helper </h1>
<p  align="center"><b>VS Code Extension for better DX with pnpm.</b></p>

## Quick Start

- Type `Ctrl(Command) + Shift + P` to open workbench commands input.
- Type `ext install`
- Search `pnpm-vscode-helper`

Also, you can use `Ctrl(Command) + Shift + X` to open VS Code Extension Tab, and search for `pnpm-vscode-helper`.

## Features

- pnpm configuration hover & completions.
- pnpm workspace configuration hover & completions.
- select from your workspace packages and run scripts with easy filtering.
- upgrade or remove your workspace root / workspace packages dependencies.
- publish your plain node package(as multirepo) oand workspace packages(as monorepo) with interactive prompt.
- navigate to a workspace package from its dependent by `workspace:` protocol.

## Commands

### Confiure

Configure extension features.

See [Configure](##Configurations) for more details.

### Create

Create `.npmrc` / `pnpm-workspace.yaml` file in current project root, with pnpm specified configuration and default value.

- `pnpm-vscode-helper.create-npm-rc-config`
- `pnpm-vscode-helper.create-pnpm-workspace-config`

### Install

- `pnpm-vscode-helper.install-workspace-root-deps` 

  Install workspace root dependencies only(as pnpm doesnot support this, we collect dependencies from workspace root and install them).

- `pnpm-vscode-helper.install-selected-packages-deps`

  Select a set of packages, and install dependencies for them.

### Package

- `pnpm-vscode-helper.select-workspace-package`

  Select a workspace package, and then select script to execute and filtering type.

  - script selection items come from selected package's `package.json` file and workspace-only extra scripts(see `Workspace.ExtraWorkspaceScripts`).
  - filtering types come from the filtering syntax supported by pnpm now:
    - self
    - withDependencies
    - withDependents
    - dependenciesOnly
    - dependentsOnly

### Publish

- `pnpm-vscode-helper.publish-node-package`

  This command will ask you for the release type(`major`, `minor`, ...), and some publish related opitions( `git-checks` , `tag`, ...) , and update the bumped version in `package.json` 's `version` field, then run `pnpm publish` with arguments composed from prompt result.

  - you can choose release type which follows `semver` type, or input new version manually.
  - we ask `tag`, `access`, `git-checks`, for final command arguments.

- `pnpm-vscode-helper.publish-workspace-package`

  Similar to the `publish-node-package` command, but this command requires you to select a workspace package to release.

### Remove Deps

- `pnpm-vscode-helper.remove-workspace-root-deps`

  This command collects all deps included in root `packages.json`, and display quick pick prompt for you to select from.

  Selected dependencies will be removed by `pnpm remove` command.

  This command is also avaliable in non-workspace project.

- `pnpm-vscode-helper.remove-workspace-package-deps`

  Similar to `remove-workspace-root-deps`, but this command requires you to select a workspace package first.

### Upgrade

- `pnpm-vscode-helper.built-in-upgrade`

  This command will update dependencies of your selected package by `pnpm update` command, related options will also be prompted for arguments composing.

  - Options including:
    - recursive
    - latest
    - workspace
    - dev
    - prod
    - interactive

### Workspace

- `pnpm-vscode-helper.create-extra-workspace-scripts`

- `pnpm-vscode-helper.remove-extra-workspace-scripts`

  This extra scripts command helps you to create pre-configured npm scripts, which will used by `select-workspace-package` command.

  This can be useful when you want to run some scripts which only exist in dependencies or dependents of selected package.

## Providers

- In `.npmrc`, this extension provides completion for both key and value(only pnpm specified configurations are included).
- In `pnpm-workspace.yaml`, this extension provides key completions and hovers.
- In `package.json`, the dependency item with `workspace:` protocol will have `Click to open workspace package folder` codelen, you can click it to open target package.

## Configurations

- `pnpm-vscode-helper.toggle-codelen-status`

  Toggle codelen status.

## License

[MIT](LICENSE)



- pnpm-vscode-helper.
- pnpm-vscode-helper.
