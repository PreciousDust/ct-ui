# input

基本表单组件，并在原生控件基础上进行了功能扩展，可以组合使用。

```san 基础用法

import Input from '@/input'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="inputDemoCss">
                <ct-input value="{= value =}" on-click-suffix="clickSuffix" ></ct-input>
            </div>
        </template>
    \`,
    initData () {
        return {
            value:''
        }
    },
    components: {
        'ct-input': Input
    },
    clickSuffix(){
        console.log('clickSuffix')
    }
})

```

```san 型号大小，可选 large 、 normal 、 small

import Input from '@/input'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div  class="inputDemoCss">
                <ct-input size="small" value="{= smallValue =}" suffix="{{suffix}}"></ct-input>
            </div>
            <div class="inputDemoCss">
                <ct-input value="{= normalValue =}" suffix="{{suffix}}"></ct-input>
            </div>
            <div class="inputDemoCss">
                <ct-input size="large" value="{= largeValue =}" suffix="{{suffix}}"></ct-input>
            </div>
        </template>
    \`,
    initData () {
        return {
            normalValue:'正常型号',
            smallValue:'较小型号',
            largeValue:'较大型号',
            suffix:'rili'
        }
    },
    components: {
        'ct-input': Input
    }
})

```

```san readonly 和 disabled

import Input from '@/input'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="inputDemoCss">
                <ct-input readonly value="{= readonlyValue =}"></ct-input>
            </div>
            <div  class="inputDemoCss">
                <ct-input disabled value="{= disabledValue =}"></ct-input>
            </div>
        </template>
    \`,
    initData () {
        return {
            readonlyValue:'readonly',
            disabledValue:'disabled'
        }
    },
    components: {
        'ct-input': Input
    }
})

```


```san placeHolder:占位文本

import Input from '@/input'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="inputDemoCss">
                <ct-input value="{= value =}" placeholder={{placeholder}}></ct-input>
            </div>
        </template>
    \`,
    initData () {
        return {
            value:'',
            placeholder:'placeholder'
        }
    },
    components: {
        'ct-input': Input
    }
})

```

```san 清空功能：clearable

import Input from '@/input'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="inputDemoCss">
                <ct-input value="{= value =}" clearable ></ct-input>
            </div>
        </template>
    \`,
    initData () {
        return {
            value:''
        }
    },
    components: {
        'ct-input': Input
    }
})

```

```san prefix:前缀图标; suffix:后缀图标【标签形式】此为示例，图标并无具体含义

import Input from '@/input'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="inputDemoCss">
               <ct-input value="{= value =}" prefix="{{prefix}}" on-click-suffix="clickSuffix" clearable></ct-input>
            </div>
            <div class="inputDemoCss">
               <ct-input value="{= value =}" suffix="{{suffix}}" on-click-suffix="clickSuffix" clearable></ct-input>
            </div>
            <div class="inputDemoCss">
               <ct-input value="{= value =}" prefix="{{prefix}}" on-click-suffix="clickSuffix" suffix="{{suffix}}" clearable></ct-input>
            </div>
        </template>
    \`,
    initData () {
        return {
            value:'',
            suffix:'rili',
            prefix:'saoma',
        }
    },
    components: {
        'ct-input': Input
    },
    clickSuffix(){
        console.log('clickSuffix')
    }
})

```

```san prefix:前缀图标; suffix:后缀图标【slot形式】

import Input from '@/input'
import Icon from '@/icon/icon'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="inputDemoCss">
               <ct-input value="{= value =}" clearable on-click-suffix="clickSuffix">
                    <b-icon type="saoma" size="15" slot='prefix'></b-icon>
               </ct-input>
            </div>
            <div class="inputDemoCss">
               <ct-input value="{= value =}" clearable on-click-suffix="clickSuffix">
                    <b-icon type="rili" size="15" slot='suffix' ></b-icon>
               </ct-input>
            </div>
             <div class="inputDemoCss">
               <ct-input value="{= value =}" clearable on-click-suffix="clickSuffix">
                    <b-icon type="saoma" size="15" slot='prefix'></b-icon>
                    <b-icon type="rili" size="15" slot='suffix'></b-icon>
               </ct-input>
            </div>
        </template>
    \`,
    initData () {
        return {
            value:''
        }
    },
    components: {
        'ct-input': Input,
        'b-icon': Icon
    },
    clickSuffix(){
        console.log('clickSuffix')
    }
})

```


