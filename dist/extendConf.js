"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extendConf = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _util = require("./util");

function getVueDataConf(vueConf) {
  var data = vueConf.data;

  return (0, _util.isFn)(data) ? data() : (0, _util.isPureObject)(data) ? data : {};
}

/**
 * 只处理 data 和 methods
 * data 支持 {} 和 function, 建议 function
 * @param {...array} from base to new
 * @returns {extendedConf}
 */
function extendConf() {
  for (var _len = arguments.length, confs = Array(_len), _key = 0; _key < _len; _key++) {
    confs[_key] = arguments[_key];
  }

  var combinedConf = confs.reduce(function (po, obj) {
    return _extends({}, po, obj, {
      data: function data() {
        return (0, _util.combine)(getVueDataConf(po), getVueDataConf(obj));
      },

      methods: (0, _util.combine)(po.methods, obj.methods)
      // computed://
    });
  }, {});
  return combinedConf;
}

exports.extendConf = extendConf;