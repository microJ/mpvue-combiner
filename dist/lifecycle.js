"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var baseLifecycles = ["onLoad", "onShow", "onReady", "onHide", "onUnload"];
var customLifecycles = ["beforeLoad", "loaded", "beforeShow", "showed", "beforeReady", "readyed", "beforeHide", "hided", "beforeUnload", "unloaded"];
function matchBaseLifecycle2CustomLifecycleBefore(baseLifecycle) {
  var word = baseLifecycle.slice(2);
  return "before" + word;
}

function matchBaseLifecycle2CustomLifecycleAfter(baseLifecycle) {
  var word = baseLifecycle.slice(2);
  return word.toLowerCase() + (word === "Hide" ? "d" : "ed");
}

function matchCustomLifecycle2BaseLifecycle(customLifecycle) {
  var baseLifecycle = void 0,
      isBefore = void 0;
  if (/before/.test(customLifecycle)) {
    baseLifecycle = "on" + customLifecycle.slice(6);
    isBefore = true;
  } else {
    baseLifecycle = "on" + customLifecycle.slice(0, 1).toUpperCase() + customLifecycle.slice(1, customLifecycle.length - (customLifecycle === "hided" ? 1 : 2));
    isBefore = false;
  }
  return { baseLifecycle: baseLifecycle, isBefore: isBefore };
}
/**
 * baseConf has lifecycles
 * combine and will execute (baseConf first, conf next)
 * @param {Object} baseConf
 * @param {Object} conf
 * @returns {Object} pure lifecycles, lifes {beforeLoad: [], loaded: [], ..}
 */
function _combineCustomLifecycles(baseConf, conf) {
  var resConf = {};
  customLifecycles.forEach(function (lifecycle) {
    resConf[lifecycle] = [];
    if (baseConf[lifecycle]) {
      resConf[lifecycle] = resConf[lifecycle].concat(baseConf[lifecycle]);
    }
    if (conf[lifecycle]) {
      resConf[lifecycle] = resConf[lifecycle].concat(conf[lifecycle]);
    }
  });
  return resConf;
}

function combineCustomLifecycles() {
  for (var _len = arguments.length, confs = Array(_len), _key = 0; _key < _len; _key++) {
    confs[_key] = arguments[_key];
  }

  return confs.reduce(function (pc, conf) {
    return _combineCustomLifecycles(pc, conf);
  }, {});
}

exports.combineCustomLifecycles = combineCustomLifecycles;
exports.customLifecycles = customLifecycles;
exports.baseLifecycles = baseLifecycles;
exports.matchCustomLifecycle2BaseLifecycle = matchCustomLifecycle2BaseLifecycle;
exports.matchBaseLifecycle2CustomLifecycleBefore = matchBaseLifecycle2CustomLifecycleBefore;
exports.matchBaseLifecycle2CustomLifecycleAfter = matchBaseLifecycle2CustomLifecycleAfter;