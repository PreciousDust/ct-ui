/**
 * Created by gaoguoqing on 2019/5/28.
 *
 */
import san from 'san'
import tableMixin from './tableMixin'
import Checkbox from '../checkbox/checkbox'
import mixin from '../../utils/mixin'

const DataTypes = san.DataTypes
const {getVisibleColumns} = require('./utils')

module.exports = mixin(san.defineComponent({
    // todo s-for里面的 key 值如果不写的话 width不会正常更新
    template: `
        <table cellspacing="0" cellpadding="0" border="0" style="{{styles}}">
            <colgroup>
                <col s-for="column in visibleColumns" key="{{column.key}}" width="{{setCellWidth(column)}}">
                <col s-if="verticalScroll" width="{{scrollBarWidth}}"/>
            </colgroup>
            <thead>
                <tr s-for="columns, rowIndex in groupRows" key="{{rowIndex}}">
                    <th
                        s-for="item,index in columns"
                        key="{{index}}"
                        rowspan="{{item.rowSpan || 1}}"
                        colspan="{{item.colSpan || 1}}"
                        class="{{alignCls(item)}}"
                    >
                        <div class="{{cellCls}}">
                             <template s-if="item.type === 'selection'">
                                <table-checkbox
                                    checked='{{isSelectAll}}'
                                    disabled="{{!data.length}}"
                                    on-change="selectAll"
                                >
                                </table-checkbox>
                            </template>
                            <template s-else>
                                <span
                                    class="{{item.sortable ? prefixCls +'-cell-sort' : ''}}">
                                    {{ item.title }}
                                </span>
                                <span class="{{prefixCls +'-sort'}}" s-if="item.sortable">
                                    <i  class="{{prefixCls +'-sort-arrow '}}{{prefixCls +'-sort-asc '}}{{item._sortType==='asc' ?  prefixCls+'-sort-asc-active' : ''}}"
                                        on-click="sortHandle(rowIndex,index, 'asc')"></i>
                                    <i  class="{{prefixCls +'-sort-arrow '}}{{prefixCls +'-sort-desc '}}{{item._sortType==='desc' ?  prefixCls+'-sort-desc-active' : ''}}"
                                        on-click="sortHandle(rowIndex,index, 'desc')"></i>
                                </span>
                            </template>
                        </div>
                    </th>
                    <th s-if="verticalScroll"></th>
                </tr>
            </thead>
        </table>
    `,
    components: {
        'table-checkbox': Checkbox
    },
    initData () {
        return {
            visibleColumns: []
        }
    },
    dataTypes: {
        headerStyle: DataTypes.object,
        columns: DataTypes.array,
        data: DataTypes.array,
        columnRows: DataTypes.array,
        fixedColumnRows: DataTypes.array,
        fixed: DataTypes.string,
        scrollBarWidth: DataTypes.number,
        verticalScroll: DataTypes.bool,
        prefixCls: DataTypes.string
    },
    attached () {
        this.data.set('visibleColumns', getVisibleColumns(this.data.get('columns')))
        this.watch('columns', val => {
            this.data.set('visibleColumns', val)
        })
    },
    selectAll (status) {
        let {data} = this.data.get('')
        if (!data.length) return
        this.dispatch('check-all-change', {
            status: status
        })
    },
    iconCls (type, index, rowIndex) {
        let prefixCls = this.data.get('prefixCls')
        let item = this.getColumn(rowIndex, index)
        let classArr = []
        classArr.push(`${prefixCls}-sort-${type}`)
        if (item._sortType === type) classArr.push(`${prefixCls}-sort-arrow-active`)
        return classArr
    },
    sortHandle (rowIndex, index, type) {
        this.dispatch('sort-change', {
            index: this.getColumn(rowIndex, index)._index,
            type: type,
            _rowIndex: rowIndex,
            _index: index
        })
    },
    getColumn (rowIndex, index) {
        let {isGroup, columns, groupRows} = this.data.get('')
        if (isGroup) {
            const id = groupRows[rowIndex][index].__id
            return columns.filter(item => item.__id === id)[0]
        } else {
            return groupRows[rowIndex][index]
        }
    },
    computed: {
        styles () {
            const style = Object.assign({}, this.headerStyle)
            const width = parseInt(this.data.get('headerStyle.width'))
            style.width = `${width}px`
            return style
        },
        groupRows () {
            let isGroup = this.data.get('isGroup')
            let fixed = this.data.get('fixed')
            let columnRows = this.data.get('columnRows')
            let fixedColumnRows = this.data.get('fixedColumnRows')
            if (isGroup) {
                return fixed ? fixedColumnRows : columnRows
            } else {
                return [this.data.get('visibleColumns')]
            }
        },
        cellCls () {
            return [
                `${this.data.get('prefixCls')}-cell`
            ]
        },
        isSelectAll () {
            let status = true
            let data = this.data.get('data')
            if (!data.length) status = false
            // if (!data.find(item => !item._disabled)) status = false
            for (let i = 0; i < data.length; i++) {
                if (!data[i]._checked && !data[i]._disabled) {
                    status = false
                    break
                }
            }
            return status
        },
        isGroup () {
            let columnRows = this.data.get('columnRows')
            return columnRows && columnRows.length > 1
        }
    }
}), tableMixin)
