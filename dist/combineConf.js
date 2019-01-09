"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combineConf = undefined;

var _extendConf = require("./extendConf");

var _lifecycle = require("./lifecycle");

var _util = require("./util");

/**
 * 1. extend data and methods
 * 2. concat all custom-lifecycles
 * 3. combine custom-lifecycles (within pre-functions) to final render config
 * @param {...VueInstanceConfig} confs
 * @returns {VueInstanceConfig}
 */
function combineConf() {
  for (var _len = arguments.length, confs = Array(_len), _key = 0; _key < _len; _key++) {
    confs[_key] = arguments[_key];
  }

  var extendedConf = _extendConf.extendConf.apply(undefined, confs);
  // console.log("extended config for data and methods ______", extendedConf)
  _lifecycle.customLifecycles.forEach(function (customLifecycle) {
    return delete extendedConf[customLifecycle];
  });
  var customLifecyclesConf = _lifecycle.combineCustomLifecycles.apply(undefined, confs);
  // console.log('custom lifecycles ______',customLifecyclesConf)
  var onLifecycleChangeFns = confs.reduce(function (ac, conf) {
    return (0, _util.isFn)(conf.onLifecycleChange) ? ac.concat(conf.onLifecycleChange) : ac;
  }, []);
  // console.log("lifecycles onLifecycleChange ______", onLifecycleChangeFns)
  _lifecycle.baseLifecycles.forEach(function (baseLifecycle) {
    var originLifecycleFn = extendedConf[baseLifecycle];
    var beforeLifecycle = (0, _lifecycle.matchBaseLifecycle2CustomLifecycleBefore)(baseLifecycle);
    var afterLifecycle = (0, _lifecycle.matchBaseLifecycle2CustomLifecycleAfter)(baseLifecycle);
    var lifecyclesFn = [].concat(customLifecyclesConf[beforeLifecycle], originLifecycleFn, customLifecyclesConf[afterLifecycle]);
    extendedConf[baseLifecycle] = function () {
      var _this = this;

      for (var _len2 = arguments.length, payload = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        payload[_key2] = arguments[_key2];
      }

      onLifecycleChangeFns.forEach(function (fn) {
        return (0, _util.isFn)(fn) && fn.call(_this, baseLifecycle);
      });
      lifecyclesFn.forEach(function (fn) {
        return (0, _util.isFn)(fn) && fn.call.apply(fn, [_this].concat(payload));
      });
    };
  });
  // console.log('config with final lifecycles ______', extendedConf)
  return extendedConf;
}

exports.combineConf = combineConf;