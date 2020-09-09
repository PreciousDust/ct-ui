import san from 'san'
import {findComponentsDownward} from '../../utils/findComponents'

const { DataTypes } = require('san')
const prefix = require('../../utils/common').prefix
const prefixCls = prefix + 'radio-group'
const radioPrefixCls = prefix + 'radio'
let seed = 0
const now = new Date().getTime()
const getUuid = () => `${now}_${seed++}`

module.exports = san.defineComponent({
    template: `
        <div class="{{classes}}" name="{{name}}" checked='{= checked =}'>
            <slot></slot>
        </div>
    `,
    initData () {
        return {
            // props
            size: 'default',
            type: true,
            vertical: false,
            name: getUuid,
            checked: '',
            // data
            prefixCls,
            radioPrefixCls
        }
    },
    dataTypes: {
        size: DataTypes.oneOf(['small', 'large', 'default']),
        name: DataTypes.string,
        type: DataTypes.bool,
        vertical: DataTypes.bool,
        disabled: DataTypes.bool,
        checked: DataTypes.oneOfType([DataTypes.string, DataTypes.number, DataTypes.bool])
    },
    computed: {
        classes () {
            let obj = [
                `${prefixCls}`,
                `${prefixCls}-${this.data.get('size')}`,
                `${radioPrefixCls}-${this.data.get('size')}`,
                this.data.get('type') ? `${prefixCls}-button` : '',
                this.data.get('vertical') ? `${prefixCls}-vertical` : ''
            ]
            return obj
        }
    },
    attached () {
        this.updateValue(item => {
            item.data.set('group', true)
            item.data.set('disabled', this.data.get('disabled'))
            item.data.set('name', this.data.get('name'))
        })
        this.watch('checked', val => {
            this.updateValue()
        })
    },
    updateValue (fn) {
        let child = findComponentsDownward(this, radioPrefixCls) || []
        if (child.length) {
            child.forEach(item => {
                fn && fn(item)
                item.data.set('checked', this.data.get('checked'))
            })
        }
        !fn && this.fire('change', this.data.get('checked'))
    },
    messages: {
        [radioPrefixCls + ':radio-change']: function (arg) {
            this.data.set('checked', arg.value)
            this.updateValue()
        }
    }
})
