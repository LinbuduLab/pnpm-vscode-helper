import * as vscode from 'vscode';
import { Locale } from '../Utils/typings';
import { Constants } from '../Utils';

abstract class IConfiguration<T> {
  public abstract identifier: string;

  public abstract defaultConfig: T;

  public abstract read(): T;

  public abstract write(input: T): void;
}

interface IPrivateConfig {
  username?: string;
  email?: string;
}

class PrivateExtensionConfigConfiguration
  implements IConfiguration<IPrivateConfig>
{
  public identifier = 'privateExtConfig';

  public defaultConfig = {};

  public read(): IPrivateConfig {
    return (
      vscode.workspace
        .getConfiguration(Constants.ExtensionIdentifier)
        .get<IPrivateConfig>(this.identifier) ?? this.defaultConfig
    );
  }

  public write(input: Required<IPrivateConfig>): void {
    vscode.workspace
      .getConfiguration(Constants.ExtensionIdentifier)
      .update(this.identifier, input, true);
  }
}

class CodeLenConfiguration implements IConfiguration<boolean> {
  public identifier = 'enableCodeLens';

  public defaultConfig = false;

  public read() {
    return (
      vscode.workspace
        .getConfiguration(Constants.ExtensionIdentifier)
        .get<boolean>(this.identifier) ?? this.defaultConfig
    );
  }

  public write(input: boolean): void {
    vscode.workspace
      .getConfiguration(Constants.ExtensionIdentifier)
      .update(this.identifier, input, true);
  }
}

class LocaleConfigurations implements IConfiguration<Locale> {
  public identifier = 'locale';

  public defaultConfig: Locale = 'en-US';

  public read() {
    return (
      vscode.workspace
        .getConfiguration(Constants.ExtensionIdentifier)
        .get<Locale>(this.identifier) ?? this.defaultConfig
    );
  }

  public write(input: Locale): void {
    vscode.workspace
      .getConfiguration(Constants.ExtensionIdentifier)
      .update(this.identifier, input, true);
  }
}

export type SharedBooleanConfigChoices = ['enable', 'disable'];

class WorkspaceFeatureConfiguration implements IConfiguration<boolean> {
  public identifier = 'workspace';

  public defaultConfig = true;

  public read() {
    return (
      vscode.workspace
        .getConfiguration(Constants.ExtensionIdentifier)
        .get<boolean>(this.identifier) ?? this.defaultConfig
    );
  }

  public write(input: boolean): void {
    vscode.workspace
      .getConfiguration(Constants.ExtensionIdentifier)
      .update(this.identifier, input, true);
  }
}

class ShamefullyHoistConfiguration implements IConfiguration<boolean> {
  public identifier = 'shamefullyHoist';

  public defaultConfig = false;

  public read() {
    return (
      vscode.workspace
        .getConfiguration(Constants.ExtensionIdentifier)
        .get<boolean>(this.identifier) ?? this.defaultConfig
    );
  }

  public write(input: boolean): void {
    vscode.workspace
      .getConfiguration(Constants.ExtensionIdentifier)
      .update(this.identifier, input, vscode.ConfigurationTarget.Workspace);
  }
}

class WorkspacePackagesConfiguration
  implements IConfiguration<Record<string, string>>
{
  public identifier = 'workspacePackages';

  public defaultConfig = {};

  public read() {
    return (
      vscode.workspace
        .getConfiguration(Constants.ExtensionIdentifier)
        .get<Record<string, string>>(this.identifier) ?? this.defaultConfig
    );
  }

  public write(input: Record<string, string>): void {
    vscode.workspace
      .getConfiguration(Constants.ExtensionIdentifier)
      .update(this.identifier, input, vscode.ConfigurationTarget.Workspace);
  }
}

export class ExtensionConfiguration {
  public static locale = new LocaleConfigurations();

  public static codeLen = new CodeLenConfiguration();

  public static workspace = new WorkspaceFeatureConfiguration();

  public static shamefullyHoist = new ShamefullyHoistConfiguration();

  public static packages = new WorkspacePackagesConfiguration();

  public static privateExtConfig = new PrivateExtensionConfigConfiguration();
}