```san oneIcon：设置为false，则clearIcon和suffix会同时展示，默认为true，只会展示一个

import Input from '@/input'
import Icon from '@/icon/icon'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="inputDemoCss">
               <ct-input value="{= value =}" suffix="{{suffix}}" clearable></ct-input>
            </div>
             <div class="inputDemoCss">
               <ct-input value="{= value =}" clearable on-click-suffix="clickSuffix">
                    <b-icon type="rili" size="15" slot='suffix' ></b-icon>
               </ct-input>
            </div>
            <div class="inputDemoCss">
               <ct-input value="{= value =}" oneIcon="{{false}}" suffix="{{suffix}}" clearable></ct-input>
            </div>
             <div class="inputDemoCss">
               <ct-input value="{= value =}" oneIcon="{{false}}" clearable on-click-suffix="clickSuffix">
                    <b-icon type="rili" size="15" slot='suffix' ></b-icon>
               </ct-input>
            </div>
        </template>
    \`,
    initData () {
        return {
            value:'',
            suffix:'rili',
            prefix:'saoma',
        }
    },
    components: {
        'ct-input': Input,
        'b-icon': Icon
    },
    clickSuffix(){
        console.log('clickSuffix')
    }
})

```


```san 通过设置label、fixed属性，设置带文字描述的input组合组件。fixed为false时可设置通过width来设置input框的宽度；fixed为true时可设置通过width来设置 整体input 的宽度(整体宽度默认100%)。

import Input from '@/input'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="inputDemoCss">
                <ct-input value="{= value =}" label="示例：" fixed labelWidth="80"></ct-input>
            </div>
            <div class="inputDemoCss">
                <ct-input value="{= value =}" label="示例：" labelWidth="80" labelAlign="right" ></ct-input>
            </div>
            <div class="inputDemoCss">
                <ct-input value="{= value =}" label="示例：" fixed ></ct-input>
            </div>
            <div class="inputDemoCss">
                <ct-input value="{= value =}" label="示例："  ></ct-input>
            </div>
        </template>
    \`,
    initData () {
        return {
            value:''
        }
    },
    components: {
        'ct-input': Input
    }
})

```


```san 查找功能：search

import Input from '@/input'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="inputDemoCss">
                <ct-input value="{= value =}" type="search"  clearable></ct-input>
            </div>
        </template>
    \`,
    initData () {
        return {
            value:''
        }
    },
    components: {
        'ct-input': Input
    }
})

```

```san 前置标签slot：prepend,后置标签slot:append

import Input from '@/input'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="inputDemoCss">
                <ct-input value="{= value =}"  clearable>
                    <span slot="prepend">prepend</span>
                </ct-input>
            </div>
             <div class="inputDemoCss">
                <ct-input value="{= value =}" clearable>
                    <span slot="append">append</span>
                </ct-input>
            </div>
            <div class="inputDemoCss">
                <ct-input value="{= value =}" clearable>
                    <span slot="prepend">prepend</span>
                    <span slot="append">append</span>
                </ct-input>
            </div>
        </template>
    \`,
    initData () {
        return {
            value:''
        }
    },
    components: {
        'ct-input': Input
    }
})

```

```san 自动获取焦点

import Input from '@/input'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="inputDemoCss">
                <ct-input value="{= value =}" autofocus></ct-input>
            </div>
        </template>
    \`,
    initData () {
        return {
            value:''
        }
    },
    components: {
        'ct-input': Input
    }
})

```

```san 手动获取焦点，通过自带的focus方法，手动聚焦

import Input from '@/input'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="inputDemoCss">
                <ct-input value="{= value =}" s-ref="thisFocusInput"></ct-input>
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
        this.ref('thisFocusInput').focus()
    },
    handleBlur(){
        this.ref('thisFocusInput').blur()
    },
    components: {
        'ct-input': Input
    }
})

```

