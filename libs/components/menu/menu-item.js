/**
 * Created by gaoguoqing on 2019/6/14.
 *
 */
import san from 'san'
import { prefix } from '../../utils/common'
import { findComponentUpward } from '../../utils/findComponents'
import { hasParentSubmenu, parentsSubmenuNum } from './utils'

const prefixCls = prefix + 'menu'
const DataTypes = san.DataTypes
module.exports = san.defineComponent({
    name: prefixCls + '-item',
    template: `
        <li style="{{itemStyle}}" class="{{classes}}" on-click="handleClickItem"><slot></slot></li>
    `,
    initData () {
        return {
            active: false,
            mode: false,
            itemStyle: {}
        }
    },
    dataTypes: {
        name: DataTypes.oneOfType([
            DataTypes.string,
            DataTypes.number
        ]),
        disabled: DataTypes.bool,
        to: DataTypes.string
    },
    attached () {
        setTimeout(() => {
            let menuParent = findComponentUpward(this, prefix + 'menu')
            this.data.set('mode', menuParent.data.get('mode'))
            this.getItemStyle()
        }, 50)
        this.watch('mode', () => {
            this.getItemStyle()
        })
    },
    computed: {
        classes () {
            let active = this.data.get('active')
            let disabled = this.data.get('disabled')
            let classArr = [`${prefixCls}-item`]
            if (active) classArr.push(`${prefixCls}-item-active`)
            if (active) classArr.push(`${prefixCls}-item-selected`)
            if (disabled) classArr.push(`${prefixCls}-item-disabled`)
            return classArr
        }
    },
    updateActiveName (name) {
        if (this.data.get('name') === name) this.data.set('active', true)
        else this.data.set('active', false)
    },
    setProps (props, value) {
        this.data.set(props, value)
    },
    getItemStyle () {
        let {mode} = this.data.get()
        let style = hasParentSubmenu(this) && mode !== 'horizontal' ? {
            'padding-left': 43 + (parentsSubmenuNum(this) - 1) * 24 + 'px'
        } : {}
        this.data.set('itemStyle', style)
    },
    handleClickItem () {
        let {name, disabled, to} = this.data.get('')
        if (disabled) return
        this.dispatch('on-menu-item-select', {
            name: name,
            to: to,
            _this: this
        })
    }
})
