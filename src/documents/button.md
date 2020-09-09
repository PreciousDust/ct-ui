# Button

```san 基础用法
import Button from '@/button/button'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-button type="default">默认按钮</b-button>
            <b-button type="primary">主要按钮</b-button>
            <b-button type="success">成功按钮</b-button>
            <b-button type="warning">警告按钮</b-button>
            <b-button type="error">危险按钮</b-button>
            <b-button type="info">信息按钮</b-button>
            <b-button type="text">文本按钮</b-button>
        </template>
    \`,
    initData () {
        return {
        }
    },
    components: {
        'b-button': Button
    },
})
```

```san 不同尺寸
import Button from '@/button/button'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-button size="large">默认按钮</b-button>
            <b-button size="default">默认按钮</b-button>
            <b-button size="small">默认按钮</b-button>
        </template>
    \`,
    initData () {
        return {
        }
    },
    components: {
        'b-button': Button
    },
})
```

```san 禁用按钮
import Button from '@/button/button'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-button type="default" disabled>默认按钮</b-button>
            <b-button type="primary" disabled>主要按钮</b-button>
            <b-button type="success" disabled>成功按钮</b-button>
            <b-button type="warning" disabled>警告按钮</b-button>
            <b-button type="error" disabled>危险按钮</b-button>
            <b-button type="info" disabled>信息按钮</b-button>
            <b-button type="text" disabled>文本按钮</b-button>
        </template>
    \`,
    initData () {
        return {
        }
    },
    components: {
        'b-button': Button
    },
})
```

```san 点击事件
import Button from '@/button/button'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-button type="primary" on-click="handleClick">默认按钮</b-button>
        </template>
    \`,
    initData () {
        return {
        }
    },
    components: {
        'b-button': Button
    },
    handleClick(e) {
        alert('click事件')
    }
})
```

### Props

| 名称 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| type | String | 可选值 `default` `primary` `success` `error` `warning` `info` `text` | `default` |
| size | String | 可选值 `default` `large` `small` | `default` |
| disabled | Boolean | 按钮是否禁用 | `false` |

### Events

| 名称 |描述 | 返回值 |
| --- |  --- | --- |
| click	 | 按钮点击时触发 | `$event` |