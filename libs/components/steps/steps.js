const san = require('san')
const { DataTypes } = require('san')
const { findSlotNodeComponentsDownward } = require('../../utils/findComponents')

const { prefix } = require('../../utils/common')
const prefixCls = `${prefix}steps`

function debounce (fn) {
    let waiting
    return function () {
        if (waiting) return
        waiting = true
        const context = this
        const args = arguments
        const later = function () {
            waiting = false
            fn.apply(context, args)
        }
        this.nextTick(later)
    }
}

module.exports = san.defineComponent({
    template: `
        <div s-ref="steps" class="{{classes}}">
            <slot></slot>
        </div>
    `,
    dataTypes: {
        current: DataTypes.number,
        status: DataTypes.oneOf(['wait', 'process', 'finish', 'error']),
        direction: DataTypes.oneOf(['horizontal', 'vertical']),
        size: DataTypes.oneOf(['small'])
    },
    initData () {
        return {
            status: 'process',
            current: 0,
            direction: 'horizontal'
        }
    },
    computed: {
        classes () {
            return [
                `${prefixCls}`,
                `${prefixCls}-${this.data.get('direction')}`,
                this.data.get('size') ? `${prefixCls}-${this.data.get('size')}` : ''
            ]
        }
    },
    messages: {
        [`${prefix}steps-set-next-error`]: function () {
            this.setNextError()
        },
        [`${prefix}steps-append`]: function () {
            this.debouncedAppendRemove()
        },
        [`${prefix}steps-remove`]: function () {
            this.debouncedAppendRemove()
        }
    },
    attached () {
        this.updateSteps()

        this.watch('current', val => {
            this.updateChildProps()
        })

        this.watch('status', val => {
            this.updateCurrent()
        })
    },
    updateChildProps (isInit) {
        const childs = findSlotNodeComponentsDownward(this, `${prefix}step`)
        const total = childs.length
        const direction = this.data.get('direction')
        const current = this.data.get('current')

        childs.forEach((child, index) => {
            child.data.set('stepNumber', index + 1)
            if (direction === 'horizontal') {
                child.data.set('total', total)
            }
            // 如果已存在status,且在初始化时,则略过
            // todo 如果当前是error,在current改变时需要处理
            if (!(isInit && child.data.get('currentStatus'))) {
                if (index === current) {
                    if (this.data.get('status') !== 'error') {
                        child.data.set('currentStatus', 'process')
                    }
                } else if (index < current) {
                    child.data.set('currentStatus', 'finish')
                } else {
                    child.data.set('currentStatus', 'wait')
                }
            }
            if (child.data.get('currentStatus') !== 'error' && index !== 0) {
                childs[index - 1].data.set('nextError', false)
            }
        })
    },
    updateCurrent (isInit) {
        // 防止溢出边界
        const childs = findSlotNodeComponentsDownward(this, `${prefix}step`)
        const current = this.data.get('current')
        const status = this.data.get('status')

        if (current < 0 || current >= childs.length) return

        if (isInit) {
            const currentStatus = childs[current].data.get('currentStatus')

            if (!currentStatus) {
                childs[current].data.set('currentStatus', status)
            }
        } else {
            childs[current].data.set('currentStatus', status)
        }
    },
    setNextError () {
        const childs = findSlotNodeComponentsDownward(this, `${prefix}step`)
        childs.forEach((child, index) => {
            if (child.data.get('currentStatus') === 'error' && index !== 0) {
                childs[index - 1].data.set('nextError', true)
            }
        })
    },
    debouncedAppendRemove () {
        return debounce(function () {
            this.updateSteps()
        })
    },
    updateSteps () {
        this.updateChildProps(true)
        this.setNextError()
        this.updateCurrent(true)
    }
})
