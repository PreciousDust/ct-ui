/**
 * Created by gaoguoqing on 2019/6/25.
 *
 */
import san from 'san'
import { prefix } from '../../utils/common'
import Icon from '../icon/icon'
import { findComponentUpward } from '../../utils/findComponents'

const DataTypes = san.DataTypes
const prefixCls = prefix + 'collapse-item'

module.exports = san.defineComponent({
    name: prefixCls,
    template: `
        <div class="{{classCls}}">
            <div class="{{prefixCls+'-header'}}" on-click="handleToggle">
                <b-icon type="{{arrowType}}" class="{{arrow}}" s-if="showArrow"></b-icon>
                <slot name="title"></slot>
            </div>
            <div class="{{prefixCls+'-content'}}" style="{{showContent}}">
                <slot name="content"></slot>
            </div>
        </div>
    `,
    components: {
        'b-icon': Icon
    },
    dataTypes: {
        name: DataTypes.string,
        hideArrow: DataTypes.bool
    },
    initData () {
        return {
            isOpened: false,
            prefixCls: prefixCls,
            index: '',
            // props
            namee: '',
            // parent
            position: ''
        }
    },
    attached () {
        setTimeout(() => {
            let parent = findComponentUpward(this, prefix + 'collapse')
            this.data.set('position', parent.data.get('position'))
        }, 50)
    },
    setProps (props, value) {
        this.data.set(props, value)
    },
    handleToggle () {
        let {name, index, isOpened} = this.data.get()
        this.dispatch('toggle', {
            name: name || index,
            isOpened: isOpened
        })
    },
    computed: {
        showContent () {
            return this.data.get('isOpened') ? 'display:block' : 'display:none'
        },
        arrowType () {
            let isOpened = this.data.get('isOpened')
            return isOpened ? 'xia' : 'you'
        },
        arrow () {
            let position = this.data.get('position')
            let classArr = [`${prefixCls}-arrow`]
            if (position) classArr.push(`${prefixCls}-arrow-${position}`)
            return classArr
        },
        classCls () {
            let isOpened = this.data.get('isOpened')
            let classArr = [`${prefixCls}`]
            if (isOpened) classArr.push(`${prefixCls}-opened`)
            return classArr
        },
        showArrow () {
            let hideArrow = this.data.get('hideArrow')
            let position = this.data.get('position')
            return !hideArrow && !(position === 'hidden')
        }
    }
})
