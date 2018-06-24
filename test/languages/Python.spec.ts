import * as fs from "fs";
import * as path from "path";

import { newUnibeautify, Beautifier } from "unibeautify";
import beautifier from "../../src";
import { raw } from "../utils";

jest.setTimeout(10000);
describe("should successfully beautify Python files", () => {
  // tslint:disable:mocha-no-side-effect-code
  testFile("test.py");
});

function testFile(fixtureFileName: string) {
  test(`should successfully beautify file ${fixtureFileName}`, () => {
    const text: string = fs
      .readFileSync(path.resolve(__dirname, `../fixtures/${fixtureFileName}`))
      .toString();
    const unibeautify = newUnibeautify();
    unibeautify.loadBeautifier(beautifier);
    return unibeautify
      .beautify({
        languageName: "Python",
        options: {
          Python: {
            wrap_line_length: 80,
          },
        },
        text,
      })
      .then(results => {
        expect(raw(results)).toMatchSnapshot();
      });
  });
}
