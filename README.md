# VSCode Extension Monorepo

Develop VS Code extension in pnpm workspace.

> **In fact, I'm just getting started with VS Code Extension, and this template is really just for exploring the various APIs of the extension separately, so if you want to develop fully functional extensions, this template is probably far from adequate, but PR is welcome!**

## Get Started

To use this template, you will need to:

- Update [create-package script](scripts/create-package.ts) content, including `BASE_GITHUB_URL`, `PUBLISHER`, or any propertits you want to customize.

  ```typescript
  const BASE_GITHUB_URL =
    "https://github.com/LinbuduLab/vscode-extension-monorepo";

  const PUBLISHER = "linbudu599";
  ```

- Update [LICENSE](LICENSE) content, as in `create-package` execution we copy license file in root to specific package dir, so that we can publish extension by `vsix`,
- Update [launch.json](.vscode/launch.json) content, configuration program should be speficified according to your actual package dir.

  ```json
  {
    "version": "0.2.0",
    "configurations": [
      {
        "name": "Launch Extension: Sample",
        "type": "extensionHost",
        "request": "launch",
        "program": "${workspaceFolder}\\packages\\sample\\src\\index.js",
        "args": [
          "--extensionDevelopmentPath=${workspaceFolder}/packages/sample"
        ],
        "outFiles": ["${workspaceFolder}/packages/sample/**/*.js"]
      },
      {
        "name": "Run Extension Tests",
        "type": "extensionHost",
        "request": "launch",
        "runtimeExecutable": "${execPath}",
        "args": [
          "--extensionDevelopmentPath=${workspaceFolder}/packages/sample",
          "--extensionTestsPath=${workspaceFolder}/packages/sample/test/suite/index"
        ],
        "outFiles": ["${workspaceFolder}/out/test/**/*.js"]
      }
    ]
  }
  ```

- Run command below to build/package/publish your extension.

  ```bash
  pnpm run watch --filter 'sample'
  pnpm run pkg --filter 'sample'
  pnpm run pub --filter 'sample'
  ```

## Release workflow

```bash
pnpm add @changesets/cli -DW
pnpm changeset init
pnpm changeset
pnpm changeset version
pnpm install
git add . && git commit -m 'feat: bump!'
pnpm publish -r
```
