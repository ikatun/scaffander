'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var instantiateTemplatePathRec = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(templatePath, destinationPath, context, opts) {
    var templatePathState, files, templateContent;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!templatePath.endsWith('template-init.js')) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', null);

          case 2:
            destinationPath = _mustache2.default.render(destinationPath, context);

            _context.next = 5;
            return _fsExtra2.default.lstat(templatePath);

          case 5:
            templatePathState = _context.sent;

            (0, _lodashGetOrSet2.default)(context, 'diffLog', {});

            if (!templatePathState.isDirectory()) {
              _context.next = 15;
              break;
            }

            _context.next = 10;
            return _fsExtra2.default.readdir(templatePath);

          case 10:
            files = _context.sent;
            _context.next = 13;
            return _bluebird2.default.map(files, function (file) {
              var src = _path2.default.join(templatePath, file);
              var dest = _path2.default.join(destinationPath, file);
              return instantiateTemplatePathRec(src, dest, context, opts);
            });

          case 13:
            _context.next = 22;
            break;

          case 15:
            if (!templatePathState.isFile()) {
              _context.next = 22;
              break;
            }

            _context.next = 18;
            return _fsExtra2.default.readFile(templatePath, 'utf8');

          case 18:
            templateContent = _context.sent;
            _context.next = 21;
            return _mustache2.default.render(templateContent, context, opts);

          case 21:
            context.diffLog[destinationPath] = _context.sent;

          case 22:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function instantiateTemplatePathRec(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var instantiateTemplatePath = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(localTemplatePath, destinationPath, context) {
    var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var postRunActions, initPath, before, after, changes;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            opts.overwrite = opts.overwrite || function () {
              return false;
            };
            postRunActions = (0, _lodashGetOrSet2.default)(context, 'postRunActions', []);
            initPath = _path2.default.join(localTemplatePath, 'template-init');
            before = importName(initPath, 'before', function () {});
            after = importName(initPath, 'after', function () {});
            _context2.next = 7;
            return before(context);

          case 7:
            _context2.next = 9;
            return instantiateTemplatePathRec(localTemplatePath, destinationPath, context, opts);

          case 9:
            _context2.next = 11;
            return after(context);

          case 11:
            changes = {
              diffLog: context.diffLog || {},
              postRunActions,
              msg: opts.msg
            };
            _context2.next = 14;
            return (0, _diff.offerChanges)(changes);

          case 14:
            return _context2.abrupt('return', _context2.sent);

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function instantiateTemplatePath(_x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodashGetOrSet = require('lodash-get-or-set');

var _lodashGetOrSet2 = _interopRequireDefault(_lodashGetOrSet);

var _mustache = require('mustache');

var _mustache2 = _interopRequireDefault(_mustache);

var _diff = require('./diff');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function importName(modulePath, name, defaultValue) {
  try {
    return require(modulePath)[name] || defaultValue;
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return defaultValue;
    }
    throw err;
  }
}

exports.default = instantiateTemplatePath;