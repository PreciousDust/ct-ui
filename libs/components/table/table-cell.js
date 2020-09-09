/**
 * Created by gaoguoqing on 2019/5/31.
 *
 */
import san from 'san'
import Checkbox from '../checkbox/checkbox'

const DataTypes = san.DataTypes

module.exports = san.defineComponent({
    template: `
    <div class="{{classes}}" style="{{styles}}">
        <template s-if="renderType === 'html'">
            <span>{{row[column.key]}}</span>
        </template>
        <template s-if="renderType === 'selection'">
            <table-checkbox
                checked='{{checked}}'
                disabled="{{disabled}}"
                on-change="handleChange"
            >
            </table-checkbox>
        </template>
        <template s-if="renderType === 'index'">
            <span>{{row._page_index}}</span>
        </template>
        <template s-if="renderType === 'normal'">
            <span title="{{row[column.key]}}">{{row[column.key]}}</span>
        </template>
    </div>
    `,
    components: {
        'table-checkbox': Checkbox
    },
    dataTypes: {
        column: DataTypes.object,
        index: DataTypes.number,
        checked: DataTypes.bool,
        disabled: DataTypes.bool,
        row: DataTypes.object,
        prefixCls: DataTypes.string
    },
    handleChange () {
        if (this.data.get('disabled')) return
        this.dispatch('check-change', {
            index: this.data.get('index')
        })
    },
    computed: {
        classes () {
            let prefixCls = this.data.get('prefixCls')
            let column = this.data.get('column')
            let classArr = [`${prefixCls}-cell`, `${prefixCls}-cell-ellipsis`]
            if (column.type === 'selection') classArr.push(`${prefixCls}-cell-with-selection`)
            return classArr
        },
        styles () {
            let column = this.data.get('column')
            const style = {}
            const width = parseInt(column._width - 1)
            style.width = `${width}px`
            return style
        },
        renderType () {
            let column = this.data.get('column')
            let row = this.data.get('row')
            let type = ''
            if (column.type === 'index') {
                type = 'index'
            } else if (column.type === 'selection') {
                type = 'selection'
            } else if (column.type === 'html') {
                type = 'html'
            } else if (column.render) {
                type = 'render'
            } else if (column.type === 'expand' && !row._disableExpand) {
                type = 'expand'
            } else {
                type = 'normal'
            }
            return type
        }
    }
})
