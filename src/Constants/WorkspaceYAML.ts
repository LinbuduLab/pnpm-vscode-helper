import * as vscode from 'vscode';

export class WorkspaceYAMLHoverTips {
  public static PackagesFieldTip() {
    const packageFieldURL = 'https://pnpm.io/pnpm-workspace_yaml';

    return new vscode.Hover(
      `* \`packages\` field defines the root of the workspace and enables you to include / exclude directories from the workspace.\n * Refer to [pnpm-workspace.yaml](${packageFieldURL}) for more details.,
      `
    );
  }

  public static ComposeOtherYamlFieldURL(key: string) {
    return `https://pnpm.io/workspaces#${key}`;
  }

  public static OtherYamlFieldHoverTip() {
    return {
      'link-workspace-packages': `* If this is enabled, locally available packages are linked to \`node_modules\` instead of being downloaded from the registry. \n * This is very convenient in a monorepo. If you need local packages to also be linked to subdependencies, you can use the \`deep\` setting (since v5). \n * Else, packages are downloaded and installed from the registry. However, workspace packages can still be linked by using the \`workspace:\` range protocol. \n * Refer to [link-workspace-packages](https://pnpm.io/workspaces#link-workspace-packages) for more details. \n * default: \`false\``,
      'prefer-workspace-packages': `* If this is enabled, local packages from the workspace are preferred over packages from the registry, even if there is a newer version of the package in the registry. \n * This setting is only useful if the workspace doesn't use \`save-workspace-protocol\`. \n * Refer to [prefer-workspace-packages](https://pnpm.io/workspaces#prefer-workspace-packages) for more details. \n * default: \`false\``,
      'shared-workspace-lockfile': `* If this is enabled, pnpm creates a single \`pnpm-lock.yaml\` file in the root of the workspace.\n * This also means that all dependencies of workspace packages will be in a single \`node_modules\` (and get symlinked to their package \`node_modules\` folder for Node's module resolution). \n * Refer to [shared-workspace-lockfile](https://pnpm.io/workspaces#shared-workspace-lockfile) for more details. \n * default: \`true\``,
      'save-workspace-protocol': `* If this is enabled, new dependencies will be added with the workspace protocol IF (and only if) they are present in the workspace.\n * You might want to change this setting to \`false\` if the tooling in your repository does not understand the workspace protocol (and ideally submit a PR to your tooling to get it added in the future). \n * Refer to [save-workspace-protocol](https://pnpm.io/workspaces#save-workspace-protocol) for more details. \n * default: \`true\``,
    };
  }
}
