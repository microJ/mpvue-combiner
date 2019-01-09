const { combineCustomLifecycles } = require("../dist/lifecycle")

console.log(
  combineCustomLifecycles(
    {
      beforeLoad: [1],
      loaded: [2],
      beforeShow: 3,
      showed: [4, 5],
      beforeReady: 6,
      // 'readyed': 7,
      beforeHide: 8,
      // 'hided': 9,
      beforeUnload: 10,
      unloaded: 11
    },
    {
      beforeLoad: 11,
      loaded: [12],
      beforeShow: 13,
      showed: [14, 15],
      beforeReady: 16,
      readyed: 17,
      beforeHide: [18],
      // 'hided': 19,
      beforeUnload: 110,
      unloaded: [111, function() {}]
    }
  )
)
