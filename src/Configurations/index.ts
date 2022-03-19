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
        .getConfiguration(Constants.ExtensionPrefix)
        .get<boolean>(this.identifier) ?? this.defaultConfig
    );
  }

  public write(input: boolean): void {
    vscode.workspace
      .getConfiguration(Constants.ExtensionPrefix)
      .update(this.identifier, input, true);
  }
}

class LocaleConfigurations implements IConfiguration<string> {
  public identifier = 'locale';

  public defaultConfig = 'en-US';

  public read() {
    return (
      vscode.workspace
        .getConfiguration(Constants.ExtensionPrefix)
        .get<string>(this.identifier) ?? this.defaultConfig
    );
  }

  public write(input: string): void {
    vscode.workspace
      .getConfiguration(Constants.ExtensionPrefix)
      .update(this.identifier, input, true);
  }
}

export class ExtensionConfiguration {
  public static localeConfig = new LocaleConfigurations();

  public static codeLenConfig = new CodeLenConfiguration();
}
