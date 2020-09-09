/**
 * Created by gaoguoqing on 2019/6/12.
 *
 */
import san from 'san'
import { propsInit } from '../../utils/common'
import Icon from '../icon/icon'
import Checkbox from '../checkbox/checkbox'
import { findComponentUpward } from '../../utils/findComponents'

const DataTypes = san.DataTypes
module.exports = san.defineComponent({
    template: `
        <ul
            style="{{styles}}"
            class="{{wrapCls}}">
            <li>
                <span class="{{prefixCls+'-arrow'}}">
                    <b-icon class="{{prefixCls+'-arrow-expand'}}" s-if="showArrow" type="{{arrowType}}" on-click="expanded"></b-icon>
                    <b-icon s-if="loadingShow" type="chushihua" class="{{prefixCls+'-loop'}}"></b-icon>
                </span>
                <b-checkbox
                    s-if="showCheckbox"
                    on-change="handleCheck"
                    indeterminate="{{data[defaultOpt.indeterminateKey]}}"
                    checked="{{data[defaultOpt.checkedKey]}}"
                    disabled="{{data[defaultOpt.disabledKey]}}">
                </b-checkbox>
                <span on-click="selectData" class="{{nameCls}}">{{ data[defaultOpt.nameKey] }}</span>
                <tree-node
                    s-if="data[defaultOpt.expandKey]"
                    s-for="item in children"
                    data="{{item}}"
                    auto-scroll="{{autoScroll}}"
                    prefix-cls="{{prefixCls}}"
                    show-checkbox="{{showCheckbox}}"
                    default-opt="{{defaultOpt}}"
                >
                </tree-node>
            </li>
        </ul>
    `,
    initData () {
        return {
            loadingShow: false
        }
    },
    components: {
        'b-icon': Icon,
        'tree-node': 'self',
        'b-checkbox': Checkbox
    },
    dataTypes: {
        ...propsInit({
            // prefixCls 前缀
            // className
            props: ['prefixCls', 'className'],
            config: DataTypes.string
        }),
        ...propsInit({
            // data
            props: ['data'],
            config: DataTypes.object
        }),
        ...propsInit({
            // showCheckbox
            // autoScroll
            props: ['showCheckbox', 'autoScroll'],
            config: DataTypes.bool
        }),
        ...propsInit({
            // defaultOpt 默认各种效果的配置项
            props: ['defaultOpt'],
            config: DataTypes.object
        })
    },
    attached () {
        this.watch('data', data => {
            this.data.set('loadingShow', data.loading)
        })
    },
    computed: {
        wrapCls () {
            return [
                `${this.data.get('prefixCls')}-children`
            ]
        },
        styles () {
            let data = this.data.get('data')
            let style = {}
            if (data._invisible) {
                style['display'] = `none`
            } else {
                style['display'] = `block`
            }
            return style
        },
        showArrow () {
            let data = this.data.get('data')
            let defaultOpt = this.data.get('defaultOpt')
            let loadingShow = this.data.get('loadingShow')
            return (data[defaultOpt.childrenKey] && data[defaultOpt.childrenKey].length) || ('loading' in data && !loadingShow)
        },
        arrowType () {
            let data = this.data.get('data')
            let defaultOpt = this.data.get('defaultOpt')
            return data[defaultOpt.expandKey] ? 'xiasanjiao' : 'yousanjiao'
        },
        children () {
            let defaultOpt = this.data.get('defaultOpt')
            let data = this.data.get('data')
            return data[defaultOpt.childrenKey]
        },
        nameCls () {
            let defaultOpt = this.data.get('defaultOpt')
            let prefixCls = this.data.get('prefixCls')
            let className = this.data.get('className')
            let data = this.data.get('data')
            let classArr = [`${prefixCls}-name`]
            if (className) classArr.push(className)
            if (data[defaultOpt.selectedKey]) classArr.push(`${prefixCls}-name-selected`)
            return classArr
        }
    },
    selectData () {
        let {defaultOpt, showCheckbox, data} = this.data.get('')
        if (data[defaultOpt.disabledKey] || showCheckbox) return
        this.dispatch('select-change', {
            nodeKey: data.nodeKey
        })
    },
    handleCheck () {
        let {defaultOpt, data} = this.data.get('')
        if (data[defaultOpt.disabledKey]) return
        const changes = {
            checked: !data[defaultOpt.checkedKey] && !data[defaultOpt.indeterminateKey],
            nodeKey: data.nodeKey
        }
        this.dispatch('check-change', changes)
    },
    expanded () {
        let {data, defaultOpt, prefixCls} = this.data.get('')
        // loading
        let Tree = findComponentUpward(this, prefixCls)
        let {loading, loadMethod} = Tree.data.get('')
        if (!data[defaultOpt.childrenKey] || data[defaultOpt.childrenKey].length === 0) {
            if (loading && loadMethod) {
                this.data.set('loadingShow', true)
                data.loading = true
                loadMethod(data, children => {
                    this.data.set('loadingShow', false)
                    data.loading = false
                    if (children.length) {
                        data[defaultOpt.childrenKey] = children
                        this.expanded()
                    }
                })
                return
            }
        }
        this.dispatch('expand-change', {
            nodeKey: this.data.get('data').nodeKey
        })
    }
})
