# Message 提示框

```san 基础用法
import Message from '@/message'
import Button from '@/button/button'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-button on-click="handleClick('success')" type="success">成功提示</b-button>
            <b-button on-click="handleClick('warning')" type="warning">警告提示</b-button>
            <b-button on-click="handleClick('error')" type="error">错误提示</b-button>
            <b-button on-click="handleClick('info')" type="info">普通提示</b-button>
        </template>
    \`,
    initData () {
        return {
            show: false
        }
    },
    components: {
        'b-button': Button
    },
    handleClick(type) {
        this.$message({ content: '三人行，必有我师焉。择其善者而从之，其不善者而改之。知之为知之，不知为不知。', type })
    }
})
```

```san 自定义时长
import Message from '@/message'
import Button from '@/button/button'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-button on-click="handleClick" type="primary">自定义时长</b-button>
        </template>
    \`,
    initData () {
        return {
            show: false
        }
    },
    components: {
        'b-button': Button
    },
    handleClick() {
        this.$message({ content: '自定义时长！！！', duration: 10000 })
    }
})
```

```san 关闭按钮
import Message from '@/message'
import Button from '@/button/button'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-button on-click="handleClick" type="primary">不显示关闭按钮</b-button>
        </template>
    \`,
    initData () {
        return {
            show: false
        }
    },
    components: {
        'b-button': Button
    },
    handleClick() {
        this.$message({ content: '不显示关闭按钮', showClose: false })
    }
})
```

```san 图标显示
import Message from '@/message'
import Button from '@/button/button'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-button on-click="handleClick" type="primary">图标不显示</b-button>
        </template>
    \`,
    initData () {
        return {
            show: false
        }
    },
    components: {
        'b-button': Button
    },
    handleClick() {
        this.$message({ content: '图标不显示', showIcon: false })
    }
})
```

```san 手动关闭
import Message from '@/message'
import Button from '@/button/button'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-button on-click="handleClick" type="primary">手动关闭</b-button>
        </template>
    \`,
    initData () {
        return {
            show: false
        }
    },
    components: {
        'b-button': Button
    },
    handleClick() {
        this.$message({ content: '手动关闭，否则将会一直显示，不信你就试试看，不服不行。', autoClose: false })
    }
})
```

### Props

| 名称 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| content | String | 使用 `san-html` 绑定，可自定义 html 代码 |
| type | String | 可选值： `success` `warning` `error` `info` | `info` |
| duration | Number |  | `3000` |
| showClose | Boolean | 是否显示关闭按钮 | `false` |
| showIcon | Boolean | 是否显示左侧图标 | `false` |
| autoClose | Boolean | 是否自动关闭 | `true` |

### Events

| 名称 |描述 | 返回值 |
| --- |  --- | --- |
| close	 | 点击关闭按钮时触发 | 