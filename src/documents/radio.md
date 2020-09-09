# Radio 单选框

基本组件-单选框。主要用于一组可选项单项选择，或者单独用于切换到选中状态。


单独使用时 通过checked双向绑定 返回true 或 false
```san 单独使用示例
import radio from '@/radio/radio'
import radioGroup from '@/radio/radio-group'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div>
                <b-radio on-change='change' checked='{= checked =}'>海洋</b-radio>
                <span>{{checked}}</span>
            </div>
        </template>
    \`,
    initData() {
        return {
            checked: false
        }
    },
    components: {
        'b-radio': radio
    },
    change(e){
        window.alert(e)
    }
})
```

组合使用时 设置相同的name、不同的value 通过checked实现双向绑定
```san 组合使用示例
import radio from '@/radio/radio'
import radioGroup from '@/radio/radio-group'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div>
                <b-radio name='s' value='sea' checked='{= checked =}'>海洋</b-radio>
                <b-radio name='s' value='land' checked='{= checked =}'>大地</b-radio>
                <b-radio name='s' value='sky' checked='{= checked =}'>天空</b-radio>
                <span>{{checked}}</span>
            </div>
        </template>
    \`,
    initData() {
        return {
            checked: 'sea'
        }
    },
    components: {
        'b-radio': radio
    }
})
```

组合使用时 设置相同的name、不同的value 通过checked实现双向绑定
```san radio-group 组合使用示例
import radio from '@/radio/radio'
import radioGroup from '@/radio/radio-group'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-radio-group name='s' checked='{= checked =}'>
                <b-radio value='sea'>海洋</b-radio>
                <b-radio value='land'>大地</b-radio>
                <b-radio value='sky'>天空</b-radio>
                <span>{{checked}}</span>
            </b-radio-group>
        </template>
    \`,
    initData() {
        return {
            checked: 'sea'
        }
    },
    components: {
        'b-radio': radio,
        'b-radio-group': radioGroup
    },
    change(e){
        console.log(e)
    }
})
```

### Radio props
| 参数      | 说明    | 类型      |  默认值   |
|---------- |-------- |---------- |-------- |
|checked	| 单独使用时返回 true或false 多个radio使用返回选中的radio的value值 参考原生|	String、Boolean | - |
|value	|当前的radio的value值 参考原生|	String,Number|	-|
|label	|当前radio的展示文字|	String,Number|	-|
|name	|当前radio的name 参考原生|	String |	-|
|disabled|	是否禁用当前项	|Boolean|	false|
|size	|单选框的尺寸，可选值为 large、small、default 或者不设置|	String	| - |

### Radio events
| 事件名	      | 说明	    | 返回值 |
|---------- |-------- |---------- |
| on-change     |  在选项状态发生改变时触发，返回当前选中的项。通过修改外部的数据改变时不会触发   |  ...  |
