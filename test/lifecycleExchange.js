const {
  baseLifecycles,
  matchBaseLifecycle2CustomLifecycleAfter,
  matchBaseLifecycle2CustomLifecycleBefore,
  customLifecycles,
  matchCustomLifecycle2BaseLifecycle
} = require("../dist/lifecycle")

console.log(baseLifecycles.map(matchBaseLifecycle2CustomLifecycleBefore))
console.log('\n')
console.log(baseLifecycles.map(matchBaseLifecycle2CustomLifecycleAfter))
console.log('\n')

customLifecycles.forEach(customLifecycle => {
  console.log(
    customLifecycle,
    matchCustomLifecycle2BaseLifecycle(customLifecycle)
  )
})
