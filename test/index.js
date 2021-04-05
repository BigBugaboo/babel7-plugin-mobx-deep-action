import path from 'path';
import fs from 'fs';
import assert from 'assert';
import { transformFileSync } from '@babel/core';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';

function trim(str) {
  return str.replace(/^\s+|\s+$/, '');
}

describe('测试用例目录', () => {
  const fixturesDir = path.join(path.resolve(), 'test', 'fixtures');
    before(() => {
      console.log(`---开始读取测试用例文件夹 - ${fixturesDir}`)
    })
    after(() => {
      console.log(`---结束读取测试用例文件夹 - ${fixturesDir}`)
    })
  fs.readdirSync(fixturesDir).map((caseName) => {
    const fixtureDir = path.join(fixturesDir, caseName);
    const actualPath = path.join(fixtureDir, 'actual.js');

    beforeEach(function(){
      console.log(`-----测试用例 - ${fixtureDir}`);
    })

    it(`should ${caseName.split('-').join(' ')}`, () => {
      const actual = transformFileSync(actualPath).code;
      const expected = fs.readFileSync(
          path.join(fixtureDir, 'expected.js')
      ).toString();
      assert.equal(trim(actual), trim(expected));
    })
  });
});
