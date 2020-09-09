const san = require('san')
const { DataTypes } = require('san')
const Icon = require('@/icon/icon')

const { findSlotNodeComponentsDownward } = require('../../utils/findComponents')
const { prefix } = require('../../utils/common')
const prefixCls = `${prefix}tabs`

module.exports = san.defineComponent({
    name: prefixCls,
    template: `
        <div class="{{prefixCls}}">
            <div class="{{prefixCls}}-nav">
                <div 
                    class="{{prefixCls}}-tab {{ item.disabled ? 'disabled' : '' }}"
                    s-for="item, index in panes"
                    on-click="handleClick(item, index)">
                    <span class="{{prefixCls}}-tab-icon" s-if="item.icon">
                        <b-icon type="{{item.icon}}"></b-icon>
                    </span>
                    <span class="{{prefixCls}}-tab-title">{{item.label}}</span>
                    <i class="{{prefixCls}}-tab-select {{ current === index ? 'active' : '' }}"></i>
                </div>
            </div>
            <slot></slot>
        </div>
    `,
    dataTypes: {
        current: DataTypes.number
    },
    initData () {
        return {
            prefixCls,
            panes: [],
            current: 0
        }
    },
    components: {
        'b-icon': Icon
    },
    attached () {
        const panes = findSlotNodeComponentsDownward(this, `${prefix}tab-pane`)
        const { current } = this.data.get()

        let arr = []
        panes.forEach((item, index) => {
            item.data.set('position', index)
            item.data.set('active', current)

            const { label, disabled, icon } = item.data.get()
            arr.push({ label, disabled, icon })
        })

        this.data.set('panes', arr)
    },
    handleClick (item, i) {
        const { current } = this.data.get()
        if (item.disabled || current === i) return

        this.data.set('current', i)

        const panes = findSlotNodeComponentsDownward(this, `${prefix}tab-pane`)
        panes.forEach(item => {
            item.data.set('active', i)
        })
    }
})