```san 密码框

import Input from '@/input'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="inputDemoCss">
               <ct-input value="{= value =}"  type="password" visibilityToggle></ct-input>
            </div>
            <div class="inputDemoCss">
               <ct-input value="{= value =}"  type="password" visibilityToggle clearable></ct-input>
            </div>
        </template>
    \`,
    initData () {
        return {
            value:''
        }
    },
    components: {
        'ct-input': Input
    }
})

```

### Props

| 名称 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| type | `String` | input的类型，可选`text`、`search`、`password`，为`search`或者`password`时，`oneIcon`强制为`false` | `text` |
| value	 | `String` 、 `Number` | input的数值（双向绑定） | `无` |
| readonly	 | `Boolean`| 是否是只读状态 | `false` |
| disabled	 | `Boolean`| 是否禁用 | `false` |
| maxlength	 | `String` 、 `Number`| input文本字段中允许的最大字符数 | `Infinity` |
| size	 | `String`| input框的型号，可选`large`、`normal`、`small` | `normal` |
| placeholder	 | `String`| 占位文本 | `请输入` |
| autofocus	 | `Boolean`| 是否自动获取焦点 | `false` |
| visibilityToggle	 | `Boolean`| 是否显示密码切换按钮 | `false` |
| clearable	 | `Boolean`| 是否显示清空按钮 | `false` |
| prefix	 | `String`| 前缀图标，因为没有`icon`，所以写了一个`test`版本 | `无` |
| suffix	 | `String`| 后缀图标，因为没有`icon`，所以写了一个`test`版本 | `无` |
| label	 | `String`| input前的说明文字,若`fixed`为`true`，则优先级比`slot`中的`prepend`高 | `无` |
| labelAlign	 | `String`| input前说明文字的对齐方式，可选：`left`、`center`、`right`| `center` |
| labelWidth	 | `String`| input前的说明文字的宽度| `auto` |
| width	 | `String`、`Number`| 宽度，支持像素和百分比。`fixed`为`false`时指代`input框`的宽度；`fixed`为`true`时指代 `整体input` 的宽度 | `100%` |
| fixed	 | `Boolean`| input的搭配文字的两种样式类型，为`true`时，`label`为灰色背景且具有边框，和`input`为一个整体，`width`来设置 `整体input` 的宽度；为`false`时，`label`自己作为一个单独的个体，可设置通过`width`来设置`input框`的宽度 | `false` |
| oneIcon	 | `Boolean`| 若设置为`false`，则`clearIcon`和`suffix`会同时展示，默认为true，只会展示一个。当`type`为`search`或`password`的时候，会强制为`false`| `true` |
| autocomplete	 | `Boolean`| 是否启用自动完成功能。当用户在字段开始键入时，浏览器基于之前键入过的值，显示出在字段中填写的选项。需要搭配`name`使用 | `true` |
| spellcheck	 | `Boolean`| 是否对元素内容进行拼写检查 | `true` |
| name	 | `String`| 原生的name属性 | `无` |

### Events

| 名称 |描述 | 返回值 |
| --- |  --- | --- |
| on-change	 | `数据改变`时触发 | `$event` |
| on-enter	 | 按下`回车键`时触发 | `value` |
| on-focus	 | 输入框`聚焦`时触发 | `$event` |
| on-blur	 | 输入框`失焦`时触发 | `$event` |
| on-keyup	 | 原生的 `keyup` 事件 | `$event` |
| on-keydown	 | 原生的 `keydown` 事件 | `$event` |
| on-keypress	 | 原生的 `keypress` 事件 | `$event` |
| on-clear	 | 设置 `clearable` 时可用，点击清空按钮时触发 | `无` |
| on-search	 | 开启 `search` 时可用，`点击搜索`或`按下回车键`时触发 | `value` |
| on-click-suffix | `suffix`有值时可用，点击`suffix`区域时触发 | `value` |
| on-click-prefix | `prefix`有值时可用，点击`prefix`区域时触发 | `value` |


### Slot
| 名称 |描述 |
| --- |  --- |
| prefix	 | 输入框头部图标 |
| suffix	 | 输入框尾部图标 |
| prepend	 | 前置内容 |
| append	 | 后置内容 |

### Methods
| 方法名 |描述 | 参数 |
| --- |  --- | --- |
| focus	 | 手动使`input`获取焦点 | `无` |
| blur	 | 手动使`input`失去焦点 | `无` |




