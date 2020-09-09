import san from 'san'
import { prefix } from '../../utils/common'
import { bindReference } from '../../utils/poper'
import { transferIndex, transferIncrease } from '../../utils/transfer-queue.js'
const DataTypes = san.DataTypes
const prefixCls = prefix + 'drop'

module.exports = san.defineComponent({
    template: `
        <div class="{{cssList}}" style="{{styles}}"
        >
        <slot></slot>
        </div>
    `,
    initData () {
        return {
            placement: 'bottom-start',
            className: '',
            transfer: false,
            width: '',
            tIndex: this.handleGetIndex()
        }
    },
    dataTypes: {
        placement: DataTypes.string,
        className: DataTypes.string,
        transfer: DataTypes.bool
    },
    computed: {
        cssList () {
            let className = this.data.get('className')
            return [`${prefixCls}`, `${className}`]
        },
        styles () {
            // 处理width，支持数字和字符串
            let width = this.data.get('width')
            width = +width ? width + 'px' : width
            let transfer = this.data.get('transfer')
            let tIndex = this.data.get('tIndex')
            let style = {}
            if (width) style['min-width'] = width
            if (transfer) style['z-index'] = 1060 + tIndex
            return style
        }
    },
    attached () {
        this.updatePopper()
    },
    updated () {
        this.updatePopper()
    },
    updatePopper () {
        setTimeout(() => {
            let parent = this.owner
            let reference = parent.ref('reference')
            let dropDown = this.el
            let placement = this.data.get('placement')
            bindReference(reference, dropDown, placement, parent.el)
            this.tIndex = this.handleGetIndex()
        }, 1)
    },
    handleGetIndex () {
        transferIncrease()
        return transferIndex
    }
})
