'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _inquirer = require('inquirer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(message) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _ref2, confirmed;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _inquirer.prompt)((0, _extends3.default)({
              type: 'confirm',
              message: message,
              name: 'confirmed'
            }, opts));

          case 2:
            _ref2 = _context.sent;
            confirmed = _ref2.confirmed;
            return _context.abrupt('return', confirmed);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x2) {
    return _ref.apply(this, arguments);
  };
}();