import * as ts from 'typescript';

let transformerProgram = () => {
  let transformerFactory: ts.TransformerFactory<ts.SourceFile> = context => {
    return sourceFile => {
      let visitor = (node: ts.Node): ts.Node => {
        if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
          // Find the import location in the file system using require.resolve
          let pkgEntry = require.resolve(`${node.moduleSpecifier.text}`);

          // Create another program
          let innerProgram = ts.createProgram([pkgEntry], {
            // Important to set this to true!
            allowJs: true,
          });

          console.log(innerProgram.getSourceFile(pkgEntry)?.getText());

          return node;
        }

        return ts.visitEachChild(node, visitor, context);
      };

      return ts.visitNode(sourceFile, visitor, ts.isSourceFile);
    };
  };

  return transformerFactory;
};

export default transformerProgram;
