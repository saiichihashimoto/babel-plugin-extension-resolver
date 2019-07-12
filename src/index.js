import path from 'path';
import resolve from 'resolve';
import { name } from '../package';

const DEFAULT_EXTENSIONS = [
	'.node.mjs',
	'.mjs',
	'.node.js',
	'.js',
	'.node.ts',
	'.ts',
	'.node.tsx',
	'.tsx',
	'.json',
	'.node.jsx',
	'.jsx',
	'.node',
];

export default function extensionResolver(
	{ types },
	{ extensions = DEFAULT_EXTENSIONS, resolveOptions = {} },
) {
	return {
		name,
		visitor: {
			Program: {
				enter(programPath, state) {
					const { file: { opts: { filename } } } = state;

					function replaceSource(source) {
						if (!types.isStringLiteral(source)) {
							return;
						}

						const sourcePath = source.node.value;
						if (sourcePath[0] !== '.') {
							return;
						}

						const basedir = path.dirname(filename);

						const resolvedPath = path.relative(
							basedir,
							resolve.sync(sourcePath, { ...resolveOptions, basedir, extensions }),
						);

						source.replaceWith(types.stringLiteral((resolvedPath[0] === '.') ? resolvedPath : `./${resolvedPath}`));
					}

					programPath.traverse({
						CallExpression: (declaration) => {
							const callee = declaration.get('callee');
							if (!types.isIdentifier(callee) || callee.node.name !== 'require') {
								return;
							}
							const args = declaration.get('arguments');
							if (args.length !== 1) {
								return;
							}
							replaceSource(args[0]);
						},
						ImportDeclaration: (declaration) => {
							replaceSource(declaration.get('source'));
						},
					}, state);
				},
			},
		},
	};
}
