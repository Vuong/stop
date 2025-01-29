import * as ts from 'typescript';

let transformer: ts.TransformerFactory<ts.SourceFile> = context => {
  return sourceFile => {
    let visitor = (node: ts.Node): ts.Node => {
      console.log(node.kind, `\t# ts.SyntaxKind.${ts.SyntaxKind[node.kind]}`);
      return ts.visitEachChild(node, visitor, context);
    };

    return ts.visitNode(sourceFile, visitor, ts.isSourceFile);
  };
};

export default transformer;
