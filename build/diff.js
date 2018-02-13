'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.offerChanges = exports.applyDiffLog = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var applyDiffLog = exports.applyDiffLog = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(diffLog) {
    var _this = this;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _promise2.default.all(_lodash2.default.map(diffLog, function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(newValue, filePath) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _mkdirpPromise2.default)(_path2.default.join(filePath, '..'));

                      case 2:
                        _context.next = 4;
                        return _fsExtra2.default.writeFile(filePath, newValue, 'utf8');

                      case 4:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this);
              }));

              return function (_x2, _x3) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function applyDiffLog(_x) {
    return _ref.apply(this, arguments);
  };
}();

var offerChanges = exports.offerChanges = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(_ref3) {
    var _this2 = this;

    var diffLog = _ref3.diffLog,
        postRunActions = _ref3.postRunActions,
        msg = _ref3.msg;
    var changes, sortedChanges;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _promise2.default.all(_lodash2.default.map(diffLog, function () {
              var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(fileContent, filePath) {
                var oldContent;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return _fsExtra2.default.readFile(filePath, 'utf8');

                      case 3:
                        oldContent = _context3.sent;

                        if (!(oldContent === fileContent)) {
                          _context3.next = 6;
                          break;
                        }

                        return _context3.abrupt('return', { type: 'nochange', filePath });

                      case 6:
                        return _context3.abrupt('return', { diff: (0, _diff.diffLines)(oldContent, fileContent), type: 'modify', filePath });

                      case 9:
                        _context3.prev = 9;
                        _context3.t0 = _context3['catch'](0);
                        return _context3.abrupt('return', { type: 'add', filePath });

                      case 12:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, _this2, [[0, 9]]);
              }));

              return function (_x5, _x6) {
                return _ref5.apply(this, arguments);
              };
            }()));

          case 2:
            changes = _context4.sent;
            sortedChanges = _lodash2.default.sortBy(changes, ['type', 'filePath']);


            sortedChanges.forEach(function (_ref6) {
              var type = _ref6.type,
                  filePath = _ref6.filePath,
                  diff = _ref6.diff;

              var localPath = _path2.default.relative(process.cwd(), filePath);
              if (type === 'nochange') {
                return;
              }

              if (type === 'add') {
                console.log(`${localPath} created`.green);
                return;
              }

              console.log(`${localPath} modified:`);
              diff.forEach(function (_ref7, index) {
                var added = _ref7.added,
                    removed = _ref7.removed,
                    value = _ref7.value;

                if (!value) {
                  return;
                }
                if (added) {
                  console.log(indentLinesWith(value, `  [+]  `).green);
                } else if (removed) {
                  console.log(indentLinesWith(value, `  [-]  `).red);
                } else if (index > 0 && index < diff.length - 1) {
                  console.log('  [ ]  ...');
                }
              });
            });

            _context4.t0 = !msg;

            if (_context4.t0) {
              _context4.next = 10;
              break;
            }

            _context4.next = 9;
            return (0, _confirmer2.default)(msg);

          case 9:
            _context4.t0 = _context4.sent;

          case 10:
            if (!_context4.t0) {
              _context4.next = 15;
              break;
            }

            _context4.next = 13;
            return applyDiffLog(diffLog);

          case 13:
            _context4.next = 15;
            return _promise2.default.all(_lodash2.default.map(postRunActions, function (action) {
              return action();
            }));

          case 15:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function offerChanges(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _diff = require('diff');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _mkdirpPromise = require('mkdirp-promise');

var _mkdirpPromise2 = _interopRequireDefault(_mkdirpPromise);

var _confirmer = require('./confirmer');

var _confirmer2 = _interopRequireDefault(_confirmer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function indentLinesWith(str, indent) {
  return str.split('\n').map(function (line) {
    return indent + line;
  }).join('\n');
}