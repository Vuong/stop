import * as ts from 'typescript';

let transformer: ts.TransformerFactory<ts.SourceFile> = context => {
  return sourceFile => {
    let jsxPragma = (sourceFile as any).pragmas.get('jsx');
    if (jsxPragma) {
      console.log(`a jsx pragma was found using the factory "${jsxPragma.arguments.factory}"`);
    }

    return sourceFile;
  };
};

export default transformer;
