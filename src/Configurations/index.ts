import * as vscode from 'vscode';
import { ICommandRegistry, Constants } from '../utils';

abstract class IConfiguration<T> {
  public abstract identifier: string;

  public abstract defaultConfig: T;

  public abstract read(): T;

  public abstract write(input: T): void;
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

export type Locale = 'en-US' | 'zh-CN';

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

export class ExtensionConfiguration {
  public static locale = new LocaleConfigurations();

  public static codeLen = new CodeLenConfiguration();

  public static workspace = new WorkspaceFeatureConfiguration();
}
