import * as vscode from 'vscode';
import * as ini from 'ini';
import { BOOL_COMPLETION_ITEMS } from './Shared';

export const NPMRC_COMPLETION_ITEMS = {
  hoist: BOOL_COMPLETION_ITEMS,
  'hoist-pattern': ['[]', "['*']"],
  'public-hoist-pattern': ['[]'],
  'shamefully-hoist': BOOL_COMPLETION_ITEMS,
  'store-dir': [' ~/.pnpm-store'],
  'modules-dir': ['node_modules'],
  'virtual-store-dir': ['node_modules/.pnpm'],
  lockfile: BOOL_COMPLETION_ITEMS,
  'prefer-frozen-lockfile': BOOL_COMPLETION_ITEMS,
  registry: [
    'https://registry.npmjs.org/',
    'https://registry.yarnpkg.com/',
    'https://registry.npmmirror.com/',
  ],
  'auto-install-peers': BOOL_COMPLETION_ITEMS,
  'strict-peer-dependencies': BOOL_COMPLETION_ITEMS,
};

export type NPMRCKeyUnions = keyof typeof NPMRC_COMPLETION_ITEMS;

export const NPMRC_COMPLETION_KEYS = Object.keys(NPMRC_COMPLETION_ITEMS);

export class NPMRCCompletionItemss {
  public static GetCompletionItem(key: NPMRCKeyUnions) {
    return NPMRC_COMPLETION_ITEMS[key] ?? null;
  }
}

export class NPMRCInitialContent {
  public static get content(): string {
    const raw: Partial<Record<NPMRCKeyUnions, any>> = {
      hoist: true,
      // FIXME:
      // 'hoist-pattern': ['*'],
      // 'public-hoist-pattern': [
      //   '*types*',
      //   '*eslint*',
      //   '@prettier/plugin-*',
      //   '*prettier-plugin-*',
      // ],
      'shamefully-hoist': false,
      'store-dir': '~/.pnpm-store',
      'modules-dir': 'node_modules',
      'virtual-store-dir': 'node_modules/.pnpm',
      lockfile: true,
      'prefer-frozen-lockfile': true,
      registry: 'https://registry.npmjs.org/',
      'auto-install-peers': false,
      'strict-peer-dependencies': false,
    };

    return ini.stringify(raw, {
      whitespace: false,
    });
  }
}
