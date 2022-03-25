import { LocaleConfigurations } from './Locale';
import {
  ShamefullyHoistConfiguration,
  WorkspacePackagesConfiguration,
  ExtraWorkspaceScriptsConfigConfiguration,
} from './Preserved';
import { WorkspacePackageGroupConfiguration } from './WorkspacePackageGroup';
import { CodelenConfiguration } from './Codelen';
import { PrivateExtensionConfigConfiguration } from './Private';

export class ExtensionConfiguration {
  public static locale = new LocaleConfigurations();

  public static codeLen = new CodelenConfiguration();

  public static shamefullyHoist = new ShamefullyHoistConfiguration();

  public static packages = new WorkspacePackagesConfiguration();

  public static privateExtConfig = new PrivateExtensionConfigConfiguration();

  public static extraWorkspaceScript =
    new ExtraWorkspaceScriptsConfigConfiguration();

  public static workspacePackageGroup =
    new WorkspacePackageGroupConfiguration();
}
