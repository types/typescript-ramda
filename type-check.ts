import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';
import { equal } from 'assert';

const options: ts.CompilerOptions = ts.readConfigFile('tsconfig.json', ts.sys.readFile)
  .config.compilerOptions || {};
const host = ts.createCompilerHost(options, true);

const testDir = 'test';
const checkCallMatch = /^equal\W/;

const tsFiles = fs.readdirSync(testDir)
  .map(fileName => path.join(testDir, fileName));

const program = ts.createProgram(tsFiles, options, host);

const checker = program.getTypeChecker();
const getType = (node: ts.Node) =>
  checker.typeToString(checker.getTypeAtLocation(node));
describe('Check typings', () => {
  tsFiles.forEach(tsFile => {
    it(`${tsFile}`, () => {
      const source = program.getSourceFile(tsFile);
      const traverseNodes = (node: ts.Node) => {
        node.getChildren().forEach(child => {
          const expressionText = child.getText()
          if (expressionText.match(checkCallMatch)) {
            if (child.kind === ts.SyntaxKind.CallExpression) {
              const argsNode = child.getChildren()[2];
              const firstArg = argsNode.getChildren()[0];
              const secondArg = argsNode.getChildren()[2];
              const firstArgType = getType(firstArg);
              const secondArgType = getType(secondArg);
              const pos = source.getLineAndCharacterOfPosition(child.pos);

              equal(firstArgType, secondArgType,
                `${tsFile}:${pos.line}:${pos.character}\n` +  
                `\`${firstArg.getText()}\` type \`${firstArgType}\`` +
                `doesn't match \`${secondArg.getText()}\` type \`${secondArgType}\``
              );
            }
          }
          traverseNodes(child);
        });
      };
      traverseNodes(source);
    });
  });
});
