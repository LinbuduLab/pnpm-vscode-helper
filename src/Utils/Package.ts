import { PackageFilterType } from './Typings';

export class PackageUtils {
  public static targetFilterTypeFactory(
    targetPackage: string,
    executeType: PackageFilterType
  ) {
    const filterArgs =
      executeType === 'self'
        ? targetPackage
        : executeType === 'withDependencies'
        ? `${targetPackage}...`
        : executeType === 'withDependents'
        ? `...${targetPackage}`
        : executeType === 'dependenciesOnly'
        ? `${targetPackage}^...`
        : executeType === 'dependentsOnly'
        ? `...^${targetPackage}`
        : targetPackage;

    const locationArgs = `--filter=${filterArgs}`;

    return locationArgs;
  }
}
