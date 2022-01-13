import { parser } from "../dist/index.es.js";
import { fileTests } from "lezer-generator/dist/test";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
let caseDir = path.dirname(fileURLToPath(import.meta.url));

const argsAll = process.argv.slice(2);
var envArg = argsAll.slice(-1).pop();

const substr = "--env=";

if (envArg.includes(substr)) {
  var fname = envArg.split("--env=")[1];
}
var file = fname + ".txt";

try {
  fs.readFileSync(path.join(caseDir, file));
} catch (err) {
  throw Error("Test file not found!");
}
var name = /^[^\.]*/.exec(file)[0];
describe(name, () => {
  for (let { name, run } of fileTests(
    fs.readFileSync(path.join(caseDir, file), "utf8"),
    file
  )) {
    it(name, () => run(parser));
  }
});
