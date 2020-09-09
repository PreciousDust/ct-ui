/**
 * Created by gaoguoqing on 2019/5/23.
 *
 */
import san from 'san'
import tableHead from './table-head'
import tableBody from './table-body'
import tableFixed from './table-fixed'

const {getScrollBarSize, on, off} = require('../../utils/dom')
const {eventInit} = require('../../utils/compatible')
const {deepCopy} = require('../../utils/assist')
const {getVisibleColumnsWidth, makeColumnRows, makeColumnsId, getAllColumns, buildColumns} = require('./utils')
const DataTypes = san.DataTypes
const prefix = require('../../utils/common').prefix
const prefixCls = prefix + 'table'
module.exports = san.defineComponent({
    template: `
        <div
            class="{{wrapCls}}"
            style="{{styles}}"
        >
            <div class="{{prefixCls}}-wrapper">
                <div class="{{prefixCls}}-title" s-if="showSlotHeader" s-ref="title">
                    <slot name="header"></slot>
                </div>
                <div
                    s-if="showHeader"
                    class="{{prefixCls}}-header"
                    s-ref="header">
                    <table-head
                        scroll-bar-width="{{scrollBarWidth}}"
                        vertical-scroll="{{verticalScroll}}"
                        header-style="{{headerStyle}}"
                        column-rows="{{columnRows}}"
                        prefix-cls="{{prefixCls}}"
                        data="{{formatData}}"
                        columns="{{cloneColumns}}"
                    >
                    </table-head>
                </div>
                <div
                    on-scroll="handleScroll"
                    class="{{bodyClass}}"
                    style="{{bodyWrapStyle}}">
                    <table-body
                        s-ref="body"
                        body-style="{{bodyStyle}}"
                        columns="{{cloneColumns}}"
                        data="{{formatData}}"
                        prefix-cls="{{prefixCls}}"
                    >
                    </table-body>
                </div>
                <table-fixed
                    s-if="leftFixedColumns.length"
                    bodyStyle="{{fixedBodyStyle}}"
                    prefix-cls="{{prefixCls}}"
                    fixed="left"
                    s-ref="leftTable"
                    column-rows="{{columnRows}}"
                    data="{{formatData}}"
                    show-header="{{showHeader}}"
                    fixed-column-rows="{{leftFixedColumnRows}}"
                    columns="{{cloneColumns}}"
                    fixed-columns="{{leftFixedColumns}}"
                >
                </table-fixed>
                <table-fixed
                    s-if="rightFixedColumns.length"
                    bodyStyle="{{fixedBodyStyle}}"
                    prefix-cls="{{prefixCls}}"
                    fixed="right"
                    vertical-scroll="{{verticalScroll}}"
                    scroll-bar-width="{{scrollBarWidth}}"
                    s-ref="rightTable"
                    column-rows="{{columnRows}}"
                    data="{{formatData}}"
                    show-header="{{showHeader}}"
                    fixed-column-rows="{{rightFixedColumnRows}}"
                    columns="{{cloneColumns}}"
                    fixed-columns="{{rightFixedColumns}}"
                >
                </table-fixed>
                <div class="{{prefixCls}}-footer" s-if="showSlotFooter" s-ref="footer">
                    <slot name="footer"></slot>
                </div>
            </div>
            <span class="{{prefixCls}}-right-border"></span>
            <span class="{{prefixCls}}-bottom-border"></span>
        </div>
    `,
    components: {
        'table-head': tableHead,
        'table-fixed': tableFixed,
        'table-body': tableBody
    },
    initData () {
        return {
            prefixCls: prefixCls,
            showSlotHeader: true,
            showSlotFooter: true,
            indexInfo: {
                page: 1,
                size: 10
            },
            formatData: [],
            cloneColumns: [],
            columnRows: [],
            allColumns: [],
            leftFixedColumnRows: [],
            rightFixedColumnRows: [],
            headerStyle: {},
            bodyStyle: {},
            headerHeight: 0,
            bodyHeight: 0,
            verticalScroll: false, // 纵向滚动
            horizontalScroll: false, // 水平滚动
            scrollBarWidth: getScrollBarSize(),
            showHeader: true,
            highlightRow: false
        }
    },
    dataTypes: {
        data: DataTypes.array,
        columns: DataTypes.array,
        indexInfo: DataTypes.object,
        height: DataTypes.oneOfType([
            DataTypes.string,
            DataTypes.number
        ]),
        width: DataTypes.oneOfType([
            DataTypes.string,
            DataTypes.number
        ]),
        showHeader: DataTypes.bool,
        highlightRow: DataTypes.bool
    },
    messages: {
        'check-change' (option) {
            this.toggleCheck(option.value)
        },
        'check-all-change' (option) {
            this.selectAll(option.value)
        },
        'row-dbclick' (option) {
            this.handleClick({
                name: 'row-dbclick',
                index: option.value.index
            })
        },
        'row-click' (option) {
            this.handleClick({
                name: 'row-click',
                index: option.value.index
            })
        },
        'sort-change' (option) {
            this.handleSort(option.value)
        }
    },
    computed: {
        wrapCls () {
            let classArr = [`${prefixCls}`]
            if (this.data.get('border')) classArr.push(`${prefixCls}-border`)
            if (this.data.get('stripe')) classArr.push(`${prefixCls}-stripe`)
            return classArr
        },
        styles () {
            const height = this.data.get('height')
            const width = this.data.get('width')
            let style = {}
            if (height) style.height = `${parseInt(height)}px`
            if (width) style.width = `${width}px`
            return style
        },
        bodyWrapStyle () {
            let style = {}
            let bodyHeight = this.data.get('bodyHeight')
            if (bodyHeight !== 0) {
                const height = bodyHeight
                style.height = `${height}px`
            }
            return style
        },
        leftFixedColumns () {
            return this.data.get('cloneColumns').filter((item) => (item.fixed && item.fixed === 'left' && item._visible))
        },
        rightFixedColumns () {
            return this.data.get('cloneColumns').filter((item) => (item.fixed && item.fixed === 'right' && item._visible))
        },
        fixedBodyStyle () {
            let bodyHeight = this.data.get('bodyHeight')
            let horizontalScroll = this.data.get('horizontalScroll')
            let scrollBarWidth = this.data.get('scrollBarWidth')
            let style = {}
            if (bodyHeight !== 0) {
                let height = bodyHeight - (horizontalScroll ? scrollBarWidth : 0)
                style.height = `${height}px`
            }
            return style
        },
        bodyClass () {
            let prefixCls = this.data.get('prefixCls')
            let verticalScroll = this.data.get('verticalScroll')
            let horizontalScroll = this.data.get('horizontalScroll')
            let classArr = [`${prefixCls}-body`]
            if (verticalScroll) classArr.push(`${prefixCls}-overflowY`)
            if (horizontalScroll) classArr.push(`${prefixCls}-overflowX`)
            return classArr
        },
        isGroup () {
            let columnRows = this.data.get('columnRows')
            return columnRows && columnRows.length > 1
        }
    },
    attached () {
        this.buildColumnsData()
        let showSlotHeader = this.slot('header')[0] ? this.slot('header')[0].children.length : false
        let showSlotFooter = this.slot('footer')[0] ? this.slot('footer')[0].children.length : false
        this.data.set('formatData', this.makeDataWithSortAndFilter())
        this.data.set('showSlotHeader', showSlotHeader)
        this.data.set('showSlotFooter', showSlotFooter)
        this.initDom()
        this.watchProps()
    },
    initDom () {
        this.handleResize()
        on(window, 'resize', this.handleResize.bind(this))
    },
    detached () {
        off(window, 'resize', this.handleResize.bind(this))
    },
    watchProps () {
        this.watch('columns', () => {
            this.buildColumnsData()
            this.handleResize()
            this.data.set('formatData', this.makeDataWithSortAndFilter())
        })
        this.watch('data', () => {
            this.data.set('formatData', this.makeDataWithSortAndFilter())
            this.handleResize()
        })
        this.watch('indexInfo', () => {
            this.data.set('formatData', this.makeDataWithSortAndFilter())
        })
        this.watch('verticalScroll', () => {
            this.handleResize()
        })
        this.watch('horizontalScroll', () => {
            this.handleResize()
        })
        this.watch('height', () => {
            this.handleResize()
        })
    },
    buildColumnsData () {
        const colsWithId = makeColumnsId(deepCopy(this.data.get('columns')))
        this.data.set('allColumns', getAllColumns(colsWithId))
        this.data.set('cloneColumns', buildColumns(colsWithId))
        this.data.set('columnRows', makeColumnRows(false, colsWithId))
        this.data.set('leftFixedColumnRows', makeColumnRows('left', colsWithId))
        this.data.set('rightFixedColumnRows', makeColumnRows('right', colsWithId))
    },
    handleResize () {
        let noWidthList = []
        let hasWidthList = []
        let noMaxWidthColumns = []
        let cloneColumns = deepCopy(this.data.get('cloneColumns'))
        let sumMinWidth = 0
        let tableWidth = this.el.offsetWidth - 1
        cloneColumns.forEach((item) => {
            if (item._visible) {
                if (item.width) {
                    hasWidthList.push(item)
                } else {
                    noWidthList.push(item)
                }
                if (item.minWidth) {
                    sumMinWidth += item.minWidth
                } else if (!item.width && !item.maxWidth) {
                    noMaxWidthColumns.push(item)
                }
            }
        })
        let columnWidth = 0
        // 固定宽度
        let fixedWidth = hasWidthList.map(cell => cell.width).reduce((a, b) => a + b, 0)
        let adaptiveWidth = tableWidth - fixedWidth - sumMinWidth - (this.data.get('verticalScroll') ? this.data.get('scrollBarWidth') : 0)
        let adaptiveLength = noWidthList.length
        // 可用宽度
        if (adaptiveWidth > 0 && adaptiveLength > 0) {
            columnWidth = parseInt(adaptiveWidth / adaptiveLength)
        }
        for (let i = 0; i < cloneColumns.length; i++) {
            let column = cloneColumns[i]
            let width = columnWidth + (column.minWidth ? column.minWidth : 0)
            if (column.width) {
                width = column.width
            } else if (column._visible) {
                if (column.minWidth > width) {
                    width = column.minWidth
                }
                if (column.maxWidth < width) {
                    width = column.maxWidth
                }
                if (adaptiveWidth > 0) {
                    adaptiveWidth -= width - (column.minWidth ? column.minWidth : 0)
                    adaptiveLength--
                    if (adaptiveLength > 0) {
                        columnWidth = parseInt(adaptiveWidth / adaptiveLength)
                    } else {
                        columnWidth = 0
                    }
                } else {
                    columnWidth = 0
                }
            }
            column._width = width
        }
        if (adaptiveWidth > 0) {
            adaptiveLength = noMaxWidthColumns.length
            columnWidth = parseInt(adaptiveWidth / adaptiveLength)
            for (let i = 0; i < noMaxWidthColumns.length; i++) {
                const column = noMaxWidthColumns[i]
                let width = column._width + columnWidth
                if (adaptiveLength > 1) {
                    adaptiveLength--
                    adaptiveWidth -= columnWidth
                    columnWidth = parseInt(adaptiveWidth / adaptiveLength)
                } else {
                    columnWidth = 0
                }
                column._width = width
            }
        }
        this.data.set('cloneColumns', cloneColumns)
        this.scrollReckon()
    },
    scrollReckon () {
        let height = this.data.get('height')
        if (height) {
            this.nextTick(() => {
                // const headerHeight = parseInt(getStyle(this.ref('header'), 'height')) || 0
                const headerHeight = 40
                this.data.set('headerHeight', headerHeight)
                this.data.set('bodyHeight', height - headerHeight)
                this.bodyScrollReckon()
            })
        } else {
            this.nextTick(() => {
                this.data.set('bodyHeight', 0)
                this.bodyScrollReckon()
            })
        }
    },
    bodyScrollReckon () {
        let {data, verticalScroll, scrollBarWidth, bodyHeight} = this.data.get('')
        if (!data || data.length === 0) {
            this.data.set('horizontalScroll', false)
            this.data.set('verticalScroll', false)
        } else {
            let bodyContent = this.ref('body')
            let bodyEl = bodyContent.parent.el
            let bodyContentHeight = bodyContent.el.offsetHeight
            this.data.set('horizontalScroll', bodyEl.offsetWidth < getVisibleColumnsWidth(this.data.get('cloneColumns')) + (verticalScroll ? scrollBarWidth : 0) - 1)
            this.data.set('verticalScroll', bodyHeight ? bodyContentHeight > bodyHeight : false)
        }
        this.getHeaderStyle()
        this.getBodyStyle()
    },
    makeDataWithSortAndFilter () {
        let data = this.makeDataWithSort()
        this.data.get('cloneColumns').forEach(col => {
            data = this.filterData(data, col)
        })
        return data
    },
    filterData (data, column) {
        return data.filter((row) => {
            if (typeof column.filterRemote === 'function') return true
            let status = !column._filterChecked.length
            for (let i = 0; i < column._filterChecked.length; i++) {
                status = column.filterMethod(column._filterChecked[i], row)
                if (status) break
            }
            return status
        })
    },
    makeDataWithSort () {
        let data = this.buildData()
        let cloneColumns = this.data.get('cloneColumns')
        let sortType = 'normal'
        let sortIndex = -1
        let isCustom = false
        for (let i = 0; i < cloneColumns.length; i++) {
            if (cloneColumns[i]._sortType !== 'normal') {
                sortType = cloneColumns[i]._sortType
                sortIndex = i
                isCustom = cloneColumns[i].sortable === 'custom'
                break
            }
        }
        if (sortType !== 'normal' && !isCustom) data = this.sortData(data, sortType, sortIndex)
        return data
    },
    buildData () {
        let {data, indexInfo} = this.data.get('')
        let deepData = deepCopy(data)
        let pageStart = indexInfo.size * (indexInfo.page - 1)
        deepData.forEach((row, index) => {
            row._index = index
            row._page_index = pageStart + index + 1
            if (!row._checked) {
                row._checked = false
            }
            if (row._highlight) {
                row._isHighlight = row._highlight
            } else {
                row._isHighlight = false
            }
        })
        return deepData
    },
    sortData (data, type, index) {
        let {cloneColumns} = this.data.get('')
        const key = cloneColumns[index].key
        const sortData = this.complete(data, key)
        sortData.sort((a, b) => {
            if (cloneColumns[index].sortMethod) {
                return cloneColumns[index].sortMethod(a[key], b[key], type)
            } else {
                if (type === 'asc') {
                    return a[key] > b[key] ? 1 : -1
                } else if (type === 'desc') {
                    return a[key] < b[key] ? 1 : -1
                }
            }
        })
        return sortData
    },
    // Todo 原生 Array.sort 方法，当传入的数据存在undefined 时，无法正常排序
    complete (data, key) {
        return data.map(item => {
            if (item[key] === undefined) item[key] = ''
            return item
        })
    },
    handleSort (options) {
        let {formatData, cloneColumns, columns, isGroup} = this.data.get('')
        const column = !isGroup ? this.data.get('cloneColumns')[options.index] : this.data.get(`columnRows[${options._rowIndex}][${options._index}]`)
        if (column._sortType === options.type) {
            options.type = 'normal'
        }
        if (column.sortable !== 'custom') {
            if (options.type === 'normal') {
                this.data.set('formatData', this.makeDataWithFilter())
            } else {
                this.data.set('formatData', this.sortData(formatData, options.type, options.index))
            }
        }
        if (isGroup) {
            this.data.set(`columnRows[${options._rowIndex}][${options._index}]._sortType`, options.type)
        } else {
            this.data.set(`cloneColumns[${options.index}]._sortType`, options.type)
        }
        this.fire('sort-change', {
            column: deepCopy(columns[options.index]),
            key: cloneColumns[options.index].key,
            order: options.type
        })
    },
    makeDataWithFilter () {
        let data = this.buildData()
        this.data.get('cloneColumns').forEach(col => {
            data = this.filterData(data, col)
        })
        return data
    },
    handleScroll (event) {
        var evt = eventInit(event)
        let {leftFixedColumns, rightFixedColumns} = this.data.get('')
        if (this.ref('header').scrollLeft === undefined || this.ref('header').scrollLeft === null) {
            this.ref('header').documentElement.scrollLeft = evt.target.scrollLeft
        } else {
            this.ref('header').scrollLeft = evt.target.scrollLeft
        }
        if (leftFixedColumns.length) this.ref('leftTable').children[3].el.scrollTop = evt.target.scrollTop
        if (rightFixedColumns.length) this.ref('rightTable').children[3].el.scrollTop = evt.target.scrollTop
    },
    getHeaderStyle () {
        let style = {}
        let {cloneColumns, verticalScroll, scrollBarWidth} = this.data.get('')
        let el = this.el
        let boxWidth = el ? el.offsetWidth : 0
        let tableWidth = getVisibleColumnsWidth(cloneColumns)
        if (tableWidth !== 0) {
            let width = ''
            width = tableWidth
            if (boxWidth && width + 1 < boxWidth) {
                width = boxWidth - 1
            } else {
                width += (verticalScroll ? scrollBarWidth : 0)
            }
            style.width = `${width}px`
        }
        this.data.set('headerStyle', style)
    },
    getBodyStyle () {
        let style = {}
        let {cloneColumns, verticalScroll, scrollBarWidth} = this.data.get('')
        let el = this.el
        let boxWidth = el ? el.offsetWidth : 0
        let tableWidth = getVisibleColumnsWidth(cloneColumns)
        if (tableWidth !== 0) {
            let width = tableWidth
            width = tableWidth
            if (boxWidth && width < boxWidth) {
                width = boxWidth - 1 - (verticalScroll ? scrollBarWidth : 0)
            }
            style.width = `${width}px`
        }
        this.data.set('bodyStyle', style)
    },
    getSelection () {
        return this.data.get('formatData').filter((item) => (item._checked))
    },
    toggleCheck (options) {
        let index = options.index
        let {data, formatData} = this.data.get('')
        const status = !formatData[index]._checked
        this.data.set(`formatData[${index}]._checked`, status)
        const selection = this.getSelection()
        this.fire(status ? 'checked' : 'checked-cancel', {
            selection: selection,
            row: deepCopy(data[index])
        })
        this.fire('check-change', selection)
    },
    selectAll (options) {
        let {formatData} = this.data.get('')
        formatData.forEach((item, index) => {
            if (item._disabled) {
                this.data.set(`formatData[${index}]._checked`, false)
            } else {
                this.data.set(`formatData[${index}]._checked`, options.status)
            }
        })
        const selection = this.getSelection()
        this.fire(options.status ? 'check-all' : 'check-all-cancel', selection)
        this.fire('check-change', selection)
    },
    handleClick (options) {
        let {highlightRow, data} = this.data.get('')
        this.fire(`${options.name}`, deepCopy(data[options.index]))
        if (!highlightRow) return
        this.handleCurrentRow('highlight', options.index)
    },
    clearCurrentRow () {
        if (!this.highlightRow) return
        this.handleCurrentRow('clear')
    },
    handleCurrentRow (type, _index) {
        let {formatData, data} = this.data.get('')
        let oldIndex = -1
        for (let i in formatData) {
            if (formatData[i]._isHighlight) {
                oldIndex = parseInt(i)
                this.data.set(`formatData[${i}._isHighlight]`, false)
            }
        }
        if (type === 'highlight') this.data.set(`formatData[${_index}._isHighlight]`, true)
        const oldRow = oldIndex < 0 ? null : deepCopy(data[oldIndex])
        const currentRow = type === 'highlight' ? deepCopy(data[_index]) : null
        this.fire(`current-change`, {
            currentRow: currentRow,
            oldRow: oldRow
        })
    }
})
