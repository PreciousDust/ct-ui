import san from 'san'
const { DataTypes } = require('san')
const prefix = require('../../utils/common').prefix
const prefixCls = prefix + 'radio'

module.exports = san.defineComponent({
    name: prefixCls,
    template: `
        <label class="{{wrapClasses}}">
            <span class="{{radioClasses}}">
                <span class="{{innerClasses}}"></span>
                <input
                    type="radio"
                    class="{{inputClasses}}"
                    disabled="{{disabled}}"
                    checked="{= checked =}"
                    value='{{value}}'
                    name="{{name}}"
                    on-change='change'
                    on-click='blur'/>
            </span>
            <slot>{{ label }}</slot>
        </label>
    `,
    initData () {
        return {
            // props
            value: true,
            label: '',
            disabled: false,
            size: 'default',
            name: '',
            // data
            prefixCls,
            clicked: true,
            group: false,
            focusWrapper: false,
            focusInner: false
        }
    },
    dataTypes: {
        value: DataTypes.oneOfType([DataTypes.string, DataTypes.number, DataTypes.bool]),
        checked: DataTypes.oneOfType([DataTypes.string, DataTypes.number, DataTypes.bool]),
        label: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        disabled: DataTypes.bool,
        size: DataTypes.oneOf(['small', 'large', 'default']),
        name: DataTypes.string
    },
    computed: {
        wrapClasses () {
            let obj = [
                `${prefixCls}-wrapper`,
                `${prefixCls}-${this.data.get('size')}`,
                this.data.get('group') ? `${prefixCls}-group-item` : '',
                this.data.get('initChecked') ? `${prefixCls}-wrapper-checked` : '',
                this.data.get('disabled') ? `${prefixCls}-wrapper-disabled` : '',
                this.data.get('focusWrapper') ? `${prefixCls}-focus` : ''
            ]
            return obj
        },
        radioClasses () {
            let obj = [
                `${prefixCls}`,
                this.data.get('initChecked') ? `${prefixCls}-checked` : '',
                this.data.get('disabled') ? `${prefixCls}-disabled` : ''
            ]
            return obj
        },
        innerClasses () {
            let obj = [
                `${prefixCls}-inner`,
                this.data.get('focusInner') ? `${prefixCls}-focus` : ''
            ]
            return obj
        },
        inputClasses () {
            return `${prefixCls}-input`
        },
        initChecked () {
            return this.data.get('checked') === this.data.get('value') || this.data.get('checked') === true || this.data.get('checked') === 'true'
        }
    },
    change () {
        let { disabled, group } = this.data.get()
        if (disabled) {
            return false
        }
        if (group) {
            if (this.data.get('checked') !== undefined) {
                setTimeout(_ => {
                    this.dispatch(prefixCls + ':radio-change', this.data.get('value'))
                }, 10)
            }
        } else {
            this.fire('change', this.data.get('checked'))
        }
    },
    blur () {
        // 兼容IE8下的radio不失去焦点不触发change事件
        this.el.querySelector('input[type="radio"]').blur()
    }
})
