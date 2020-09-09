# Checkbox 多选框

基本组件-多选框。主要用于一组可多选项项选择，或者单独用于切换到选中状态。


单独使用时 通过checked双向绑定 返回true 或 false
```san 单独使用示例
import checkbox from '@/checkbox/checkbox'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div>
                <b-checkbox on-change='change' checked='{= checked =}'>海洋</b-checkbox>
                <span>{{checked}}</span>
            </div>
        </template>
    \`,
    initData() {
        return {
            checked: true
        }
    },
    components: {
        'b-checkbox': checkbox
    },
    change(e){
        console.log(e)
    }
})
```

组合使用时 设置相同的name、不同的value 通过checked实现双向绑定
```san 组合使用示例
import checkbox from '@/checkbox/checkbox'

module.exports = san.defineComponent({
    template: \`
        <template>
            <div>
                <b-checkbox name='s' value='sea' checked='{= checked =}'>海洋</b-checkbox>
                <b-checkbox name='s' value='land' checked='{= checked =}'>大地</b-checkbox>
                <b-checkbox name='s' value='sky' checked='{= checked =}'>天空</b-checkbox>
                <span>{{checked}}</span>
            </div>
        </template>
    \`,
    initData() {
        return {
            checked: ['sea']
        }
    },
    components: {
        'b-checkbox': checkbox
    },
    change(e){
        console.log(e)
    }
})
```

组合使用时 设置相同的name、不同的value 通过checked实现双向绑定
```san checkbox-group 组合使用示例
import checkbox from '@/checkbox/checkbox'
import checkboxGroup from '@/checkbox/checkbox-group'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-checkbox-group name='s' checked='{= checked =}'>
                <b-checkbox value='sea'>海洋</b-checkbox>
                <b-checkbox value='land'>大地</b-checkbox>
                <b-checkbox value='sky'>天空</b-checkbox>
                <span>{{checked}}</span>
            </b-checkbox-group>
        </template>
    \`,
    initData() {
        return {
            checked: ['sea']
        }
    },
    components: {
        'b-checkbox': checkbox,
        'b-checkbox-group': checkboxGroup
    },
    change(e){
        console.log(e)
    }
})
```

在实现全选效果时，你可能会用到 indeterminate 属性。
```san checkbox-group 全选
import checkbox from '@/checkbox/checkbox'
import checkboxGroup from '@/checkbox/checkbox-group'

module.exports = san.defineComponent({
    template: \`
        <template>
             <b-checkbox on-change='change' checked='{= checkAll =}' indeterminate='{= indeterminate =}'>海洋</b-checkbox>
            <b-checkbox-group name='s' checked='{= checked =}' on-change="checkAllGroupChange">
                <b-checkbox value='sea'>海洋</b-checkbox>
                <b-checkbox value='land'>大地</b-checkbox>
                <b-checkbox value='sky'>天空</b-checkbox>
                <span>{{checked}}</span>
            </b-checkbox-group>
        </template>
    \`,
    initData() {
        return {
            checked: ['sea'],
            checkAll: false,
            indeterminate: true
        }
    },
    components: {
        'b-checkbox': checkbox,
        'b-checkbox-group': checkboxGroup
    },
    change () {
        if (this.data.get('indeterminate')) {
            this.data.set('checkAll', false)
        } else {
            this.data.set('checkAll', !this.data.get('checkAll'))
        }
        this.data.set('indeterminate', false)
        if (this.data.get('checkAll')) {
            this.data.set('checked', ['sea', 'land', 'sky'])
        } else {
            this.data.set('checked', [])
        }
    },
    checkAllGroupChange (data) {
        if (data.length === 3) {
            this.data.set('indeterminate', false)
            this.data.set('checkAll', true)
        } else if (data.length > 0) {
            this.data.set('indeterminate', true)
            this.data.set('checkAll', false)
        } else {
            this.data.set('indeterminate', false)
            this.data.set('checkAll', false)
        }
    }
})
```

### Checkbox props
| 参数      | 说明    | 类型      |  默认值   |
|---------- |-------- |---------- |-------- |
|checked	| 单独使用时返回 true或false 多个checkbox使用返回选中的checkbox的value值的数组 参考原生|	String、Boolean | - |
|value	|当前的radio的value值 参考原生|	String,Number|	-|
|label	|当前radio的展示文字|	String,Number|	-|
|name	|当前radio的name 参考原生|	String |	-|
|disabled|	是否禁用当前项	|Boolean|	false|
|size	|单选框的尺寸，可选值为 large、small、default 或者不设置|	String	| - |

### Checkbox events
| 事件名	      | 说明	    | 返回值 |
|---------- |-------- |---------- |
| on-change     |  在选项状态发生改变时触发，返回当前选中的项。通过修改外部的数据改变时不会触发 |  checked |

### Checkbox-Group props
| 参数      | 说明    | 类型      |  默认值   |
|---------- |-------- |---------- |-------- |
|checked	| 返回选中的checkbox的value值的数组| Array | - |
|name	|当前radio的name 参考原生|	String |	-|
|disabled|	是否禁用当前项	|Boolean|	false|
|size	|单选框的尺寸，可选值为 large、small、default 或者不设置|	String	| default |

### Checkbox-Group events
| 事件名	      | 说明	    | 返回值 |
|---------- |-------- |---------- |
| on-change     |  在选项状态发生改变时触发，返回当前选中的项。通过修改外部的数据改变时不会触发  | checked|
