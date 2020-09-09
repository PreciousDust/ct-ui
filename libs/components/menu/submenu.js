/**
 * Created by gaoguoqing on 2019/6/14.
 *
 */
import san from 'san'
import { prefix } from '../../utils/common'
import { findComponentUpward } from '../../utils/findComponents'
import { hasParentSubmenu, parentsSubmenuNum } from './utils'
import Icon from '../icon/icon'

const prefixCls = prefix + 'menu-submenu'
const DataTypes = san.DataTypes
module.exports = san.defineComponent({
    name: prefixCls,
    template: `
        <li class="{{classes}}" on-mouseenter="handleMouse" on-mouseleave="handleMouse">
            <div class="{{prefixCls + '-title'}}" on-click="handleClick" style="{{titleStyle}}">
                <slot name="title"></slot>
                <b-icon type="{{arrowType}}" class="{{prefixCls + '-title-icon'}}" />
            </div>
            <ul s-if="mode === 'vertical'" class="{{prefixCls}}" style="{{showContent}}" ><slot></slot></ul>
            <ul s-else class="{{prefixCls +'-drop-list'}}" style="{{showContent}}">
                <slot></slot>
            </ul>
        </li>
    `,
    components: {
        'b-icon': Icon
    },
    initData () {
        return {
            prefixCls: prefixCls,
            titleStyle: {},
            opened: false,
            // menu props defaults
            menu: '',
            mode: '',
            trigger: '',
            accordion: false
        }
    },
    attached () {
        setTimeout(() => {
            let menuParent = findComponentUpward(this, prefix + 'menu')
            this.data.set('mode', menuParent.data.get('mode'))
            this.data.set('trigger', menuParent.data.get('trigger'))
            this.data.set('accordion', menuParent.data.get('accordion'))
            this.getTitleStyle()
        }, 50)
        this.watch('mode', () => {
            this.getTitleStyle()
        })
    },
    dataTypes: {
        name: DataTypes.oneOfType([
            DataTypes.string,
            DataTypes.number
        ])
    },
    computed: {
        showContent () {
            return this.data.get('opened') ? 'display:block' : 'display:none'
        },
        classes () {
            let opened = this.data.get('opened')
            let classArr = [`${prefixCls}`]
            if (opened) classArr.push(`${prefixCls}-opened`)
            return classArr
        },
        arrowType () {
            let opened = this.data.get('opened')
            return opened ? 'xiasanjiao' : 'shangsanjiao'
        }
    },
    handleClick () {
        let {name, trigger} = this.data.get()
        if (trigger === 'hover') return
        this.dispatch('on-menu-submenu-opened-change', {
            name: name,
            _this: this
        })
    },
    handleMouse () {
        setTimeout(() => {
            let {name, trigger} = this.data.get()
            if (trigger !== 'hover') return
            this.dispatch('on-menu-submenu-opened-change', {
                name: name,
                _this: this
            })
        }, 200)
    },
    setProps (props, value) {
        this.data.set(props, value)
    },
    getTitleStyle () {
        let {mode} = this.data.get()
        let style = hasParentSubmenu(this) && mode !== 'horizontal' ? {
            'padding-left': 43 + (parentsSubmenuNum(this) - 1) * 24 + 'px'
        } : {}
        this.data.set('titleStyle', style)
    }
})
