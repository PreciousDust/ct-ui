const san = require('san')
const { prefix } = require('../../utils/common')
const prefixCls = `${prefix}breadcrumb-item`

module.exports = san.defineComponent({
    name: prefixCls,
    template: `
        <span>
            <span class="{{prefixCls}}-link {{lastClass}}">
                <slot></slot>
            </span>
            <span
                s-html="separator"
                class="{{prefixCls}}-separator {{lastClass}}">
            </span>
        </span>
    `,
    initData () {
        return {
            prefixCls,
            spearator: '',
            lastClass: ''
        }
    }
})
