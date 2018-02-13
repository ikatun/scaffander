#!/usr/bin/env node
import 'nnode';
import 'colors'
import path from 'path';
import scaffander from './scaffander';
import minimist from 'minimist';

const { _: [templatePath, destinationPath], ...context } = minimist(process.argv.slice(2));

if (!templatePath || !destinationPath) {
  console.error('Usage: scaffander <template> <destination> [--key1 value1] [--key2 value2] [...]');
  console.error('\tKeys with values are template {variables}');
  process.exit(-1);
}

scaffander(path.resolve(templatePath), path.resolve(destinationPath), context, { msg: 'Apply these changes?' })
  .catch(err => console.error('Error', err));
