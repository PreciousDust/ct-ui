const san = require('san')
const { DataTypes } = require('san')
const { prefix } = require('../../utils/common')
const prefixCls = `${prefix}tab-pane`

module.exports = san.defineComponent({
    name: prefixCls,
    template: `
        <div class="{{prefixCls}}" s-if="position === active">
            <slot></slot>
        </div>
    `,
    dataTypes: {
        label: DataTypes.string.isRequired,
        disabled: DataTypes.bool,
        icon: DataTypes.string
    },
    initData () {
        return {
            prefixCls,
            position: 0,
            active: 0,
            // Props
            disabled: false
        }
    }
})
