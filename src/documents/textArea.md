# textarea

基本表单组件，并在原生控件基础上进行了功能扩展，可以组合使用。


```san 基础用法

import Textarea from '@/textarea'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="textareaDemoCss">
                <ct-textarea value="{= value =}"  ></ct-textarea>
            </div>
        </template>
    \`,
    initData () {
        return {
            value:''
        }
    },
    components: {
        'ct-textarea': Textarea
    }
})

```

```san disabled 和 readonly

import Textarea from '@/textarea'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="textareaDemoCss">
                <ct-textarea value="disabled"  disabled></ct-textarea>
                <ct-textarea value="readonly"  readonly></ct-textarea>
            </div>
        </template>
    \`,
    initData () {
        return {
        }
    },
    components: {
        'ct-textarea': Textarea
    }
})

```

```san placeHolder:占位文本

import Textarea from '@/textarea'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="textareaDemoCss">
                <ct-textarea value="{= value =}" placeholder={{placeholder}}></ct-textarea>
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
        'ct-textarea': Textarea
    }
})

```

```san 自动获取焦点

import Textarea from '@/textarea'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="textareaDemoCss">
                <ct-textarea value="{= value =}" autofocus></ct-textarea>
            </div>
        </template>
    \`,
    initData () {
        return {
            value:''
        }
    },
    components: {
        'ct-textarea': Textarea
    }
})

```

```san 手动获取焦点，通过自带的focus方法，手动聚焦

import Textarea from '@/textarea'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div class="textareaDemoCss">
                <ct-textarea value="{= value =}" s-ref="thisFocusTextarea"></ct-textarea>
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
        this.ref('thisFocusTextarea').focus()
    },
    handleBlur(){
        this.ref('thisFocusTextarea').blur()
    },
    components: {
        'ct-textarea': Textarea
    }
})

```

```san rows：设置文本区内的可见行数

   import Textarea from '@/textarea'

   module.exports = san.defineComponent({
       template: \`
           <template>
               <div class="textareaDemoCss">
                   <ct-textarea value="{= value =}" rows="4" ></ct-textarea>
               </div>
           </template>
       \`,
       initData () {
           return {
               value:'测试rows=4测试rows=4测试rows=4测试rows=4测试rows=4测试rows=4测试rows=4测试rows=4测试rows=4测试rows=4测试rows=4测试rows=4测试rows=4测试rows=4测试rows=4测试rows=4测试rows=4测试rows=4测试rows=4测试rows=4测试rows=4测试rows=4测试rows=4测试rows=4测试rows=4测试rows=4测试rows=4'
           }
       },
       components: {
           'ct-textarea': Textarea
       }
   })

   ```

   ```san clearable：清空功能

   import Textarea from '@/textarea'

   module.exports = san.defineComponent({
       template: \`
           <template>
               <div class="textareaDemoCss">
                   <ct-textarea value="{= value =}"  clearable></ct-textarea>
               </div>
           </template>
       \`,
       initData () {
           return {
                value:'qeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqxqeqeqeqx'
            }
       },
       components: {
           'ct-textarea': Textarea
       }
   })

   ```


### Props

| 名称 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| value	 | `String` 、 `Number` | input的数值（双向绑定） | `无` |
| readonly	 | `Boolean`| 是否是只读状态 | `false` |
| disabled	 | `Boolean`| 是否禁用 | `false` |
| maxlength	 | `String` 、 `Number`| input文本字段中允许的最大字符数 | `Infinity` |
| placeholder	 | `String`| 占位文本 | `请输入` |
| autofocus	 | `Boolean`| 是否自动获取焦点 | `false` |
| rows	 | `Number`| 文本区内的可见行数 | `2` |
| wrap	 | `String`| `Html 5`生效，当在表单中提交时，文本区域中的文本如何换行,可选 `hard` 、 `soft` | `soft` |
| clearable	 | `Boolean`| 是否显示清空按钮 | `false` |
| width	 | `String`、`Number`| 宽度，支持像素和百分比 | `100%` |



### Events

| 名称 |描述 | 返回值 |
| --- |  --- | --- |
| on-blur	 | 输入框`失焦`时触发 | `$event` |
| on-change	 | `数据改变`时触发 | `$event` |
| on-enter	 | 按下`回车键`时触发 | `value` |
| on-focus	 | 输入框`聚焦`时触发 | `$event` |
| on-keyup	 | 原生的 `keyup` 事件 | `$event` |
| on-keydown	 | 原生的 `keydown` 事件 | `$event` |
| on-keypress	 | 原生的 `keypress` 事件 | `$event` |
| on-clear	 | 设置 `clearable` 时可用，点击清空按钮时触发 | `无` |

### Methods
| 方法名 |描述 | 参数 |
| --- |  --- | --- |
| focus	 | 手动使`textarea`获取焦点 | `无` |
| blur	 | 手动使`textarea`失去焦点 | `无` |


