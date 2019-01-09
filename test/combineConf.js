const { combineConf } = require("../dist/combineConf")

console.log(
  combineConf(
    {
      beforeLoad() {},
      loaded() {},
      data: {
        a: 1
      },
      onLifecycleChange() {}
    },
    {
      data() {
        return {
          b: 1
        }
      },
      beforeLoad() {},
      hided() {},
      methods: {
        showName: undefined, // will be overwrited by next config
        showWeight() {}
      }
    },
    {
      load() {},
      methods: {
        showName() {},
        showSex() {}
      },
      onLifecycleChange() {}
    }
  )
)
