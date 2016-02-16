'use strict';

////////////////////
/// icebug
/// by Jeff Hansen
////////////////////

const nodemon = require('nodemon');
const fork = require('child_process').fork;
const rc = require('rc');

// Since args are parsed by rc + minimist, command-line args can be used, too.
// E.g. icebug index.js --break --edit --nodemonargs="stuff"
const opts = rc('icebug', {
  // node-inspector web port
  webport: 8080,
  // Debug port
  debugport: 5858,
  // Enable live-editing in inspector?
  edit: true,
  // Additional args to pass to node-inspector
  inspectorargs: '',
  // Additional args to pass to nodemon
  nodemonargs: '',
  // Use debug-brk instead of debug.
  break: false
});

// First unknown arg should be the file to run.
const file = opts._[0] || 'index.js';

// Flag to make sure we don't launch node-inspector more than once.
let inspectorRunning = false;

// Concat nodemon args.
const nodemonArgs = `--debug${opts.break ? '-brk' : ''}=${opts.debugport} ${file} ${opts.nodemonargs} `;

// Start nodemon
nodemon(nodemonArgs);
nodemon.on('start', () => {
  // If not already launched, launch node-inspector.
  if (inspectorRunning) return;
  const inspectorArgs = [
    `--web-port=${opts.webport}`,
    `--debug-port=${opts.debugport}`,
    ...opts.edit && [
      '--save-live-edit'
    ],
    ...opts.inspectorargs.split(' ')
  ];
  const forkOpts = { silent: false };
  inspectorRunning = fork(
    require.resolve('node-inspector/bin/inspector'),
    inspectorArgs,
    forkOpts
  );
});