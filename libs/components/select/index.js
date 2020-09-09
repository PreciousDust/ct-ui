import san from 'san'
import { prefix } from '../../utils/common'
import Icon from '../icon/icon'
import Option from './option'
import Drop from '../drop'

const {addEvent, removeEvent} = require('../../utils/dom')
const prefixCls = prefix + 'select'

module.exports = san.defineComponent({
    template: `
        <div class="{{wrapperCssList}}" style="{{wrapperStyle}}">
            <div class="{{cssList}}" s-ref="reference" on-click="changeOpen">
                {{showText || placeholder}}
            </div>
            <div class="{{clearAreaCssList}}">
                <div class="{{clearCssList}}" s-if="ifShowClearIcon" on-click="clear">
                    <ct-icon type="shibai-mian" color="#ccc" size="15" ></ct-icon>
                </div>
            </div>
            <div class="{{suffixAreaCssList}}" on-click="changeOpen">
                <ct-icon type="{{open?'shang':'xia'}}" size="15"></ct-icon>
            </div>
            <ct-drop className="{{optionBoxCssList}}"
                style="display:{{ !disabled && !readonly && options.length && open ? 'block' :'none' }}"
                placement="{{placement}}" width="{{dropWidth}}"
                >

                <ul>
                    <ct-option s-if="ifHaveAll"  label="{{allLabel}}"
                        labelInValue="{{labelInValue}}" currentValue="{{value}}"
                        className="{{optionClassName}}"  value="{{allValue}}"
                        allOption ifClear="{{ifClear}}"
                    ></ct-option>
                    <ct-option s-for="item in options" value="{{item.value}}" label="{{item.label}}"
                        labelInValue="{{labelInValue}}" currentValue="{{value}}" disabled="{{item.disabled}}"
                        className="{{optionClassName}}" showLabelWidthValue="{{showLabelWidthValue}}"
                        ifClear="{{ifClear}}"
                    ></ct-option>
                    <slot></slot>
                </ul>
            </ct-drop>
        </div>
    `,
    initData () {
        return {
            value: '',
            allValue: '',
            allLabel: '全部',
            labelInValue: false,
            readonly: false,
            disabled: false,
            size: 'normal',
            options: [],
            open: false,
            placement: 'bottom-start',
            width: '100%',
            placeholder: '请选择',
            optionClassName: '',
            ifClear: false, // 是否点击了清空按钮
            clearable: false, // 是否具有清空功能
            ifHaveAll: false, // 是否具有全选按钮
            showLabelWidthValue: false // label和value是否在一起展示
        }
    },
    components: {
        'ct-icon': Icon,
        'ct-option': Option,
        'ct-drop': Drop
    },
    computed: {
        cssList () {
            let disabled = this.data.get('disabled')
            let readonly = this.data.get('readonly')
            let disabledCss = `${prefixCls}-disabled`
            let unDisabledCss = `${prefixCls}-un-disabled`
            let readonlyCss = `${prefixCls}-readonly`
            let unReadonlyCss = `${prefixCls}-un-readonly`
            return [`${prefixCls}`,
                ...(disabled ? [disabledCss] : [unDisabledCss]),
                ...(readonly ? [readonlyCss] : [unReadonlyCss])
            ]
        },
        wrapperCssList () {
            let size = this.data.get('size')
            let wrapper = `${prefixCls}-wrapper`
            return [`${wrapper}`, `${wrapper}-${size}`]
        },
        suffixAreaCssList () {
            return `${prefixCls}-suffix-area`
        },
        optionBoxCssList () {
            return `${prefixCls}-option-box`
        },
        clearAreaCssList () {
            return `${prefixCls}-clear-area`
        },
        clearCssList () {
            return `${prefixCls}-clear-icon`
        },
        ifShowClearIcon () {
            return (this.data.get('clearable') && this.data.get('value')) || this.data.get('clickAll')
        },
        // 展示的text
        showText () {
            let codeNameMap = this.data.get('codeNameMap')
            let value = this.data.get('value')
            let showLabelWidthValue = this.data.get('showLabelWidthValue')
            let clickAll = this.data.get('clickAll')
            let allLabel = this.data.get('allLabel')
            if (!value && !clickAll) {
                return ''
            }
            if (clickAll) {
                return allLabel
            }
            if (!showLabelWidthValue) {
                return codeNameMap[value]
            }
            return `${codeNameMap[value]}(${value})`
        },
        // code-name 对应的关系
        codeNameMap () {
            let options = this.data.get('options')
            let map = {}
            options.map((seg) => {
                map[seg.value] = seg.label
            })
            return map
        },
        wrapperStyle () {
            let width = this.data.get('width')
            let wrapperWidth = (+width ? `${width}px` : width)
            return `width:${wrapperWidth}`
        }
    },
    created () {
        // 监听 value 的改变，向外派发 change 和 select 的事件
        this.watch('value', (val) => {
            let {labelInValue} = this.data.get()
            if (labelInValue) {
                let res = this.getItem(val)
                this.fire('change', res)
                this.fire('select', res)
            } else {
                this.fire('change', val)
                this.fire('select', val)
            }
        })
        // 监听 open 属性，向外派发 open
        this.watch('open', (open) => {
            this.fire('open-change', open)
        })
    },
    attached () {
        addEvent(document, 'click', this.handleClickOutside.bind(this), this)
    },
    detached () {
        removeEvent(document, 'click', this)
    },
    handleClickOutside (event) {
        const target = event.target || event.srcElement
        if (!this.el.contains(target)) {
            this.data.set('open', false)
        }
    },
    messages: {
        'option:click': function (item) {
            let {allOption, value} = item.value
            this.data.set('value', value)
            this.data.set('clickAll', allOption) // 点击了 全选 选项的话，设置展示文字为 allLabel,和 空 作区分
            this.data.set('ifClear', false)
            this.changeOpen()
        }
    },
    // 获取对应value的item
    getItem (value) {
        let {options, clickAll, allValue, allLabel} = this.data.get()
        let item = {}
        options.map((seg) => {
            seg.value === value && (item = seg)
        })
        // 对全选按钮做处理
        if (clickAll) {
            return {label: allLabel, value: allValue}
        }
        return item
    },
    // 单击 select 框触发
    changeOpen (forceOpen) {
        let {open, disabled, readonly} = this.data.get()
        if (!disabled && !readonly) {
            this.data.set('open', typeof forceOpen === 'boolean' ? forceOpen : !open)
        }
    },
    // 清空这个select的value
    clear () {
        this.data.set('clickAll', false)
        this.data.set('ifClear', true)
        this.data.set('value', '', {force: true})
        this.changeOpen(false)
        this.fire('clear')
    }
})
