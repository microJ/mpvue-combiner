import { extendConf } from "./extendConf"
import {
  baseLifecycles,
  customLifecycles,
  combineCustomLifecycles,
  matchBaseLifecycle2CustomLifecycleBefore,
  matchBaseLifecycle2CustomLifecycleAfter
} from "./lifecycle"
import { isFn } from "./util"

/**
 * 1. extend data and methods
 * 2. concat all custom-lifecycles
 * 3. combine custom-lifecycles (within pre-functions) to final render config
 * @param {...VueInstanceConfig} confs
 * @returns {VueInstanceConfig}
 */
function combineConf(...confs) {
  const extendedConf = extendConf(...confs)
  // console.log("extended config for data and methods ______", extendedConf)
  customLifecycles.forEach(
    customLifecycle => delete extendedConf[customLifecycle]
  )
  const customLifecyclesConf = combineCustomLifecycles(...confs)
  // console.log('custom lifecycles ______',customLifecyclesConf)
  const onLifecycleChangeFns = confs.reduce(
    (ac, conf) =>
      isFn(conf.onLifecycleChange) ? ac.concat(conf.onLifecycleChange) : ac,
    []
  )
  // console.log("lifecycles onLifecycleChange ______", onLifecycleChangeFns)
  baseLifecycles.forEach(baseLifecycle => {
    const originLifecycleFn = extendedConf[baseLifecycle]
    const beforeLifecycle = matchBaseLifecycle2CustomLifecycleBefore(
      baseLifecycle
    )
    const afterLifecycle = matchBaseLifecycle2CustomLifecycleAfter(
      baseLifecycle
    )
    const lifecyclesFn = [].concat(
      customLifecyclesConf[beforeLifecycle],
      originLifecycleFn,
      customLifecyclesConf[afterLifecycle]
    )
    extendedConf[baseLifecycle] = function(...payload) {
      onLifecycleChangeFns.forEach(
        fn => isFn(fn) && fn.call(this, baseLifecycle)
      )
      lifecyclesFn.forEach(fn => isFn(fn) && fn.call(this, ...payload))
    }
  })
  // console.log('config with final lifecycles ______', extendedConf)
  return extendedConf
}

export { combineConf }
