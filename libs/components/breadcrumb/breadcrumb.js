const san = require('san')
const { DataTypes } = require('san')
const { prefix } = require('../../utils/common')
const { findSlotNodeComponentsDownward } = require('../../utils/findComponents')
const prefixCls = `${prefix}breadcrumb`

module.exports = san.defineComponent({
    template: `
        <div class="{{prefixCls}}">
            <slot></slot>
        </div>
    `,
    dataTypes: {
        separator: DataTypes.string
    },
    initData () {
        return {
            prefixCls,
            separator: '/'
        }
    },
    attached () {
        this.updateChildren()
    },
    updateChildren () {
        const { separator } = this.data.get()
        const childrens = findSlotNodeComponentsDownward(this, `${prefixCls}-item`)
        childrens.forEach((child, i) => {
            child.data.set('separator', separator)
            if (i === childrens.length - 1) {
                child.data.set('lastClass', 'last-child')
            }
        })
    }
})
