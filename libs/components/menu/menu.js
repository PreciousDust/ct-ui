/**
 * Created by gaoguoqing on 2019/6/14.
 *
 */
import san from 'san'
import { prefix } from '../../utils/common'
import { findComponentsDownward, findComponentsUpward } from '../../utils/findComponents'

const prefixCls = prefix + 'menu'
const DataTypes = san.DataTypes
module.exports = san.defineComponent({
    name: prefixCls,
    template: `
        <ul class="{{classes}}" style="{{styles}}">
            <slot></slot>
        </ul>
    `,
    initData () {
        return {
            prefixCls: prefixCls,
            currentActiveName: [],
            openedNames: [],
            // props defaults
            width: '240px',
            mode: 'vertical',
            accordion: false,
            route: false,
            openNames: [],
            theme: 'light'
        }
    },
    dataTypes: {
        mode: DataTypes.oneOf(['horizontal', 'vertical']),
        theme: DataTypes.oneOf(['light', 'dark']),
        activeName: DataTypes.oneOfType([
            DataTypes.string,
            DataTypes.number
        ]),
        openNames: DataTypes.array,
        accordion: DataTypes.bool,
        route: DataTypes.bool,
        trigger: DataTypes.string,
        width: DataTypes.string
    },
    messages: {
        'on-menu-item-select' (option) {
            this.handleSelect(option.value)
        },
        'on-menu-submenu-opened-change' (option) {
            this.updateOpenKeys(option.value)
        }
    },
    attached () {
        setTimeout(() => {
            this.data.set('openedNames', this.data.get('openNames'))
            this.data.set('currentActiveName', this.data.get('activeName'))
            this.updateOpened()
            this.updateActiveName()
        }, 50)
        this.watchProps()
    },
    watchProps () {
        this.watch('openNames', value => {
            this.data.set('openedNames', value)
            this.updateOpened()
        })
        this.watch('activeName', value => {
            this.data.set('currentActiveName', value)
        })
        this.watch('currentActiveName', () => {
            this.updateActiveName()
        })
        this.watch('mode', value => {
            findComponentsDownward(this, [prefixCls + '-submenu', prefixCls + '-item']).forEach(item => {
                item.setProps('mode', value)
            })
        })
        this.watch('trigger', value => {
            findComponentsDownward(this, prefixCls + '-submenu').forEach(item => {
                item.setProps('trigger', value)
            })
        })
    },
    handleSelect (option) {
        let {mode, route} = this.data.get()
        if (route && option.to !== undefined) {
            window.location.href = '#/' + option.to
        }
        this.data.set('currentActiveName', option.name)
        if (mode === 'horizontal') {
            findComponentsUpward(option._this, prefixCls + '-submenu').forEach(item => {
                item.data.set('opened', false)
            })
            this.data.set('openedNames', findComponentsDownward(this, prefixCls + '-submenu').filter(item => item.data.get('opened')).map(item => item.data.get('name')))
        }
        this.fire('select', option.name)
    },
    updateOpened () {
        let {openedNames} = this.data.get()
        const items = findComponentsDownward(this, prefixCls + '-submenu')
        if (items.length && openedNames.length) {
            items.forEach(item => {
                if (openedNames.indexOf(item.data.get('name')) > -1) {
                    item.data.set('opened', true)
                } else {
                    item.data.set('opened', false)
                }
            })
        }
    },
    updateOpenKeys (options) {
        let {accordion, openedNames} = this.data.get()
        const index = openedNames.indexOf(options.name)
        if (accordion) {
            findComponentsDownward(this, prefixCls + '-submenu').forEach(item => {
                item.data.set('opened', false)
            })
        }
        if (index >= 0) {
            options._this.data.set('opened', false)
            findComponentsUpward(options._this, prefixCls + '-submenu').forEach(item => {
                item.data.set('opened', true)
            })
            findComponentsDownward(options._this, prefixCls + '-submenu').forEach(item => {
                item.data.set('opened', false)
            })
        } else {
            if (accordion) {
                options._this.data.set('opened', true)
                findComponentsUpward(options._this, prefixCls + '-submenu').forEach(item => {
                    item.data.set('opened', true)
                })
            } else {
                findComponentsDownward(this, prefixCls + '-submenu').forEach(item => {
                    if (item.data.get('name') === options.name) {
                        item.data.set('opened', true)
                    }
                })
            }
        }
        let arr = findComponentsDownward(this, prefixCls + '-submenu').filter(item => item.data.get('opened')).map(item => item.data.get('name'))
        this.data.set('openedNames', [...arr])
        this.fire('open-change', {
            openedNames: arr,
            currentName: options.name
        })
    },
    updateActiveName () {
        if (this.data.get('currentActiveName') === undefined) {
            this.data.set('currentActiveName', -1)
        }
        findComponentsDownward(this, prefixCls + '-item').forEach(item => {
            item.updateActiveName(this.data.get('currentActiveName'))
        })
    },
    computed: {
        classes () {
            let mode = this.data.get('mode')
            let theme = this.data.get('theme')
            if (mode === 'vertical' && theme === 'primary') theme = 'primary'
            let classArr = [`${prefixCls}`, `${prefixCls}-${theme}`]
            if (mode) classArr.push(`${prefixCls}-${mode}`)
            return classArr
        },
        styles () {
            let mode = this.data.get('mode')
            let width = this.data.get('width')
            let style = {}
            if (mode === 'vertical') style.width = width
            return style
        }
    }
})
