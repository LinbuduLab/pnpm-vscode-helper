import * as vscode from 'vscode';
import * as ini from 'ini';

export class NPMRCHoverTips {
  public static ComposeFieldURL(key: string) {
    return `https://pnpm.io/npmrc#${key}`;
  }
}

const BOOL_COMPLETION_ITEMS = ['true', 'false'];

export const NPMRC_COMPLETION_ITEMS: Record<string, any[]> = {
  hoist: BOOL_COMPLETION_ITEMS,
  'hoist-pattern': ['[]', "['*']"],
  'public-hoist-pattern': ['[]'],
  'shamefully-hoist': BOOL_COMPLETION_ITEMS,
  registry: [
    'https://registry.npmjs.org/',
    'https://registry.yarnpkg.com',
    'https://registry.npmmirror.com',
  ],
  'auto-install-peers': BOOL_COMPLETION_ITEMS,
  'strict-peer-dependencies': BOOL_COMPLETION_ITEMS,
};

export const NPMRC_COMPLETION_KEYS = Object.keys(NPMRC_COMPLETION_ITEMS);

export class NPMRCCompletionItemss {
  public static GetCompletionItem(key: string) {
    return NPMRC_COMPLETION_ITEMS[key] ?? null;
  }
}
