import { combine, isFn, isPureObject } from "./util"

function getVueDataConf(vueConf) {
  const { data } = vueConf
  return isFn(data) ? data() : isPureObject(data) ? data : {}
}

/**
 * 只处理 data 和 methods
 * data 支持 {} 和 function, 建议 function
 * @param {...array} from base to new
 * @returns {extendedConf}
 */
function extendConf(...confs) {
  const combinedConf = confs.reduce(
    (po, obj) => ({
      ...po,
      ...obj,
      data() {
        return combine(getVueDataConf(po), getVueDataConf(obj))
      },
      methods: combine(po.methods, obj.methods)
      // computed://
    }),
    {}
  )
  return combinedConf
}

export { extendConf }
