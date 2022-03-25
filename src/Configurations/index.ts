import { LocaleConfigurations } from './Locale';
import {
  ShamefullyHoistConfiguration,
  WorkspacePackagesConfiguration,
} from './Preserved';
import { WorkspacePackageGroupConfiguration } from './WorkspacePackageGroup';
import { CodelenConfiguration } from './Codelen';
import { PrivateExtensionConfigConfiguration } from './Private';
import { ExtraWorkspaceScriptsConfigConfiguration } from './ExtraWorkspaceScripts';

export class ExtensionConfiguration {
  public static locale = new LocaleConfigurations();

  public static codeLen = new CodelenConfiguration();

  public static __shamefullyHoist = new ShamefullyHoistConfiguration();

  /**
   * @deprecated
   */
  public static __packages = new WorkspacePackagesConfiguration();

  public static privateExtConfig = new PrivateExtensionConfigConfiguration();

  public static extraWorkspaceScript =
    new ExtraWorkspaceScriptsConfigConfiguration();

  public static workspacePackageGroup =
    new WorkspacePackageGroupConfiguration();
}
