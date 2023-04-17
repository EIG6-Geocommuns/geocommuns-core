import { execSync } from "child_process";
import { join as pathJoin, relative as pathRelative } from "path";
import { exclude } from "tsafe/exclude";
import * as fs from "fs";

const rootDirPath = pathJoin(__dirname, "..", "..");

fs.writeFileSync(
  pathJoin(rootDirPath, "dist", "package.json"),
  Buffer.from(
    JSON.stringify(
      (() => {
        const packageJsonParsed = JSON.parse(
          fs.readFileSync(pathJoin(rootDirPath, "package.json")).toString("utf8"),
        );

        return {
          ...packageJsonParsed,
          "main": packageJsonParsed["main"].replace(/^dist\//, ""),
          "types": packageJsonParsed["types"].replace(/^dist\//, ""),
        };
      })(),
      null,
      2,
    ),
    "utf8",
  ),
);

const commonThirdPartyDeps = (() => {
  const namespaceModuleNames = ["@emotion"];
  const standaloneModuleNames = [
    "react",
    "@types/react",
    "@codegouvfr/react-dsfr",
    "tss-react",
    "react-router-dom",
    "ol",
    "@mui/material",
  ];

  return [
    ...namespaceModuleNames
      .map(namespaceModuleName =>
        fs
          .readdirSync(pathJoin(rootDirPath, "node_modules", namespaceModuleName))
          .map(submoduleName => `${namespaceModuleName}/${submoduleName}`),
      )
      .reduce((prev, curr) => [...prev, ...curr], []),
    ...standaloneModuleNames,
  ];
})();

const yarnHomeDirPath = pathJoin(rootDirPath, ".yarn_home");

fs.rmSync(yarnHomeDirPath, { "recursive": true, "force": true });
fs.mkdirSync(yarnHomeDirPath);

const execYarnLink = (params: { targetModuleName?: string; cwd: string }) => {
  const { targetModuleName, cwd } = params;

  const cmd = ["yarn", "link", ...(targetModuleName !== undefined ? [targetModuleName] : [])].join(" ");

  console.log(`$ cd ${pathRelative(rootDirPath, cwd) || "."} && ${cmd}`);

  execSync(cmd, {
    cwd,
    "env": {
      ...process.env,
      "HOME": yarnHomeDirPath,
    },
  });
};

const testAppPaths = (() => {
  const [, , ...testAppNames] = process.argv;

  return testAppNames
    .map(testAppName => {
      const testAppPath = pathJoin(rootDirPath, "..", testAppName);

      if (fs.existsSync(testAppPath)) {
        return testAppPath;
      }

      console.warn(`Skipping ${testAppName} since it cant be found here: ${testAppPath}`);

      return undefined;
    })
    .filter(exclude(undefined));
})();

if (testAppPaths.length === 0) {
  console.error("No test app to link into!");
  process.exit(-1);
}

testAppPaths.forEach(testAppPath => execSync("yarn install", { "cwd": testAppPath }));

console.log("=== Linking common dependencies ===");

const total = commonThirdPartyDeps.length;
let current = 0;

commonThirdPartyDeps.forEach(commonThirdPartyDep => {
  current++;

  console.log(`${current}/${total} ${commonThirdPartyDep}`);

  const localInstallPath = pathJoin(
    ...[
      rootDirPath,
      "node_modules",
      ...(commonThirdPartyDep.startsWith("@") ? commonThirdPartyDep.split("/") : [commonThirdPartyDep]),
    ],
  );

  execYarnLink({ "cwd": localInstallPath });
});

commonThirdPartyDeps.forEach(commonThirdPartyDep =>
  testAppPaths.forEach(testAppPath =>
    execYarnLink({
      "cwd": testAppPath,
      "targetModuleName": commonThirdPartyDep,
    }),
  ),
);

console.log("=== Linking in house dependencies ===");

execYarnLink({ "cwd": pathJoin(rootDirPath, "dist") });

testAppPaths.forEach(testAppPath =>
  execYarnLink({
    "cwd": testAppPath,
    "targetModuleName": JSON.parse(
      fs.readFileSync(pathJoin(rootDirPath, "package.json")).toString("utf8"),
    )["name"],
  }),
);

export {};
