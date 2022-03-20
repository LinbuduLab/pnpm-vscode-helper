export class Constants {
  public static get ExtensionPrefix() {
    return 'pnpm-vscode-helper';
  }

  public static get ExtensionIdentifier() {
    return 'pnpm-vscode-helper';
  }

  public static get PackageJsonMatcher() {
    return new RegExp(/\/package\.json$/);
  }
}
