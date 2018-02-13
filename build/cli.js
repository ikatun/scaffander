#!/usr/bin/env node
'use strict';

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

require('nnode');

require('colors');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _scaffander = require('./scaffander');

var _scaffander2 = _interopRequireDefault(_scaffander);

var _minimist2 = require('minimist');

var _minimist3 = _interopRequireDefault(_minimist2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _minimist = (0, _minimist3.default)(process.argv.slice(2)),
    _minimist$_ = (0, _slicedToArray3.default)(_minimist._, 2),
    templatePath = _minimist$_[0],
    destinationPath = _minimist$_[1],
    context = (0, _objectWithoutProperties3.default)(_minimist, ['_']);

if (!templatePath || !destinationPath) {
  console.error('Usage: scaffander <template> <destination> [--key1 value1] [--key2 value2] [...]');
  console.error('\tKeys with values are template {variables}');
  process.exit(-1);
}

(0, _scaffander2.default)(_path2.default.resolve(templatePath), _path2.default.resolve(destinationPath), context, { msg: 'Apply these changes?' }).catch(function (err) {
  return console.error('Error', err);
});