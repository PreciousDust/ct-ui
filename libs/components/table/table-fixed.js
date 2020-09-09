/**
 * Created by gaoguoqing on 2019/6/4.
 *
 */
import san from 'san'
import tableBody from './table-body'
import tableHead from './table-head'

const DataTypes = san.DataTypes

module.exports = san.defineComponent({
    template: `
        <div class="{{wrapCls}}" style="{{styles}}">
            <div s-if="showHeader">
                <table-head
                    style="{{styles}}"
                    columns="{{fixedColumns}}"
                    header-style="{{styles}}"
                    prefix-cls="{{prefixCls}}"
                    data="{{data}}"
                    column-rows="{{columnRows}}"
                    fixed-column-rows="{{fixedColumnRows}}"
                    clone-columns="{{columns}}"
                    fixed="{{fixed}}">
                </table-head>
            </div>
            <div
                class="{{prefixCls}}-fixed-body"
                style="{{bodyStyle}}">
                <table-body
                    columns="{{fixedColumns}}"
                    data="{{data}}"
                    clone-columns="{{columns}}"
                    fixed="{{fixed}}"
                    body-style="{{styles}}"
                    prefix-cls="{{prefixCls}}"
                >
                </table-body>
            </div>
        </div>
    `,
    components: {
        'table-head': tableHead,
        'table-body': tableBody
    },
    dataTypes: {
        showHeader: DataTypes.bool,
        verticalScroll: DataTypes.bool,
        scrollBarWidth: DataTypes.number,
        data: DataTypes.array,
        columns: DataTypes.array,
        columnRows: DataTypes.array,
        fixed: DataTypes.string,
        fixedColumns: DataTypes.array,
        fixedColumnRows: DataTypes.array,
        bodyStyle: DataTypes.object,
        prefixCls: DataTypes.string
    },
    computed: {
        styles () {
            let fixedColumns = this.data.get('fixedColumns')
            let fixed = this.data.get('fixed')
            let verticalScroll = this.data.get('verticalScroll')
            let scrollBarWidth = this.data.get('scrollBarWidth')
            let style = {}
            let width = 0
            fixedColumns.forEach((col) => {
                if (col.fixed && col.fixed === fixed) {
                    width += parseInt(col._width)
                }
            })
            if (fixed === 'right') {
                style.right = `${verticalScroll ? scrollBarWidth : 0}px`
            }
            style.width = `${width}px`
            return style
        },
        wrapCls () {
            let fixed = this.data.get('fixed')
            let prefixCls = this.data.get('prefixCls')
            let classArr = [`${prefixCls}-fixed`]
            if (this.data.get('fixed')) classArr.push(`${prefixCls}-fixed-${fixed}`)
            return classArr
        }
    }
})
