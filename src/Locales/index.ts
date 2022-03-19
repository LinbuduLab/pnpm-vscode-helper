import * as vscode from 'vscode';
import { Locale } from '../Utils/typings';
import { ExtensionConfiguration } from '../Configurations';

export class LocaleFactory {
  public static get supportedLocales() {
    return ['en-US', 'zh-CN'];
  }

  public static useEnLocale(locale: Locale) {
    return locale === 'en-US';
  }

  public static ToggleLocaleTip(locale: Locale): string {
    return LocaleFactory.useEnLocale(locale)
      ? 'Locale changed to: en-US'
      : '已切换到：简体中文';
  }
}
