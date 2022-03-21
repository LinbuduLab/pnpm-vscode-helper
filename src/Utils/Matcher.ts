export class Matcher {
  public static composeDepsFieldMatcher(word: string) {
    return new RegExp(
      `"(dependencies|devDependencies)":\\s*?\\{[\\s\\S]*?${word.replace(
        /\//g,
        '\\/'
      )}[\\s\\S]*?\\}`,
      'gm'
    );
  }

  public static composePNPMConfigFieldMatcher(word: string) {
    return new RegExp(
      `"pnpm":\\s*?\\{[\\s\\S]*?${word.replace(/\//g, '\\/')}[\\s\\S]*?\\}`,
      'gm'
    );
  }
}
