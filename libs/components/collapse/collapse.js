/**
 * Created by gaoguoqing on 2019/6/25.
 *
 */
import san from 'san'
import { prefix, propsInit } from '../../utils/common'
import { findSlotNodeComponentsDownward } from '../../utils/findComponents'
import { deepCopy } from '../../utils/assist'

const DataTypes = san.DataTypes
const prefixCls = prefix + 'collapse'

module.exports = san.defineComponent({
    name: prefixCls,
    template: `
        <div class="{{classCls}}">
            <slot></slot>
        </div>
    `,
    dataTypes: {
        value: DataTypes.oneOfType([
            DataTypes.string,
            DataTypes.array
        ]),
        ...propsInit({
            // accordion 开启手风琴模式
            // simple 开启简洁模式
            props: ['simple', 'accordion'],
            config: DataTypes.bool
        }),
        position: DataTypes.oneOf(['left', 'right', 'hidden'])
    },
    initData () {
        return {
            currentIndex: '',
            // props
            position: 'left'
        }
    },
    attached () {
        setTimeout(() => {
            this.data.set('currentIndex', this.data.get('value'))
        }, 50)
        this.watchProps()
    },
    watchProps () {
        this.watch('value', value => {
            this.data.set('currentIndex', value)
        })
        this.watch('currentIndex', () => {
            this.getActive()
        })
        this.watch('position', value => {
            findSlotNodeComponentsDownward(this, prefixCls + '-item').forEach(item => {
                item.setProps('position', value)
            })
        })
    },
    getActive () {
        const activeKey = this.getOpenedKeys()
        findSlotNodeComponentsDownward(this, prefixCls + '-item').forEach((child, index) => {
            const name = child.data.get('name') || (index + 1).toString()
            child.data.set('isOpened', activeKey.indexOf(name) > -1)
            child.data.set('index', index + 1)
        })
    },
    getOpenedKeys () {
        let {accordion, currentIndex} = this.data.get()
        let activeKey = currentIndex || []
        if (!Array.isArray(activeKey)) {
            activeKey = [activeKey]
        }
        if (accordion && activeKey.length > 1) {
            activeKey = [activeKey[0]]
        }
        for (let i = 0; i < activeKey.length; i++) {
            activeKey[i] = activeKey[i].toString()
        }
        return activeKey
    },
    handleToggle (option) {
        let {accordion} = this.data.get()
        const name = option.name.toString()
        let openedArr = []
        if (accordion) {
            if (!option.isOpened) {
                openedArr.push(name)
            }
        } else {
            let openedKeys = this.getOpenedKeys()
            const nameIndex = openedKeys.indexOf(name)
            if (option.isOpened) {
                if (nameIndex > -1) {
                    openedKeys.splice(nameIndex, 1)
                }
            } else {
                if (nameIndex < 0) {
                    openedKeys.push(name)
                }
            }
            openedArr = openedKeys
        }
        this.data.set('currentIndex', deepCopy(openedArr))
        this.fire('change', {
            currentName: option.name,
            openedNames: openedArr
        })
    },
    messages: {
        'toggle' (option) {
            this.handleToggle(option.value)
        }
    },
    computed: {
        classCls () {
            let simple = this.data.get('simple')
            let classArr = [`${prefixCls}`]
            if (simple) classArr.push(`${prefixCls}-simple`)
            return classArr
        }
    }
})
