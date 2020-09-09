
import san from 'san'

const DataTypes = san.DataTypes
const prefix = require('../../utils/common').prefix
const prefixCls = prefix + 'icon'

module.exports = san.defineComponent({
    template: `
     <i
        class="{{typeClass}}"
        style="{{styles}}"
        on-click="handleClick">
    </i>
    `,
    dataTypes: {
        type: DataTypes.string,
        size: DataTypes.oneOfType([
            DataTypes.string,
            DataTypes.number
        ]),
        color: DataTypes.string
    },
    handleClick (event) {
        this.fire('click', event)
    },
    computed: {
        typeClass () {
            let type = this.data.get('type')
            let classArr = [`${prefixCls}`, `icon iconfont`]
            if (type) classArr.push(`bw-${type}`)
            return classArr
        },
        styles () {
            let color = this.data.get('color')
            let size = this.data.get('size')
            let style = {}
            if (size) {
                style['font-size'] = `${size}px`
            }
            if (color) {
                style.color = color
            }
            return style
        }
    }
})
