"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _combineConf = require("./combineConf");

var initialConf = {
  data: function data() {
    return {
      $currentLifecycle: "",
      $isReady: false
    };
  },
  onLifecycleChange: function onLifecycleChange(lifecycle) {
    this.$data.$currentLifecycle = lifecycle;
    if (lifecycle === "onReady") {
      this.$data.$isReady = true;
    }
  }
};

exports.default = function () {
  for (var _len = arguments.length, confs = Array(_len), _key = 0; _key < _len; _key++) {
    confs[_key] = arguments[_key];
  }

  return _combineConf.combineConf.apply(undefined, [initialConf].concat(confs));
};