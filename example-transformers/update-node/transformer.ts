import * as ts from 'typescript';

let transformer: ts.TransformerFactory<ts.SourceFile> = context => {
  return sourceFile => {
    let visitor = (node: ts.Node): ts.Node => {
      if (ts.isVariableDeclaration(node)) {
        return ts.factory.updateVariableDeclaration(
          node,
          node.name,
          undefined /* exclamation token */,
          node.type,
          ts.factory.createStringLiteral('updated-world')
        );
      }

      return ts.visitEachChild(node, visitor, context);
    };

    return ts.visitNode(sourceFile, visitor, ts.isSourceFile);
  };
};

export default transformer;
