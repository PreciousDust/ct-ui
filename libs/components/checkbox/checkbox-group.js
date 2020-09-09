import san from 'san'
import {findComponentsDownward} from '../../utils/findComponents'
const { DataTypes } = require('san')
const prefix = require('../../utils/common').prefix
const prefixCls = prefix + 'checkbox-group'
const checkboxPrefixCls = prefix + 'checkbox'

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
            name: '',
            checked: [],
            disabled: false,
            // data
            prefixCls,
            checkboxPrefixCls
        }
    },
    dataTypes: {
        size: DataTypes.oneOf(['small', 'large', 'default']),
        name: DataTypes.string,
        checked: DataTypes.array,
        disabled: DataTypes.bool
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
        let child = findComponentsDownward(this, checkboxPrefixCls) || []
        if (child.length) {
            child.forEach(item => {
                fn && fn(item)
                item.data.set('checked', this.data.get('checked'))
            })
        }
        !fn && this.fire('change', this.data.get('checked'))
    },
    messages: {
        [checkboxPrefixCls + ':checkbox-change']: function (arg) {
            this.data.set('checked', arg.value)
            this.updateValue()
        }
    }
})
