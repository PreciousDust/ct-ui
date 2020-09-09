# Steps 步骤条

***警告：Step 组件请勿包裹于*** `div` ***等块级元素中，其唯一父元素为 Steps。***

```san 基础用法
import Step from '@/steps/step'
import Steps from '@/steps/steps'

module.exports = san.defineComponent({
    template: \`
        <div>
            <b-steps current="{{1}}">
                <b-step title="已完成" content="这里是该步骤的描述信息"></b-step>
                <b-step title="进行中" content="这里是该步骤的描述信息"></b-step>
                <b-step title="待进行" content="这里是该步骤的描述信息"></b-step>
                <b-step title="待进行" content="这里是该步骤的描述信息"></b-step>
            </b-steps>
        </div>
    \`,
    initData () {
        return {
        }
    },
    components: {
        'b-step': Step,
        'b-steps': Steps
    },
})
```

```san 尺寸
import Step from '@/steps/step'
import Steps from '@/steps/steps'

module.exports = san.defineComponent({
    template: \`
        <div>
            <b-steps size="small">
                <b-step title="已完成" content="这里是该步骤的描述信息"></b-step>
                <b-step title="进行中" content="这里是该步骤的描述信息"></b-step>
                <b-step title="待进行" content="这里是该步骤的描述信息"></b-step>
                <b-step title="待进行" content="这里是该步骤的描述信息"></b-step>
            </b-steps>
        </div>
    \`,
    initData () {
        return {
        }
    },
    components: {
        'b-step': Step,
        'b-steps': Steps
    },
})
```

```san 自定义 icon
import Step from '@/steps/step'
import Steps from '@/steps/steps'

module.exports = san.defineComponent({
    template: \`
        <div>
            <b-steps current="{{1}}">
                <b-step icon="gengduo" title="已完成" content="这里是该步骤的描述信息"></b-step>
                <b-step title="进行中" content="这里是该步骤的描述信息"></b-step>
                <b-step title="待进行" content="这里是该步骤的描述信息"></b-step>
                <b-step title="待进行" content="这里是该步骤的描述信息"></b-step>
            </b-steps>
        </div>
    \`,
    initData () {
        return {
        }
    },
    components: {
        'b-step': Step,
        'b-steps': Steps
    },
})
```

```san 切换步骤
import Step from '@/steps/step'
import Steps from '@/steps/steps'
import Button from '@/button/button'

module.exports = san.defineComponent({
    template: \`
        <div>
            <b-steps current="{{current}}">
                <b-step title="第一步"></b-step>
                <b-step title="第二步"></b-step>
                <b-step title="第三步"></b-step>
                <b-step title="第四步"></b-step>
            </b-steps>
            <div style="margin-top: 10px;">
                <b-button type="primary" on-click="handleChangeCurrent">下一步</b-button>
            </div>
        </div>
    \`,
    initData () {
        return {
            current: 0
        }
    },
    components: {
        'b-step': Step,
        'b-steps': Steps,
        'b-button': Button
    },
    handleChangeCurrent() {
        let { current } = this.data.get()
        if (current === 3) {
            return this.data.set('current', 0)
        } 
        this.data.set('current', current + 1)
    }
})
```

```san 垂直方向
import Step from '@/steps/step'
import Steps from '@/steps/steps'
import Button from '@/button/button'

module.exports = san.defineComponent({
    template: \`
        <div>
            <b-steps direction="vertical" current="{{current}}">
                <b-step title="第一步"></b-step>
                <b-step title="第二步"></b-step>
                <b-step title="第三步"></b-step>
                <b-step title="第四步"></b-step>
            </b-steps>
            <div style="margin-top: 10px;">
                <b-button type="primary" on-click="handleChangeCurrent">下一步</b-button>
            </div>
        </div>
    \`,
    initData () {
        return {
            current: 0
        }
    },
    components: {
        'b-step': Step,
        'b-steps': Steps,
        'b-button': Button
    },
    handleChangeCurrent() {
        let { current } = this.data.get()
        if (current === 3) {
            return this.data.set('current', 0)
        } 
        this.data.set('current', current + 1)
    }
})
```

```san 运行步骤错误

// 设置属性status为error指定当前步骤状态。

import Step from '@/steps/step'
import Steps from '@/steps/steps'

module.exports = san.defineComponent({
    template: \`
        <div>
            <b-steps current="{{2}}">
                <b-step title="第一步"></b-step>
                <b-step title="第二步"></b-step>
                <b-step status="error" title="第三步"></b-step>
                <b-step title="第四步"></b-step>
            </b-steps>
        </div>
    \`,
    initData () {
        return {
        }
    },
    components: {
        'b-step': Step,
        'b-steps': Steps
    }
})
```

### Steps Props

| 名称 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| status | String | 当前步骤的状态，可选值 `wait` `process` `finish` `error` | `process` |
| direction | String | 步骤条的方向，可选值 `horizontal` `vertical` | `horizontal` |
| current| Number| 当前步骤，从 0 开始计数 | `0` |
| size | String | 步骤条的尺寸，可选 `small` 或 `null` | 
| icon | String | 自定义 icon ，参考 Icon 组件 | `queding` |
 
### Step Props

| 名称 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| status | String | 当前步骤的状态，可选值 `wait` `process` `finish` `error` | `process` |
| title | String | 标题 |
| content | String | 步骤的详细描述 |
