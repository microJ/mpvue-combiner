"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _toString = Object.prototype.toString;

var isFn = function isFn(fn) {
  return _toString.call(fn) === "[object Function]";
};
var isPureObject = function isPureObject(obj) {
  return _toString.call(obj) === "[object Object]";
};

var getEmptyFn = function getEmptyFn() {
  return function () {};
};

var getPureObject = function getPureObject(obj) {
  return isPureObject(obj) ? obj : {};
};

/**
 * 组合所有的配置，配置会进行覆盖，最后传入的配置项优先级最高
 * @param  {...[base, new]} objs
 */
function combine() {
  for (var _len = arguments.length, objs = Array(_len), _key = 0; _key < _len; _key++) {
    objs[_key] = arguments[_key];
  }

  return objs.map(function (obj) {
    return getPureObject(obj);
  }).reduce(function (pv, cv) {
    return _extends({}, pv, cv);
  }, {});
}

exports._toString = _toString;
exports.isFn = isFn;
exports.isPureObject = isPureObject;
exports.getEmptyFn = getEmptyFn;
exports.getPureObject = getPureObject;
exports.combine = combine;