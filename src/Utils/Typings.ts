export type Locale = 'en-US' | 'zh-CN';

export interface ICommandRegistry {
  command: string;
  callback: (...args: any[]) => any;
}
