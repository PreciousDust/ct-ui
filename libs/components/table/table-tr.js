/**
 * Created by gaoguoqing on 2019/5/31.
 *
 */
import san from 'san'

const DataTypes = san.DataTypes

module.exports = san.defineComponent({
    template: `
    <tr class="{{rowCls}}">
        <slot></slot>
     </tr>
    `,
    dataTypes: {
        row: DataTypes.object,
        prefixCls: DataTypes.string
    },
    computed: {
        rowCls () {
            let row = this.data.get('row')
            let prefixCls = this.data.get('prefixCls')
            let classArr = []
            if (row._className) classArr.push(`${row._className}`)
            if (row._isHover) classArr.push(`${prefixCls}-row-hover`)
            if (row._isHighlight) classArr.push(`${prefixCls}-row-highlight`)
            return classArr
        }
    }
})
