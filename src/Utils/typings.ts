export type Locale = 'en-US' | 'zh-CN';

export interface ICommandRegistry {
  command: string;
  callback: (...args: any[]) => any;
}

export abstract class IConfiguration<T> {
  public abstract identifier: string;

  public abstract defaultConfig: T;

  public abstract read(): T;

  public abstract write(input: T): void;
}

export type PackageFilterType =
  | 'self'
  | 'withDependencies'
  | 'withDependents'
  | 'dependenciesOnly'
  | 'dependentsOnly';
