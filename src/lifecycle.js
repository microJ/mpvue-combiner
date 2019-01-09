const baseLifecycles = ["onLoad", "onShow", "onReady", "onHide", "onUnload"]
const customLifecycles = [
  "beforeLoad",
  "loaded",
  "beforeShow",
  "showed",
  "beforeReady",
  "readyed",
  "beforeHide",
  "hided",
  "beforeUnload",
  "unloaded"
]
function matchBaseLifecycle2CustomLifecycleBefore(baseLifecycle) {
  const word = baseLifecycle.slice(2)
  return "before" + word
}

function matchBaseLifecycle2CustomLifecycleAfter(baseLifecycle) {
  const word = baseLifecycle.slice(2)
  return word.toLowerCase() + (word === "Hide" ? "d" : "ed")
}

function matchCustomLifecycle2BaseLifecycle(customLifecycle) {
  let baseLifecycle, isBefore
  if (/before/.test(customLifecycle)) {
    baseLifecycle = "on" + customLifecycle.slice(6)
    isBefore = true
  } else {
    baseLifecycle =
      "on" +
      customLifecycle.slice(0, 1).toUpperCase() +
      customLifecycle.slice(
        1,
        customLifecycle.length - (customLifecycle === "hided" ? 1 : 2)
      )
    isBefore = false
  }
  return { baseLifecycle, isBefore }
}
/**
 * baseConf has lifecycles
 * combine and will execute (baseConf first, conf next)
 * @param {Object} baseConf
 * @param {Object} conf
 * @returns {Object} pure lifecycles, lifes {beforeLoad: [], loaded: [], ..}
 */
function _combineCustomLifecycles(baseConf, conf) {
  const resConf = {}
  customLifecycles.forEach(lifecycle => {
    resConf[lifecycle] = []
    if (baseConf[lifecycle]) {
      resConf[lifecycle] = resConf[lifecycle].concat(baseConf[lifecycle])
    }
    if (conf[lifecycle]) {
      resConf[lifecycle] = resConf[lifecycle].concat(conf[lifecycle])
    }
  })
  return resConf
}

function combineCustomLifecycles(...confs) {
  return confs.reduce((pc, conf) => _combineCustomLifecycles(pc, conf), {})
}

export {
  combineCustomLifecycles,
  customLifecycles,
  baseLifecycles,
  matchCustomLifecycle2BaseLifecycle,
  matchBaseLifecycle2CustomLifecycleBefore,
  matchBaseLifecycle2CustomLifecycleAfter
}
