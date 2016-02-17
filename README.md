# icebug

A wrapper around [nodemon](https://npmjs.com/package/nodemon) and [node-inspector](https://npmjs.com/package/node-inspector).

Inspiration from [nodev](https://npmjs.com/package/)

## Installation

Install it from npm:

```
npm install icebug --save-dev
```

*Please note that I've used ES6 syntax, so node v4 or above is required.*

## Using

Although I never recommend installing modules globally, if you installed icebug with the `-g` flag, you should be able to run `icebug path/to/file.js`.

However, I recommend you install the package locally, and add an `npm run` script to your `package.json`.

```
{
  "scripts": {
    "debug": "icebug path/to/file.js"
  }
}
```

Because npm is smart, it'll look in the local `node_modules` folder.

## Configuration

icebug uses `rc`, which in turn uses `minimist`, which means configuration can come from CLI arguments as well as a `.icebugrc` file.

The configuration allows you to change the ports used, as well as passing additional arguments to `nodemon` and `node-inspector`.

Sample `.icebugrc` file with defaults:

```
{
  // node-inspector web port
  "webport": 8080,
  // debugging port
  "debugport": 5858,
  // node-inspector's --save-live-edit
  "edit": true,
  // use debug-brk
  "break": false,
  // Additional args to pass to nodemon
  "nodemonargs": "",
  // Additional args to pass to node-inspector
  "inspectorargs": ""
}
```

These can be overriden with the CLI, e.g.

```
icebug --break --webport=7070
```


## Author

Jeff Hansen - [@Jeffijoe](https://twitter.com/jeffijoe)

## License

MIT.