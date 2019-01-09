const _toString = Object.prototype.toString

const isFn = function(fn) {
  return _toString.call(fn) === "[object Function]"
}
const isPureObject = function(obj) {
  return _toString.call(obj) === "[object Object]"
}

const getEmptyFn = function() {
  return function() {}
}

const getPureObject = function(obj) {
  return isPureObject(obj) ? obj : {}
}

/**
 * 组合所有的配置，配置会进行覆盖，最后传入的配置项优先级最高
 * @param  {...[base, new]} objs
 */
function combine(...objs) {
  return objs
    .map(obj => getPureObject(obj))
    .reduce(
      (pv, cv) => ({
        ...pv,
        ...cv
      }),
      {}
    )
}

export { _toString, isFn, isPureObject, getEmptyFn, getPureObject, combine }
