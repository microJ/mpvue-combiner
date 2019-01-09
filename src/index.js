import { combineConf } from "./combineConf"

const initialConf = {
  data() {
    return {
      $currentLifecycle: "",
      $isReady: false
    }
  },
  onLifecycleChange(lifecycle) {
    this.$data.$currentLifecycle = lifecycle
    if (lifecycle === "onReady") {
      this.$data.$isReady = true
    }
  }
}

export default (...confs) => combineConf(initialConf, ...confs)
