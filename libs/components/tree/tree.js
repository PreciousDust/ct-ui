/**
 * Created by gaoguoqing on 2019/6/12.
 *
 */
import san from 'san'
import treeNode from './tree-node'
import { prefix, propsInit } from '../../utils/common'
import { deepCopy } from '../../utils/assist'

const prefixCls = prefix + 'tree'
const DataTypes = san.DataTypes
module.exports = san.defineComponent({
    name: prefixCls,
    template: `
        <div class="{{prefixCls}}">
            <tree-node
                s-for="item in rootData"
                data="{{item}}"
                auto-scroll="{{autoScroll}}"
                prefix-cls="{{prefixCls}}"
                show-checkbox="{{showCheckbox}}"
                default-opt="{{defaultOpt}}"
            >
            </tree-node>
            <div s-if="showTip" class="{{prefixCls+'-tip'}}">暂无数据</div>
        </div>
    `,
    components: {
        'tree-node': treeNode
    },
    initData () {
        return {
            prefixCls: prefixCls,
            rootData: [],
            dataList: [],
            defaultCheckedValues: [],
            defaultExpandedValues: [],
            dargState: {},
            // props
            defaultOpt: {
                childrenKey: 'children',
                nameKey: 'name',
                idKey: 'id',
                disabledKey: 'disabled',
                checkedKey: 'checked',
                expandKey: 'expanded',
                selectedKey: 'selected',
                indeterminateKey: 'indeterminate'
            },
            checkboxOptions: { // 多选级联配置
                parent: true, // 是否影响父级节点
                children: true // 是否影响子级节点
            },
            filterText: '',
            filterMethod (value, data) {
                return data.name.indexOf(value) !== -1
            }
        }
    },
    dataTypes: {
        ...propsInit({
            // draggable 开启拖拽模式
            // loading 开启懒加载模式
            // accordion 开启手风琴模式
            // showCheckbox 开启多选模式
            // autoScroll  选中后自动滚动到选中位置
            props: ['draggable', 'loading', 'accordion', 'showCheckbox', 'autoScroll'],
            config: DataTypes.bool
        }),
        ...propsInit({
            // defaultCheckedValues 默认选中集合【多选】
            // defaultExpandedValues 默认展现集合
            // data  树形数据
            props: ['defaultCheckedValues', 'defaultExpandedValues', 'data'],
            config: DataTypes.array
        }),
        ...propsInit({
            // defaultOpt 默认各种效果的配置项
            // checkboxOptions 多选配置项
            props: ['defaultOpt', 'checkboxOptions'],
            config: DataTypes.object
        }),
        filterText: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        loadMethod: DataTypes.func,
        filterMethod: DataTypes.func
    },
    messages: {
        'expand-change' (option) {
            this.handleExpand(option.value)
        },
        'check-change' (option) {
            this.handleCheck(option.value)
        },
        'select-change' (option) {
            this.handleSelect(option.value)
        }
    },
    computed: {
        showTip () {
            return !this.data.get('dataList').filter(obj => (!obj.node._invisible)).map(obj => obj.node).length
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
    },
    attached () {
        this.watchProps()
        this.rebuidData()
        this.filterTreeData(this.data.get('filterText'))
        this.defaultRebuild('checked')
        this.defaultRebuild('expanded')
    },
    watchProps () {
        this.watch('data', () => {
            this.rebuidData()
        })
        this.watch('rootData', () => {
            this.data.set('dataList', this.indexArrCreate())
            this.formatTreeData()
        })
        this.watch('filterText', value => {
            this.filterTreeData(value)
        })
        this.watch('defaultCheckedValues', () => {
            this.defaultRebuild('checked')
        })
        this.watch('defaultExpandedValues', () => {
            this.defaultRebuild('expanded')
        })
    },
    defaultRebuild (type) {
        const {dataList, defaultOpt, showCheckbox, defaultCheckedValues, defaultExpandedValues} = this.data.get('')
        let {idKey} = defaultOpt
        let arr = type === 'checked' ? defaultCheckedValues : defaultExpandedValues
        if (arr.length) {
            if (type === 'checked') {
                if (showCheckbox) {
                    let nodeKeys = dataList.filter(item => arr.includes(item.node[idKey]) || arr.includes(String(item.node[idKey]))).map(item => item.nodeKey)
                    nodeKeys.forEach(item => {
                        this.handleCheck({checked: true, nodeKey: item, isFormat: true})
                    })
                } else {
                    let [node] = dataList.filter(item => (String(item.node[idKey]) === String(arr[0])))
                    this.handleSelect({nodeKey: node.nodeKey, isFormat: true})
                }
            } else {
                let nodeKeys = dataList.filter(item => arr.includes(item.node[idKey]) || arr.includes(String(item.node[idKey]))).map(item => item.nodeKey)
                nodeKeys.forEach(item => {
                    this.handleExpand({nodeKey: item, isFormat: true})
                })
            }
        }
    },
    // 模糊检索
    filterTreeData (value) {
        const {defaultOpt, rootData, filterMethod} = this.data.get('')
        const cascadeParent = function (data, isRoot = false) {
            let allHidden = true
            const childNodes = data[defaultOpt.childrenKey] || []
            childNodes.forEach((child) => {
                if (!child._invisible) allHidden = false
            })
            if (isRoot) {
                data._invisible = !filterMethod(value, data)
            }
            if (childNodes.length) {
                data._invisible = allHidden && !filterMethod(value, data)
            }
        }
        const traverseVisible = function (data) {
            const childNodes = data[defaultOpt.childrenKey] || []
            childNodes.forEach((child) => {
                child._invisible = !filterMethod(value, child)
                traverseVisible(child)
            })
            if (data._invisible && childNodes.length) {
                cascadeParent(data)
            }
        }
        rootData.forEach(rootNode => {
            traverseVisible(rootNode)
            cascadeParent(rootNode, true)
        })
        this.data.set('rootData', deepCopy(rootData))
    },
    rebuidData () {
        this.data.set('rootData', deepCopy(this.data.get('data')))
    },
    // 建立索引数组
    indexArrCreate () {
        let keyCounter = 0
        let childrenKey = this.data.get('defaultOpt').childrenKey
        let rootData = this.data.get('rootData')
        let indexArr = []
        function traversalChildren (node, parent, index) {
            node.nodeKey = keyCounter++
            indexArr[node.nodeKey] = {node: node, nodeKey: node.nodeKey}
            if (typeof parent !== 'undefined') {
                indexArr[node.nodeKey].parent = parent.nodeKey
                indexArr[parent.nodeKey][childrenKey].push(node.nodeKey)
            }
            if (typeof index !== 'undefined') {
                indexArr[node.nodeKey].childrenIndex = index
            }
            if (node[childrenKey]) {
                indexArr[node.nodeKey][childrenKey] = []
                node[childrenKey].forEach((child, index) => traversalChildren(child, node, index))
            }
        }
        rootData.forEach(rootNode => {
            traversalChildren(rootNode)
        })
        return indexArr
    },
    // 原数据格式化
    formatTreeData () {
        let defaultOpt = this.data.get('defaultOpt')
        let dataList = this.data.get('dataList')
        let checkboxOptions = this.data.get('checkboxOptions')
        const checkedNodes = this.getCheckedNodes()
        checkedNodes.forEach(node => {
            if (checkboxOptions.children) this.downTraversal(node, {[`${defaultOpt.checkedKey}`]: true})
            const parentKey = dataList[node.nodeKey].parent
            if (!parentKey && parentKey !== 0) return
            const parent = dataList[parentKey].node
            const childHasCheckSetter = typeof node[defaultOpt.checkedKey] !== 'undefined' && node[defaultOpt.checkedKey]
            if (childHasCheckSetter && parent[defaultOpt.checkedKey] !== node[defaultOpt.checkedKey]) {
                if (checkboxOptions.parent) this.upwardTraversal(node.nodeKey)
            }
        })
    },
    // 向上遍历父级数据
    upwardTraversal (nodeKey) {
        let {dataList, defaultOpt} = this.data.get('')
        const parentKey = dataList[nodeKey].parent
        if (typeof parentKey === 'undefined') return
        const node = dataList[nodeKey].node
        const parent = dataList[parentKey].node
        if (node[defaultOpt.checkedKey] === parent[defaultOpt.checkedKey] && node[defaultOpt.indeterminateKey] === parent[defaultOpt.indeterminateKey]) return // no need to update upwards
        if (node[defaultOpt.checkedKey] === true) {
            parent[defaultOpt.checkedKey] = parent[defaultOpt.childrenKey].every(node => node[defaultOpt.checkedKey])
            parent[defaultOpt.indeterminateKey] = !parent[defaultOpt.checkedKey]
        } else {
            parent[defaultOpt.checkedKey] = false
            parent[defaultOpt.indeterminateKey] = parent[defaultOpt.childrenKey].some(node => node[defaultOpt.checkedKey] || node[defaultOpt.indeterminateKey])
        }
        this.upwardTraversal(parentKey)
    },
    // 向下遍历子孙级数据
    downTraversal (node, options) {
        const childrenKey = this.data.get('defaultOpt').childrenKey
        for (let key in options) {
            node[key] = options[key]
        }
        if (node[childrenKey]) {
            node[childrenKey].forEach(child => {
                this.downTraversal(child, options)
            })
        }
    },
    handleSelect (options) {
        let {defaultOpt, dataList} = this.data.get('')
        let selectedKey = defaultOpt.selectedKey
        let node = dataList[options.nodeKey].node
        const selectedIndex = dataList.findIndex(obj => obj.node[defaultOpt.selectedKey])
        if (selectedIndex >= 0 && selectedIndex !== options.nodeKey) {
            dataList[selectedIndex].node[selectedKey] = false
        }
        node[selectedKey] = !node[selectedKey]
        // TODO San 的数据是 Immutable 的，因此更新时变量的引用没变， diff 的时候还是相等的，不会触发更新
        this.data.set('rootData', deepCopy(this.data.get('rootData')))
        if (!options.isFormat) this.fire('select', deepCopy({node: node}))
    },
    // 选中
    handleCheck ({checked, nodeKey, isFormat = false}) {
        let {defaultOpt, dataList, checkboxOptions} = this.data.get('')
        const node = dataList[nodeKey].node
        node[defaultOpt.checkedKey] = checked
        node[defaultOpt.indeterminateKey] = false
        if (checkboxOptions.parent) this.upwardTraversal(nodeKey)
        if (checkboxOptions.children) {
            this.downTraversal(node, {
                [`${defaultOpt.checkedKey}`]: checked,
                [`${defaultOpt.indeterminateKey}`]: false
            })
        }
        let options = {
            checkedNodes: this.getCheckedNodes(),
            indeterminateNodes: this.getIndeterminateNodes(),
            currentNode: deepCopy(node)
        }
        options.checkedAndIndeterminateNodes = options.checkedNodes.concat(options.indeterminateNodes)
        // TODO San 的数据是 Immutable 的，因此更新时变量的引用没变， diff 的时候还是相等的，不会触发更新
        this.data.set('rootData', deepCopy(this.data.get('rootData')))
        if (!isFormat) this.fire('check', options)
    },
    // 展开/关闭
    handleExpand (options) {
        let {defaultOpt, dataList, accordion} = this.data.get('')
        let {expandKey, childrenKey} = defaultOpt
        const node = dataList[options.nodeKey].node
        if (accordion) { // 是否开启手风琴
            let parentKey = dataList[node.nodeKey].parent
            if (parentKey !== undefined) {
                let parent = dataList[parentKey].node
                parent[childrenKey].forEach((item) => {
                    if (item.nodeKey !== node.nodeKey) {
                        dataList[item.nodeKey].node[expandKey] = false
                    }
                })
            }
        }
        // TODO San 的数据是 Immutable 的，因此更新时变量的引用没变， diff 的时候还是相等的，不会触发更新
        node[expandKey] = !node[expandKey]
        this.data.set('rootData', deepCopy(this.data.get('rootData')))
        if (!options.isFormat) this.fire('expand', {node: node})
    },
    getCheckedNodes () {
        const checkedKey = this.data.get('defaultOpt').checkedKey
        return this.data.get('dataList').filter(obj => obj.node[checkedKey]).map(obj => obj.node)
    },
    getSelectedNodes () {
        const selectedKey = this.data.get('defaultOpt').selectedKey
        return this.data.get('dataList').filter(obj => (obj.node[selectedKey])).map(obj => obj.node)
    },
    getIndeterminateNodes () {
        const indeterminateKey = this.data.get('defaultOpt').indeterminateKey
        return this.data.get('dataList').filter(obj => (obj.node[indeterminateKey])).map(obj => obj.node)
    }
})
