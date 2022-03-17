import fs from "fs-extra";
import path from "path";
import consola from "consola";
import chalk from "chalk";
import minimist from "minimist";
import prompts from "prompts";
import jsonfile from "jsonfile";
import prettier from "prettier";

const PACKAGE_DIR = "packages";

const getInitialContent = (pkg: string) => `
console.log('pkg');
`;

const BASE_GITHUB_URL =
  "https://github.com/LinbuduLab/vscode-extension-monorepo";

const PUBLISHER = "linbudu599";

const getPackageJsonContent = (pkg: string) => ({
  name: pkg,
  version: "0.0.1",
  description: "",
  license: "MIT",
  scripts: {
    build: "tsc",
    watch: "tsc --watch",
    check: "tsc --noEmit",
    pkg: "vsce package",
    pub: "vsce publish",
    "pub:patch": "vsce publish patch",
    "pub:minor": "vsce publish minor",
    "pub:major": "vsce publish patch",
  },
  repository: {
    type: "git",
    url: `git+${BASE_GITHUB_URL}`,
  },
  bugs: {
    url: `${BASE_GITHUB_URL}/issues`,
  },
  homepage: `${BASE_GITHUB_URL}#readme`,
  main: "./dist/index.js",
  authort: PUBLISHER,
  publisher: PUBLISHER,
  engines: {
    vscode: "^1.27.0",
  },
  categories: ["Other"],
  activationEvents: [],
  contributes: {
    commands: [],
    keybindings: [],
    menus: {
      "editor/title": [],
      "editor/title/context": [],
      "editor/context": [],
      "explorer/context": [],
    },
    snippets: [],
    viewsContainers: [],
    views: [],
    iconThemes: [],
  },
});

const getTSConfigContent = (pkg: string) => ({
  extends: "../../tsconfig.base.json",
  compilerOptions: {
    outDir: "dist",
  },
  include: ["src/**/*"],
});

(async () => {
  const arg = minimist(process.argv.slice(2));

  const pkgName = arg["_"][0];

  consola.info(`Creating ${pkgName}`);

  if (!pkgName) {
    throw new Error();
  }

  const packageDir = path.resolve(PACKAGE_DIR, pkgName);
  const initialFile = path.join(packageDir, "src", "index.ts");
  const packageFile = path.join(packageDir, "package.json");
  const tsconfigFile = path.join(packageDir, "tsconfig.json");
  const licenseFile = path.join(packageDir, "LICENSE");
  const projectLicenseFile = path.join(process.cwd(), "LICENSE");

  fs.ensureDirSync(packageDir);
  fs.ensureFileSync(initialFile);
  fs.ensureFileSync(licenseFile);

  fs.writeFileSync(initialFile, getInitialContent(pkgName));
  fs.writeFileSync(
    packageFile,
    JSON.stringify(getPackageJsonContent(pkgName), null, 2)
  );
  fs.writeFileSync(
    tsconfigFile,
    JSON.stringify(getTSConfigContent(pkgName), null, 2)
  );
  fs.writeFileSync(licenseFile, fs.readFileSync(projectLicenseFile, "utf-8"));

  consola.success(`Create ${pkgName}`);
})();
