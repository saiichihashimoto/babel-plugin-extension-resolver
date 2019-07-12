import { transformAsync } from '@babel/core';
import plugin from '.';

describe('babel-plugin-extension-resolver', () => {
	let files;
	let options;

	beforeEach(() => {
		files = {};
		options = {
			filename:   '/path/to/src/file.js',
			configFile: false,
			babelrc:    false,
			plugins:    [[plugin, {
				resolveOptions: {
					isFile:       jest.fn((filename) => Boolean(files[filename])),
					isDirectory:  jest.fn(() => false),
					readFileSync: jest.fn((filename) => files[filename]),
				},
			}]],
		};
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('name=babel-plugin-extension-resolver', () => expect(plugin({ types: {} }, {}).name).toEqual('babel-plugin-extension-resolver'));

	it('ignores empty code', () => expect(transformAsync('', options)).resolves.toHaveProperty('code', ''));

	it('ignores module imports', () => (
		expect(transformAsync('import path from "path";', options)).resolves.toHaveProperty('code', 'import path from "path";')
	));

	it('finds .node.mjs files', async () => {
		files = {
			'/path/to/src/other.node.mjs': true,
			'/path/to/src/other.mjs':      true,
			'/path/to/src/other.node.js':  true,
			'/path/to/src/other.js':       true,
			'/path/to/src/other.node.ts':  true,
			'/path/to/src/other.ts':       true,
			'/path/to/src/other.node.tsx': true,
			'/path/to/src/other.tsx':      true,
			'/path/to/src/other.json':     true,
			'/path/to/src/other.node.jsx': true,
			'/path/to/src/other.jsx':      true,
			'/path/to/src/other.node':     true,
		};

		await expect(transformAsync('import other from "./other";', options)).resolves.toHaveProperty('code', 'import other from "./other.node.mjs";');
	});

	it('finds .mjs files', async () => {
		files = {
			'/path/to/src/other.mjs':      true,
			'/path/to/src/other.node.js':  true,
			'/path/to/src/other.js':       true,
			'/path/to/src/other.node.ts':  true,
			'/path/to/src/other.ts':       true,
			'/path/to/src/other.node.tsx': true,
			'/path/to/src/other.tsx':      true,
			'/path/to/src/other.json':     true,
			'/path/to/src/other.node.jsx': true,
			'/path/to/src/other.jsx':      true,
			'/path/to/src/other.node':     true,
		};

		await expect(transformAsync('import other from "./other";', options)).resolves.toHaveProperty('code', 'import other from "./other.mjs";');
	});

	it('finds .node.js files', async () => {
		files = {
			'/path/to/src/other.node.js':  true,
			'/path/to/src/other.js':       true,
			'/path/to/src/other.node.ts':  true,
			'/path/to/src/other.ts':       true,
			'/path/to/src/other.node.tsx': true,
			'/path/to/src/other.tsx':      true,
			'/path/to/src/other.json':     true,
			'/path/to/src/other.node.jsx': true,
			'/path/to/src/other.jsx':      true,
			'/path/to/src/other.node':     true,
		};

		await expect(transformAsync('import other from "./other";', options)).resolves.toHaveProperty('code', 'import other from "./other.node.js";');
	});

	it('finds .js files', async () => {
		files = {
			'/path/to/src/other.js':       true,
			'/path/to/src/other.node.ts':  true,
			'/path/to/src/other.ts':       true,
			'/path/to/src/other.node.tsx': true,
			'/path/to/src/other.tsx':      true,
			'/path/to/src/other.json':     true,
			'/path/to/src/other.node.jsx': true,
			'/path/to/src/other.jsx':      true,
			'/path/to/src/other.node':     true,
		};

		await expect(transformAsync('import other from "./other";', options)).resolves.toHaveProperty('code', 'import other from "./other.js";');
	});

	it('finds .node.ts files', async () => {
		files = {
			'/path/to/src/other.node.ts':  true,
			'/path/to/src/other.ts':       true,
			'/path/to/src/other.node.tsx': true,
			'/path/to/src/other.tsx':      true,
			'/path/to/src/other.json':     true,
			'/path/to/src/other.node.jsx': true,
			'/path/to/src/other.jsx':      true,
			'/path/to/src/other.node':     true,
		};

		await expect(transformAsync('import other from "./other";', options)).resolves.toHaveProperty('code', 'import other from "./other.node.ts";');
	});

	it('finds .ts files', async () => {
		files = {
			'/path/to/src/other.ts':       true,
			'/path/to/src/other.node.tsx': true,
			'/path/to/src/other.tsx':      true,
			'/path/to/src/other.json':     true,
			'/path/to/src/other.node.jsx': true,
			'/path/to/src/other.jsx':      true,
			'/path/to/src/other.node':     true,
		};

		await expect(transformAsync('import other from "./other";', options)).resolves.toHaveProperty('code', 'import other from "./other.ts";');
	});

	it('finds .node.tsx files', async () => {
		files = {
			'/path/to/src/other.node.tsx': true,
			'/path/to/src/other.tsx':      true,
			'/path/to/src/other.json':     true,
			'/path/to/src/other.node.jsx': true,
			'/path/to/src/other.jsx':      true,
			'/path/to/src/other.node':     true,
		};

		await expect(transformAsync('import other from "./other";', options)).resolves.toHaveProperty('code', 'import other from "./other.node.tsx";');
	});

	it('finds .tsx files', async () => {
		files = {
			'/path/to/src/other.tsx':      true,
			'/path/to/src/other.json':     true,
			'/path/to/src/other.node.jsx': true,
			'/path/to/src/other.jsx':      true,
			'/path/to/src/other.node':     true,
		};

		await expect(transformAsync('import other from "./other";', options)).resolves.toHaveProperty('code', 'import other from "./other.tsx";');
	});

	it('finds .json files', async () => {
		files = {
			'/path/to/src/other.json':     true,
			'/path/to/src/other.node.jsx': true,
			'/path/to/src/other.jsx':      true,
			'/path/to/src/other.node':     true,
		};

		await expect(transformAsync('import other from "./other";', options)).resolves.toHaveProperty('code', 'import other from "./other.json";');
	});

	it('finds .node.jsx files', async () => {
		files = {
			'/path/to/src/other.node.jsx': true,
			'/path/to/src/other.jsx':      true,
			'/path/to/src/other.node':     true,
		};

		await expect(transformAsync('import other from "./other";', options)).resolves.toHaveProperty('code', 'import other from "./other.node.jsx";');
	});

	it('finds .jsx files', async () => {
		files = {
			'/path/to/src/other.jsx':  true,
			'/path/to/src/other.node': true,
		};

		await expect(transformAsync('import other from "./other";', options)).resolves.toHaveProperty('code', 'import other from "./other.jsx";');
	});

	it('finds .node files', async () => {
		files = {
			'/path/to/src/other.node': true,
		};

		await expect(transformAsync('import other from "./other";', options)).resolves.toHaveProperty('code', 'import other from "./other.node";');
	});

	it('uses extensions override', async () => {
		options.plugins[0][1].extensions = ['.jsx'];
		files = {
			'/path/to/src/other.node.mjs': true,
			'/path/to/src/other.mjs':      true,
			'/path/to/src/other.node.js':  true,
			'/path/to/src/other.js':       true,
			'/path/to/src/other.node.ts':  true,
			'/path/to/src/other.ts':       true,
			'/path/to/src/other.node.tsx': true,
			'/path/to/src/other.tsx':      true,
			'/path/to/src/other.json':     true,
			'/path/to/src/other.node.jsx': true,
			'/path/to/src/other.jsx':      true,
			'/path/to/src/other.node':     true,
		};

		await expect(transformAsync('import other from "./other";', options)).resolves.toHaveProperty('code', 'import other from "./other.jsx";');
	});

	it('finds files in parent directory', async () => {
		files = {
			'/path/to/other.js':     true,
			'/path/to/src/other.js': true,
		};

		await expect(transformAsync('import other from "../other";', options)).resolves.toHaveProperty('code', 'import other from "../other.js";');
	});

	it('finds files in child directory', async () => {
		files = {
			'/path/to/src/child/other.js': true,
			'/path/to/src/other.js':       true,
		};

		await expect(transformAsync('import other from "./child/other";', options)).resolves.toHaveProperty('code', 'import other from "./child/other.js";');
	});

	it('uses index file', async () => {
		files = {
			'/path/to/src/other/index.mjs': true,
		};

		await expect(transformAsync('import other from "./other";', options)).resolves.toHaveProperty('code', 'import other from "./other/index.mjs";');
	});

	it('works with multiple imports', async () => {
		files = {
			'/path/to/src/other.js':   true,
			'/path/to/src/another.js': true,
		};

		await expect(transformAsync('import other from "./other";\nimport another from "./another";', options)).resolves.toHaveProperty('code', 'import other from "./other.js";\nimport another from "./another.js";');
	});

	it('works with require()', async () => {
		files = {
			'/path/to/src/other.node.mjs': true,
			'/path/to/src/other.js':       true,
		};

		await expect(transformAsync('require("./other");', options)).resolves.toHaveProperty('code', 'require("./other.node.mjs");');
	});

	it('ignores dynamic require()', async () => {
		files = {
			'/path/to/src/other.node.mjs': true,
			'/path/to/src/other.js':       true,
		};

		await expect(transformAsync('const other = "./other";\n\nrequire(other);', options)).resolves.toHaveProperty('code', 'const other = "./other";\n\nrequire(other);');
	});

	it('ignores multiple arguments', async () => {
		files = {
			'/path/to/src/other.node.mjs': true,
			'/path/to/src/other.js':       true,
		};

		await expect(transformAsync('require("./other", true);', options)).resolves.toHaveProperty('code', 'require("./other", true);');
	});

	it('ignores other function calls', async () => {
		files = {
			'/path/to/src/other.node.mjs': true,
			'/path/to/src/other.js':       true,
		};

		await expect(transformAsync('requireOOPS("./other");', options)).resolves.toHaveProperty('code', 'requireOOPS("./other");');
	});

	// TODO package.json resolution
	// BODY https://github.com/browserify/resolve/blob/master/test/mock_sync.js#L49

	// TODO dynamic imports
	// BODY https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import

	// TODO export from
	// BODY https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export#Syntax
});
