import { Tree, stringInput, TreeCursor } from "lezer-tree";
import { parser } from "../dist/index.es.js";
import { expect } from "chai";

function parse(d, fragments) {
  let parse = parser.startParse(stringInput(d), 0, { fragments }),
    result;
  while (!(result = parse.advance())) {}
  return result;
}

export function testNodes(doc1) {
  var cursor = parse(doc1);
  var errorNodeCount = 0;

  if (!(cursor instanceof TreeCursor))
  cursor = cursor instanceof Tree ? cursor.cursor() : cursor.cursor;
  
  for (;;) {
    if (cursor.type.isError == true) errorNodeCount += 1;
    const isLeaf = !cursor.firstChild();
    if (!isLeaf) continue;

    for (;;) {
      if (cursor.nextSibling()) break;
      if (!cursor.parent()) return errorNodeCount;
    }
  }
}

describe("Error Node Test", function () {
  it("Should return zero if the query is valid", function () {
    expect(testNodes("select * from val;")).to.equal(0);
  });
});
