import san from 'san'
import { typeOf, prefix } from '../../utils/common'
const { DataTypes } = require('san')
const prefixCls = prefix + 'checkbox'

module.exports = san.defineComponent({
    name: prefixCls,
    template: `
        <label class="{{warpCls}}">
            <span class="{{checkbboxLeftClass}}">
                <span class="{{innerCls}}"></span>
                <input
                    class="{{prefixCls + '-input'}}"
                    type="checkbox"
                    value="{{value}}"
                    name="{{name}}"
                    checked="{= checked =}"
                    disabled="{{disabled}}"
                    on-click="change"/>
            </span>
            <span class='{{labelClass}}'><slot>{{label}}</slot></span>
        </label>
    `,
    initData () {
        return {
            // props
            value: '-',
            disabled: false,
            label: '',
            size: 'default',
            name: '',
            indeterminate: false,
            // data
            prefixCls,
            group: false
        }
    },
    dataTypes: {
        value: DataTypes.oneOfType([DataTypes.string, DataTypes.number, DataTypes.bool]),
        checked: DataTypes.oneOfType([DataTypes.string, DataTypes.number, DataTypes.bool, DataTypes.array]),
        disabled: DataTypes.bool,
        indeterminate: DataTypes.bool,
        label: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        size: DataTypes.oneOf(['small', 'large', 'default']),
        name: DataTypes.string
    },
    computed: {
        checkbboxLeftClass () {
            let obj = [
                `${prefixCls}`,
                `${prefixCls}-${this.data.get('size')}`,
                this.data.get('initChecked') ? `${prefixCls}-checked` : '',
                this.data.get('disabled') ? `${prefixCls}-disabled` : '',
                this.data.get('indeterminate') ? `${prefixCls}-indeterminate` : ''
            ]
            return obj
        },
        labelClass () {
            return [
                `${prefixCls}-label`
            ]
        },
        innerCls () {
            return [
                `${prefixCls}-inner`
            ]
        },
        warpCls () {
            return [
                `${prefixCls}-warpper`
            ]
        },
        initChecked () {
            let checked = this.data.get('checked')
            let value = this.data.get('value')
            if (typeOf(checked) === 'array') {
                return checked.indexOf(value) > -1
            } else {
                return checked
            }
        }
    },
    change () {
        let { disabled, value, checked, group } = this.data.get()
        if (disabled) return
        if (value === '-' || typeOf(checked) !== 'array') {
            this.data.set('checked', !checked)
        }
        if (group) {
            if (this.data.get('checked') !== undefined) {
                setTimeout(_ => {
                    this.dispatch(prefixCls + ':checkbox-change', this.data.get('checked'))
                }, 10)
            }
        } else {
            this.fire('change', this.data.get('checked'))
        }
    }
})
