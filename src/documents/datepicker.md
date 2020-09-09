# Datepicker 日期/时间选择器

```san 基础用法
import Datepicker from '@/date-picker/picker'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-datepicker 
                on-change="handleChange" 
                format="yyyy-MM-dd"
                placeholder="请选择日期">
            </b-datepicker>
        </template>
    \`,
    initData () {
        return {
        }
    },
    components: {
        'b-datepicker': Datepicker
    },
    handleChange(val) {
    }
})
```

```san 默认日期
import Datepicker from '@/date-picker/picker'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-datepicker 
                fixed
                label="日期：" 
                width="220" 
                value="{= date =}"
                format="yyyy-MM-dd"
                labelWidth="50"
                placeholder="请选择日期">
            </b-datepicker>
            <b-datepicker
                fixed
                label="日期范围：" 
                width="340" 
                value="{= rangeDate =}"
                labelWidth="80"
                format="yyyy-MM-dd"
                placeholder="请选择日期范围" 
                range>
            </b-datepicker>
            <b-datepicker
                fixed
                label="日期时间范围：" 
                width="420" 
                value="{= rangeDatetime =}"
                labelWidth="80"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择日期时间范围" 
                range>
            </b-datepicker>
        </template>
    \`,
    initData () {
        return {
            date: '2019-06-12',
            rangeDate: ['2019-06-12', '2019-06-17'],
            rangeDatetime: ['2019-06-12 09:11:22', '2019-06-17 09:22:11']
        }
    },
    components: {
        'b-datepicker': Datepicker
    },
    attached() {
        this.watch('date', val => {
            console.log('date', val)
        })

        this.watch('rangeDate', val => {
            console.log('range date', val)
        })
    }
})
```

```san 日期范围
import Datepicker from '@/date-picker/picker'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-datepicker
                fixed 
                label="日期范围" 
                width="340" 
                labelWidth="80"
                format="yyyy-MM-dd"
                placeholder="请选择日期范围" 
                range>
            </b-datepicker>
        </template>
    \`,
    initData () {
        return {
        }
    },
    components: {
        'b-datepicker': Datepicker
    },
})
```

```san 日期和时间
import Datepicker from '@/date-picker/picker'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-datepicker type="datetime" width="200" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择日期和时间"></b-datepicker>
        </template>
    \`,
    initData () {
        return {}
    },
    components: {
        'b-datepicker': Datepicker
    }
})
```

```san 日期和时间范围
import Datepicker from '@/date-picker/picker'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-datepicker 
                fixed
                label="日期和时间范围"
                type="datetime"  
                width="420" 
                labelWidth="100"
                placeholder="请选择日期和时间范围"
                range 
                format="yyyy-MM-dd HH:mm:ss">
            </b-datepicker>
        </template>
    \`,
    initData () {
        return {}
    },
    components: {
        'b-datepicker': Datepicker
    }
})
```

```san 年份
import Datepicker from '@/date-picker/picker'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-datepicker type="year" format="yyyy" placeholder="请选择年份"></b-datepicker>
        </template>
    \`,
    initData () {
        return {}
    },
    components: {
        'b-datepicker': Datepicker
    }
})
```

```san 年份范围
import Datepicker from '@/date-picker/picker'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-datepicker 
                fixed
                label="年份范围"
                type="year" 
                range 
                placeholder="请选择年份范围"
                width="250" 
                labelWidth="80"
                format="yyyy">
            </b-datepicker>
        </template>
    \`,
    initData () {
        return {}
    },
    components: {
        'b-datepicker': Datepicker
    }
})
```

```san 月份
import Datepicker from '@/date-picker/picker'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-datepicker type="month" placeholder="请选择月份" format="yyyy-MM"></b-datepicker>
        </template>
    \`,
    initData () {
        return {}
    },
    components: {
        'b-datepicker': Datepicker
    }
})
```

```san 月份范围
import Datepicker from '@/date-picker/picker'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-datepicker 
                fixed
                label="月份范围"
                type="month" 
                range 
                width="250" 
                labelWidth="80"
                placeholder="请选择月份范围"
                format="yyyy-MM">
            </b-datepicker>
        </template>
    \`,
    initData () {
        return {}
    },
    components: {
        'b-datepicker': Datepicker
    }
})
```


```san 时间
import Datepicker from '@/date-picker/picker'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-datepicker type="time" placeholder="请选择时间" format="HH:mm:ss"></b-datepicker>
        </template>
    \`,
    initData () {
        return {}
    },
    components: {
        'b-datepicker': Datepicker
    }
})
```

### Props

| 名称 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| value | `String` `Array` | 仅在 `dateType` 为 `formatdate` 模式下可用双向绑定 |
| type | `String` | 可选 `date` `year` `month` `time` `datetime` | `date` |
| range | `Boolean` | 是否为范围选项 | `false` | 
| dateType | `String` | `change事件` 返回数据类型，可选 `date` `formatdate` `timestamp` | `formatdate` |
| format | `String` | `yyyy-MM-dd HH:mm:ss` | `yyyy-MM-dd` |
| disabled	 | `Boolean`| 是否禁用 | `false` |
| readonly	 | `Boolean`| 是否只读 | `false` |
| size	 | `String`| input 的型号，可选`large`、`normal`、`small` | `normal` |
| placeholder	 | `String`| 占位文本 | `请输入` |
| label	 | `String`| input 前的说明文字,若`fixed`为`true`，则优先级比`slot`中的`prepend`高 | `无` |
| labelAlign	 | `String`| input 前说明文字的对齐方式，可选：`left`、`center`、`right`| `center` |
| labelWidth	 | `String` `Number`| input 前的说明文字的宽度, 当 `fixed` 为 `false`，该选向必填 | `auto` |
| width	 | `String` `Number`| 宽度，支持像素和百分比。`fixed`为`false`时指代`input框`的宽度；`fixed`为`true`时指代 `整体input` 的宽度 | `100%` |
| fixed	 | `Boolean`| input 的搭配文字的两种样式类型，为`true`时，`label`为灰色背景且具有边框，和`input`为一个整体，`width`来设置 `整体input` 的宽度；为`false`时，`label`自己作为一个单独的个体，可设置通过`width`来设置`input`的宽度 | `false` |

### Events

| 名称 |描述 | 返回值 |
| --- |  --- | --- |
| on-change	 | `数据改变`时触发 | `format date` |
| on-clear | 设置 `clearable` 时可用，点击清空按钮时触发 |
| on-focus	 | 输入框`聚焦`时触发 | `$event` |
| on-blur	 | 输入框`失焦`时触发 | `$event` |
