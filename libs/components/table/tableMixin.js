/**
 * Created by gaoguoqing on 2018/12/17.
 *
 */
export default {
    alignCls (column, row = {}) {
        let arr = []
        let _cellClass = ''
        if (row._cellClass && column.key && row._cellClass[column.key]) {
            _cellClass = row._cellClass[column.key]
        }
        if (column.align) arr.push(`${this.data.get('prefixCls')}-column-${column.align}`)
        if (column.className) arr.push(`${column.className}`)
        if (_cellClass) arr.push(_cellClass)
        return arr
    },
    setCellWidth (column) {
        let width = ''
        if (column._width) {
            width = column._width
        }
        if (width === '0') width = ''
        return width
    },
    isPopperShow (column) {
        return column.filters && ((!this.fixed && !column.fixed) || (this.fixed === 'left' && column.fixed === 'left') || (this.fixed === 'right' && column.fixed === 'right'))
    },
    cellColspan (row, column) {
        let colspan = 1
        if (row._colspan && column.key && row._colspan[column.key]) {
            colspan = row._colspan[column.key]
        }
        return colspan
    },
    cellRowspan (row, column) {
        let rowspan = 1
        if (row._rowspan && column.key && row._rowspan[column.key]) {
            rowspan = row._rowspan[column.key]
        }
        return rowspan
    }
}
