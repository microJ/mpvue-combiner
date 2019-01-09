# mpvue-combiner

`mpvue-combiner` 是**生命周期**和**公共逻辑**相关的**增强工具**。

1. 将小程序的 5 个生命周期扩充到 15 个。

   小程序生命周期：`onLoad`, `onShow`, `onReady`, `onHide`, `onUnload`

   扩充的 10 个生命周期：`beforeLoad`,`loaded`,`beforeShow`,`showed`,`beforeReady`,`readyed`,`beforeHide`,`hided`,`beforeUnload`,`unloaded`

   *注意：`hide` 对应的完成时单词为 `hided`*

2. 新增 `onLifecycleChange` 函数，统一处理生命周期变更事件。

3. 通过 `this.$data.$isReady` 来标记是否 `onReady` 过了。

4. 通过 `this.$data.$currentLifecycle` 获取当前的生命周期。

5. 通过自定义公共逻辑配置，实现统一处理或者拦截。
   
   应用场景举例：
   1. 微信小程序检查更新。每个页面进行检查比 APP 启动时检查更有效。
   2. `unloaded` 时进行析构，比如重置页面、组件状态。
   3. 配合 `vuex`、`vue.mixins`，对每个页面进行统一的提示组件管理。页面中只需要在 `template` 中放置组件即可。
   4. 延迟执行：还未实例化完毕时延迟执行。
   5. 埋点自动统计等
   6. 日志系统等
   7. 场景过渡等

## Demo

参见：https://github.com/microJ/mpvue-combiner-demo.git

## Install

三种方式：

1. 将 `src` 文件夹放置工程文件中，引入 `src/index.js`。

2. `npm install mpvue-combiner`

3. `yarn add mpvue-combiner`

## Usage

我们通常会在 `.vue` 文件的 `<script></sciprt>` 中导出一个对象。我们暂且称之为 `实例选项`。

```js
// <script></script> in file index.vue

import mpvueCombiner from "mpvue-combiner"

export default mpvueCombiner(
  {
    // 公共实例选项1
  },
  {
    // 公共实例选项2
  },
  {
    // 当前页面实例选项
  }
)
```

### 公共实例选项与页面实例选项

同 `vue`，实例选项对象用来创建 `vue` 实例。

`mpvue-combiner` 推荐的实例选项对象写法：

1. 使用小程序原生的生命周期而不是 `vue` 的生命周期，推荐在公共实例选项中才使用 `mpvue-combiner` 扩充的 10 个生命周期，因为在页面实例选项中使用是无意义的。
2. 书写顺序
   1. `data`
   2. `computed`
   3. `components`
   4. 生命周期
   5. `onLifecycleChange`
   6. 小程序页面挂载方法
   7. `methods`
3. 将公共实例选项统一放在一个文件夹下管理。

**一个可能的公共实例选项对象：**

```js
{
  // data 支持对象字面量和 function，推荐 function。
  data() {
    return {
      currentVersion: "0.0.1",
      isShowModal: false
    }
  },

  beforeLoad() {
    checkUpdate()
  },
  onLoad() {},
  loaded() {},

  beforeShow() {},
  onShow() {},
  showed() {},

  beforeReady() {},
  onReady() {},
  readyed() {},

  beforeHide() {},
  onHide() {},
  hided() {},

  beforeUnload() {},
  onUnload() {},
  unloaded() {
    this.$isShowModal = false
    initData()
  },

  onLifecycleChange(lifecycle) {
    console.log("生命周期发生了变化：", lifecycle)
  },

  methods: {}
}
```

**一个可能的页面实例选项对象：**

```js
{
  // data 支持对象字面量和 function，推荐 function
  data() {
    return {}
  },

  onLoad() {
    console.log("页面触发了 onLoad")
    reqData()
  },
  onShow() {},
  onReady() {},
  onHide() {},
  onUnload() {},

  onLifecycleChange() {},

  methods: {}
}
```

## API

### mpvueCombiner

```js
import mpvueCombiner from "mpvue-combiner"
import ConfcheckUpload from "@/baseConfs/checkUpload"

const pageConf = {
  // ... 页面实例选项
}

export default mpvueCombiner(ConfcheckUpload, pageConf)
```

1. `mpvueCombiner` 接收的参数顺序为 `公共实例选项, ..., 公共实例选项, 页面实例选项`。返回一个合成的实例选项。

2. `mpvueCombiner` 的内部作用：
   1. 组合所有实例选项的 `data`、`methods`。
      
      类似 `Object.assign`，后面的 `data`、`methods` 成员会覆盖前面的同名成员。
   2. 类似 `beforeLoad`、`onLoad`、`loaded` 为一组生命周期。该组生命周期都会在 `onLoad` 时进行调用。
      
      以组为单位，15 种生命周期会被处理为小程序的 5 种生命周期。
      
      生命周期调用顺序： 
        1. 单组生命周期的顺序为 `beforeLifecycle` > `baseLifecycle` > `afterLifecycle`。 
        2. 越靠前的实例选项中的生命周期越先调用。

**默认的扩充内容：**

1. `data` 中：

   请注意，需要使用 `this.$data.<name>` 进行调用。

   - `$currentLifecycle`
   - `$isReady`

2. `onLifecycleChange`：

   在生命周期发生变化时触发。
   
   `onLifecycleChange(lifecycle)`
   
   `lifecycle` 值： `onLoad`, `onShow`, `onReady`, `onHide`, `onUnload`

## License

MIT
