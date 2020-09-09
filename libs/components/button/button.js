const san = require('san')
const { DataTypes } = require('san')

const { prefix } = require('../../utils/common')
const prefixCls = `${prefix}btn`

module.exports = san.defineComponent({
    template: `
        <button class="{{classes}}" disabled="{{disabled}}" on-click="handleClick">
            <span>
                <slot></slot>
            </span>
        </button>
    `,
    dataTypes: {
        disabled: DataTypes.bool,
        type: DataTypes.oneOf(['default', 'primary', 'text', 'info', 'success', 'warning', 'error', 'dashed']),
        shape: DataTypes.oneOf(['circle', 'circle-outline', '']),
        size: DataTypes.oneOf(['small', 'large', 'default']),
        loading: DataTypes.bool,
        icon: DataTypes.string,
        customIcon: DataTypes.string,
        long: DataTypes.bool,
        ghost: DataTypes.bool
    },
    initData () {
        return {
            prefixCls,
            // props
            disabled: false,
            type: 'default', // default, primary, dashed, text, info, success, warning, error
            size: 'default', // small, large, default
            long: false
        }
    },
    computed: {
        classes () {
            return [
                `${prefixCls}`,
                `${prefixCls}-${this.data.get('type')}`,
                this.data.get('long') ? `${prefixCls}-long` : '',
                this.data.get('size') !== 'default' ? `${prefixCls}-${this.data.get('size')}` : ''
                // {
                //     [`${prefixCls}-${this.shape}`]: !!this.shape,
                //     [`${prefixCls}-loading`]: this.loading != null && this.loading,
                //     [`${prefixCls}-icon-only`]: !this.showSlot && (!!this.icon || !!this.customIcon || this.loading),
                //     [`${prefixCls}-ghost`]: this.ghost
                // }
            ]
        }
    },
    handleClick (event) {
        this.fire('click', event)
    }
})
