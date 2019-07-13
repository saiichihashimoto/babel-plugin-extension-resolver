[![current version](https://img.shields.io/npm/v/babel-plugin-extension-resolver.svg)](https://www.npmjs.com/package/babel-plugin-extension-resolver)
[![Build Status](https://travis-ci.org/saiichihashimoto/babel-plugin-extension-resolver.svg?branch=master)](https://travis-ci.org/saiichihashimoto/babel-plugin-extension-resolver)
[![Coverage Status](https://coveralls.io/repos/github/saiichihashimoto/babel-plugin-extension-resolver/badge.svg?branch=master)](https://coveralls.io/github/saiichihashimoto/babel-plugin-extension-resolver?branch=master)
[![Mutation testing badge](https://badge.stryker-mutator.io/github.com/saiichihashimoto/babel-plugin-extension-resolver/master)](https://stryker-mutator.github.io)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Greenkeeper badge](https://badges.greenkeeper.io/saiichihashimoto/babel-plugin-extension-resolver.svg)](https://greenkeeper.io/)

Resolve imports to more file extensions with a babel plugin

# Example

With this file structure:

```
src/index.js
src/other.node.js
src/other.js
src/another.js
```

**In:**

```javascript
// src/index.js
import other from './other';
import another from './another';
```
**Out:**

```javascript
// lib/index.js
import other from './other.node.js';
import another from './another.js';
```

# Install

```bash
npm install --save babel-plugin-extension-resolver
```

## `.babelrc`

```json
{
  "plugins": ["extension-resolver"]
}
```

With options:

```json
{
  "plugins": ["extension-resolver", {
    "extensions": [".cool.js", ".js"]
  }]
}
```

# Options

## `extensions`

**Defaults:** (similar to how [create-react-app](https://github.com/facebook/create-react-app/blob/00b5fa903c584d89fc578f8f3dd4980b6c7d866d/packages/react-scripts/config/paths.js#L49) does it for web)
```javascript
[
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
]
```

**Warning:** This overrides ALL extension resolution, notably `.json` and `.node`. Make sure to re-include all extensions that matter.
