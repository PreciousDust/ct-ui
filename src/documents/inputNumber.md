# inputNumber

使用鼠标或键盘输入一定范围的标准数值。

```san 基础用法

import InputNumber from '@/input-number'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="inputDemoCss">
                <ct-input-number value="{= value =}" on-change="onChange" formatter="{{formatter}}"></ct-input-number>
            </div>
        </template>
    \`,
    initData () {
        return {
            value:'',
            formatter:function(val){
                return val + '￥'
            }
        }
    },
    components: {
        'ct-input-number': InputNumber
    },
    onChange(val){
        console.log('onChange',val)
    }
})

```

```san 型号大小，可选 large 、 normal 、 small

import InputNumber from '@/input-number'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div  class="inputDemoCss">
                <ct-input-number size="small" value="{= smallValue =}"></ct-input-number>
            </div>
            <div class="inputDemoCss">
                <ct-input-number value="{= normalValue =}"></ct-input-number>
            </div>
            <div class="inputDemoCss">
                <ct-input-number size="large" value="{= largeValue =}"></ct-input-number>
            </div>
        </template>
    \`,
    initData () {
        return {
            normalValue:'32',
            smallValue:'24',
            largeValue:'36'
        }
    },
    components: {
        'ct-input-number': InputNumber
    }
})

```

```san readonly 和 disabled

import InputNumber from '@/input-number'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="inputDemoCss">
                <ct-input-number readonly value="{= readonlyValue =}"></ct-input-number>
            </div>
            <div  class="inputDemoCss">
                <ct-input-number disabled value="{= disabledValue =}"></ct-input-number>
            </div>
        </template>
    \`,
    initData () {
        return {
            readonlyValue:'0',
            disabledValue:'0'
        }
    },
    components: {
        'ct-input-number': InputNumber
    }
})

```

```san editable 是否可编辑

import InputNumber from '@/input-number'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="inputDemoCss">
                <ct-input-number value="{= value =}" editable="{{editable}}" ></ct-input-number>
            </div>
        </template>
    \`,
    initData () {
        return {
            value:'',
            editable:false
        }
    },
    components: {
        'ct-input-number': InputNumber
    }
})

```

```san 自动获取焦点

import InputNumber from '@/input-number'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="inputDemoCss">
                <ct-input-number value="{= value =}" autofocus></ct-input-number>
            </div>
        </template>
    \`,
    initData () {
        return {
            value:''
        }
    },
    components: {
        'ct-input-number': InputNumber
    }
})

```

```san 通过自带的focus方法，手动聚焦；通过blur方法，手动失焦

import InputNumber from '@/input-number'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="textareaDemoCss">
                <ct-input-number value="{= value =}" s-ref="thisInputNumber"></ct-input-number>
                <button on-click="handleFocus">handleFocus</button>
                <button on-click="handleBlur">handleBlur</button>
            </div>
        </template>
    \`,
    initData () {
        return {
            value:''
        }
    },
    handleFocus(){
        this.ref('thisInputNumber').focus()
    },
    handleBlur(){
        this.ref('thisInputNumber').blur()
    },
    components: {
        'ct-input-number': InputNumber
    }
})

```

```san step,设置每次点击的步伐

import InputNumber from '@/input-number'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="inputDemoCss">
                <ct-input-number value="{= value1 =}"  step="{{step1}}"></ct-input-number>
            </div>
            <div class="inputDemoCss">
                <ct-input-number value="{= value2 =}"  step="{{step2}}"></ct-input-number>
            </div>
        </template>
    \`,
    initData () {
        return {
            value1:'',
            value2:'',
            step1:3,
            step2:0.1
        }
    },
    components: {
        'ct-input-number': InputNumber
    }
})

```

```san min和max

import InputNumber from '@/input-number'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="inputDemoCss">
                <ct-input-number value="{= value =}" min="{{min}}" max="{{max}}"></ct-input-number>
            </div>
        </template>
    \`,
    initData () {
        return {
            value:'3',
            min:2,
            max:5
        }
    },
    components: {
        'ct-input-number': InputNumber
    }
})

```

```san precision 精度

import InputNumber from '@/input-number'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="inputDemoCss">
                <ct-input-number value="{= value =}" precision="{{precision}}"></ct-input-number>
            </div>
        </template>
    \`,
    initData () {
        return {
            value:'',
            precision:2
        }
    },
    components: {
        'ct-input-number': InputNumber
    }
})

```

### Props

| 名称 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| value	 | `String` 、 `Number` | input的数值（双向绑定） | `无` |
| readonly	 | `Boolean`| 是否是只读状态 | `false` |
| disabled	 | `Boolean`| 是否禁用 | `false` |
| size	 | `String`| input框的型号，可选`large`、`normal`、`small` | `normal` |
| placeholder	 | `String`| 占位文本 | `请输入` |
| autofocus	 | `Boolean`| 是否自动获取焦点 | `false` |
| width	 | `String`、`Number`| 宽度，支持像素和百分比 | `100%` |
| editable	 | `Boolean`| 是否可编辑 | `true` |
| step	 | `Number`| 每次改变的步伐，可以是小数 | `1` |
| max	 | `Number`| 最大值 | `Infinity` |
| min	 | `Number`| 最小值 | `-Infinity` |
| precision	 | `Number`| 数值精度 | `无` |




### Events

| 名称 |描述 | 返回值 |
| --- |  --- | --- |
| on-blur	 | 输入框`失焦`时触发 | `$event` |
| on-change	 | `数据改变`时触发 | `当前值` |
| on-focus	 | 输入框`聚焦`时触发 | `$event` |
| on-keyup	 | 原生的 `keyup` 事件 | `$event` |
| on-keydown	 | 原生的 `keydown` 事件 | `$event` |
| on-keypress	 | 原生的 `keypress` 事件 | `$event` |


### Methods
| 方法名 |描述 | 参数 |
| --- |  --- | --- |
| focus	 | 手动使`inputNumber`获取焦点 | `无` |
| blur	 | 手动使`inputNumber`失去焦点 | `无` |


