import * as vscode from 'vscode';

export class PackageJsonHoverTips {
  public static get supportedConfigRootFields() {
    return ['pnpm', 'publishConfig'];
  }

  public static get supportedConfigFields() {
    return [
      'overrides',
      'packageExtensions',
      'neverBuiltDependencies',
      'onlyBuiltDependencies',
    ];
  }

  public static ConfigFieldHoverTip() {
    return {
      overrides: `* This field allows you to instruct pnpm to override any dependency in the dependency graph. This is useful to enforce all your packages to use a single version of a dependency, backport a fix, or replace a dependency with a fork. \n * Note that the overrides field can only be set at the root of the project. \n * Refer to [overrides](https://pnpm.io/package_json#pnpmoverrides).`,
      packageExtensions: `* The packageExtensions fields offer a way to extend the existing package definitions with additional information. \n * Refer to [packageExtensions](https://pnpm.io/package_json#pnpmpackageextensions).`,
      neverBuiltDependencies: `* This field allows to ignore the builds of specific dependencies. The "preinstall", "install", and "postinstall" scripts of the listed packages will not be executed during installation. \n * Refer to [neverBuiltDependencies](https://pnpm.io/package_json#pnpmneverbuiltdependencies).`,
      onlyBuiltDependencies: `* A list of package names that are allowed to be executed during installation. If this field exists, only the listed packages will be able to run install scripts. \n * Refer to [onlyBuiltDependencies](https://pnpm.io/package_json#pnpmonlybuiltdependencies).`,
      publishConfig: `* Override some fields in the manifest before the package is packed. \n * Refer to [publishConfig](https://pnpm.io/package_json#publishconfig).`,
      pnpm: `* A set of configuration options for pnpm. \n * Refer to [package.json](https://pnpm.io/package_json).`,
    };
  }
}
