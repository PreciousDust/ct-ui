/**
 * Created by gaoguoqing on 2019/5/31.
 *
 */
import san from 'san'
import tableMixin from './tableMixin'
import tableTr from './table-tr'
import tableCell from './table-cell'
import mixin from '../../utils/mixin'

const {deepCopy} = require('../../utils/assist')
const {getVisibleColumns} = require('./utils')
const DataTypes = san.DataTypes

module.exports = mixin(san.defineComponent({
    template: `
        <table style="{{styles}}" cellspacing="0" cellpadding="0" border="0">
            <colgroup>
                <col s-for="column in visibleColumns" key="{{column.key}}" width="{{setCellWidth(column)}}">
            </colgroup>
            <tbody>
                <template s-for="row, index in data">
                     <table-tr
                        row="{{row}}"
                        on-click="native:clickCurrentRow(index)"
                        on-dblclick="native:dblclickCurrentRow(index)"
                        prefix-cls="{{prefixCls}}">
                        <td
                            s-for="column,_index in cellColumns[index]"
                            colspan="{{cellColspan(row,column)}}"
                            rowspan="{{cellRowspan(row,column)}}"
                            class="{{alignCls(column, row)}}">
                             <table-cell
                                prefix-cls="{{prefixCls}}"
                                row="{{row}}"
                                checked="{{row._checked}}"
                                index="{{row._index}}"
                                disabled="{{row._disabled}}"
                                column="{{column}}"
                            ></table-cell>
                        </td>
                    </table-tr>
                </template>
            </tbody>
        </table>
    `,
    components: {
        'table-tr': tableTr,
        'table-cell': tableCell
    },
    initData () {
        return {
            visibleColumns: []
        }
    },
    dataTypes: {
        bodyStyle: DataTypes.object,
        columns: DataTypes.array,
        cloneColumns: DataTypes.array,
        fixed: DataTypes.string,
        prefixCls: DataTypes.string
    },
    attached () {
        this.data.set('visibleColumns', getVisibleColumns(this.data.get('columns')))
        this.watch('columns', val => {
            this.data.set('visibleColumns', getVisibleColumns(this.data.get('columns')))
        })
    },
    clickCurrentRow (index) {
        this.dispatch('row-click', {
            index: index
        })
    },
    dblclickCurrentRow (index) {
        this.dispatch('row-dbclick', {
            index: index
        })
    },
    computed: {
        styles () {
            const style = Object.assign({}, this.bodyStyle)
            const width = parseInt(this.data.get('bodyStyle.width'))
            style.width = `${width}px`
            return style
        },
        cellColumns () {
            let data = this.data.get('data')
            let visibleColumns = this.data.get('visibleColumns')
            let columnArr = []
            data.forEach((row, rowIndex) => {
                let columnData = deepCopy(visibleColumns)
                for (let i in row) {
                    if (i === '_colspan') {
                        for (let j in row[i]) {
                            columnData.forEach((column, index) => {
                                if (column.key === j) {
                                    columnData.splice(index + 1, row[i][j] - 1)
                                }
                            })
                        }
                    }
                }
                data.forEach(function (item, index) {
                    if (index < rowIndex) {
                        for (let i in item) {
                            if (i === '_rowspan') {
                                for (let j in item[i]) {
                                    if (rowIndex < index + item[i][j]) {
                                        columnData.forEach((column, z) => {
                                            if (column.key === j) {
                                                columnData.splice(z, 1)
                                            }
                                        })
                                    }
                                }
                            }
                        }
                    }
                })
                columnArr.push(columnData)
            })
            return columnArr
        }
    }
}), tableMixin)
