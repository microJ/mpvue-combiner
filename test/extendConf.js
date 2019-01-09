const { extendConf } = require("../dist/extendConf")

console.log(
  extendConf(
    { onLoad() {} },
    {
      data() {
        return {
          a: 1
        }
      },
      methods: {
        hello() {}
      }
    },
    {
      data: {
        index: 0
      },
      methods: {
        hi() {}
      }
    }
  )
)
