/**
 * Created by gaoguoqing on 2019/5/29.
 *
 */
import { deepCopy } from '../../utils/assist'

function getVisibleColumnsWidth (cloneColumns) {
    return cloneColumns.map(cell => {
        if (cell._visible) {
            return parseInt(cell._width)
        } else {
            return 0
        }
    }).reduce((a, b) => a + b, 0)
}

// 多级表头
function makeColumnsId (columns) {
    return columns.map(item => {
        if ('children' in item) makeColumnsId(item.children)
        item.__id = getRandomStr(5)
        return item
    })
}

// create a multiple table-head
function makeColumnRows (fixedType, cols) {
    return convertToRows(cols, fixedType)
}

function convertColumnOrder (columns, fixedType) {
    let list = []
    let other = []
    columns.forEach((col) => {
        if (col.fixed && col.fixed === fixedType) {
            list.push(col)
        } else {
            other.push(col)
        }
    })
    return list.concat(other)
}

// set forTableHead to true when convertToRows, false in normal cases like table.vue
function getAllColumns (cols, forTableHead = false) {
    const columns = deepCopy(cols)
    const result = []
    columns.forEach((column) => {
        if (column.children) {
            if (forTableHead) result.push(column)
            result.push.apply(result, getAllColumns(column.children, forTableHead))
        } else {
            result.push(column)
        }
    })
    return result
}

function convertToRows (columns, fixedType = false) {
    const originColumns = fixedType ? fixedType === 'left' ? deepCopy(convertColumnOrder(columns, 'left')) : deepCopy(convertColumnOrder(columns, 'right')) : deepCopy(columns)
    let maxLevel = 1
    const traverse = (column, parent) => {
        if (parent) {
            column.level = parent.level + 1
            if (maxLevel < column.level) {
                maxLevel = column.level
            }
        }
        if (column.children) {
            let colSpan = 0
            column.children.forEach((subColumn) => {
                traverse(subColumn, column)
                colSpan += subColumn.colSpan
            })
            column.colSpan = colSpan
        } else {
            column.colSpan = 1
        }
    }
    originColumns.forEach((column) => {
        column.level = 1
        traverse(column)
    })
    const rows = []
    for (let i = 0; i < maxLevel; i++) {
        rows.push([])
    }
    const allColumns = getAllColumns(originColumns, true)
    allColumns.forEach((column) => {
        if (!column.children) {
            column.rowSpan = maxLevel - column.level + 1
        } else {
            column.rowSpan = 1
        }
        rows[column.level - 1].push(column)
    })
    return rows
}

function getRandomStr (len = 32) {
    const $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    const maxPos = $chars.length
    let str = ''
    for (let i = 0; i < len; i++) {
        str += $chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return str
}

function buildColumns (cols) {
    let columns = deepCopy(getAllColumns(cols))
    let fixLeftArr = columns.filter((item) => (item.fixed === 'left'))
    let fixRightArr = columns.filter((item) => (item.fixed === 'right'))
    let normalArr = columns.filter((item) => (!item.fixed))
    let result = fixLeftArr.concat(normalArr, fixRightArr)
    // Clumns in disorder
    result.forEach((row, index) => {
        row._index = index
        row._sortType = 'normal'
        row._visible = true
        row._filterChecked = []
        if ('filterMultiple' in row) {
            row._filterMultiple = row.filterMultiple
        } else {
            row._filterMultiple = false
        }
        if ('sortType' in row) {
            row._sortType = row.sortType
        }
        if ('filteredValue' in row) {
            row._filterChecked = row.filteredValue
            // row._isFiltered = true
        }
    })
    return result
}

function getVisibleColumns (columns) {
    return columns.filter((item) => item._visible)
}

module.exports = {
    getVisibleColumnsWidth,
    getVisibleColumns,
    makeColumnRows,
    makeColumnsId,
    getAllColumns,
    buildColumns
}
