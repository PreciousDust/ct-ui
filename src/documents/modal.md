# Modal 对话框

基本组件-模态对话框，在浮层中显示，引导用户进行相关操作。

最简单的使用方法，通过控制属性show来显示 / 隐藏对话框。
```san 基础用法 
import Modal from '@/modal/modal'
import Button from '@/button/button'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-button on-click='click'>clickMe</b-button>
            <b-modal show='{= show =}'>
                <p>对话框。。。。。</p>
            </b-modal>
        </template>
    \`,
    initData () {
        return {
            show: false
        }
    },
    components: {
        'b-modal': Modal,
        'b-button': Button,
    },
    click () {
        this.data.set('show', true)
    }
})
```

设置title来显示modal的名称。
```san 基础用法 
import Modal from '@/modal/modal'
import Button from '@/button/button'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-button on-click='click'>clickMe</b-button>
            <b-modal title='Modal 对话框' show='{= show =}'>
                <p>设置title。</p>
            </b-modal>
        </template>
    \`,
    initData () {
        return {
            show: false
        }
    },
    components: {
        'b-modal': Modal,
        'b-button': Button,
    },
    click () {
        this.data.set('show', true)
    }
})
```

设置drag来设置modal的拖拽功能。
```san 基础用法 
import Modal from '@/modal/modal'
import Button from '@/button/button'

module.exports = san.defineComponent({
    template: \`
        <template>
            <b-button on-click='click'>clickMe</b-button>
            <b-modal drag='{{drag}}' show='{= show =}'>
                <p>设置drag。</p>
            </b-modal>
        </template>
    \`,
    initData () {
        return {
            show: false,
            drag: true
        }
    },
    components: {
        'b-modal': Modal,
        'b-button': Button,
    },
    click () {
        this.data.set('show', true)
    }
})
```

### Modal props
| 参数      | 说明    | 类型      |  默认值   |
|---------- |-------- |---------- |-------- |
|title	|  modal的title值|	String、Number | '弹窗名称' |
|show	| 控制modal的显示隐藏|Boolean|false|
|closable	|是否启用右上角的关闭按钮|Boolean	|true|
|width|	modal的宽度	|Number|620|
|drag	|是否开启拖拽功能|Boolean|true|

### Modal events
| 事件名	      | 说明	    | 返回值 |
|---------- |-------- |---------- |
| confirm  |  点击确认按钮触发   |  ...  |
| cancel  |  点击取消按钮触发   |  ...  |
| close  |  点击右上角图标关闭按钮触发   |  ...  |




