'use strict';

var _scaffander = require('./scaffander');

var _scaffander2 = _interopRequireDefault(_scaffander);

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var argv = (0, _minimist2.default)(process.argv.slice(2));
var path = argv._[0];
if (!path || path.length > 1) {
  console.error('Usage: scaffander <template-dir> --key1 value1 --key2 value2 --key3 value3');
  console.error('Keys with values are passed as context and will replace mustache template variables');
  process.exit(-1);
}