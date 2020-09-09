import san from 'san'
import { prefix } from '../../utils/common'
import Icon from '../icon/icon'

const prefixCls = prefix + 'textarea'

module.exports = san.defineComponent({
    template: `
        <div class="{{wrapper}}" s-ref="thisWrapper">
            <textarea s-if="ifShowPlaceHolder"  s-ref="thisPlaceHolder"
                        value="{{placeholder}}"  style="{{textareaStyle}}"
                        class="{{[...cssList,textareaPlaceHolder]}}" on-focus="focusPlaceHolder"
                        rows="{{rows}}"  wrap="{{wrap}}"
            />
            <textarea s-else value="{= value =}" readonly="{{readonly}}" class="{{cssList}}"
                disabled="{{disabled}}" maxlength="{{getMaxlength}}" style="{{textareaStyle}}"
                rows="{{rows}}" wrap="{{wrap}}"
                
                s-ref="thisTextarea"
                
                on-blur="onBlur($event)" on-change="onChange($event)" on-keydown="onKeydown($event)"
                on-focus="onFocus($event)" on-keyup="onKeyup($event)" on-keypress="onKeypress($event)"
            ></textarea>
            <div class="{{textareaClearCss}}" s-if="clearable && value" on-click="clearThisTextarea">
                <b-icon type="shibai-mian" size="15" color="#ccc"></b-icon>
            </div>
        </div>
    `,
    initData () {
        return {
            value: '',
            readonly: false,
            disabled: false,
            maxlength: Infinity,
            ifFocusPlaceholder: false,
            placeholder: '请输入',
            rows: '2',
            wrap: 'soft',
            wrapperWidth: 200,
            autofocus: false,
            clearable: false
        }
    },
    components: {
        'b-icon': Icon
    },
    computed: {
        // input 的cssList
        cssList () {
            return [prefixCls]
        },
        // 能键入的最大字符数
        getMaxlength () {
            return +this.data.get('maxlength') || Infinity
        },
        // 是否展示placeholder区域
        ifShowPlaceHolder () {
            let ifFocusPlaceholder = this.data.get('ifFocusPlaceholder')
            let value = this.data.get('value')
            let readonly = this.data.get('readonly')
            let disabled = this.data.get('disabled')
            return !value && !readonly && !disabled && !ifFocusPlaceholder
        },
        // textarea 的style
        textareaStyle () {
            let wrapperWidth = this.data.get('wrapperWidth')
            return `width:${wrapperWidth + 20}px;`
        },
        // textarea 的placeholder
        textareaPlaceHolder () {
            return `${prefixCls}-placeholder`
        },
        // textarea 清空功能的css
        textareaClearCss () {
            return `${prefixCls}-clear-icon`
        },
        // textarea 的外部框
        wrapper () {
            let clearable = this.data.get('clearable')
            let wrapper = `${prefixCls}-wrapper`
            let wrapperWithClear = `${wrapper}-width-clear`
            let wrapperNotWithClear = `${wrapper}-not-width-clear`
            let disabled = this.data.get('disabled')
            let readonly = this.data.get('readonly')
            let disabledCss = `${prefixCls}-disabled`
            let unDisabledCss = `${prefixCls}-un-disabled`
            let readonlyCss = `${prefixCls}-readonly`
            let unReadonlyCss = `${prefixCls}-un-readonly`
            return [wrapper,
                ...[clearable ? wrapperWithClear : wrapperNotWithClear],
                ...(disabled ? [disabledCss] : [unDisabledCss]),
                ...(readonly ? [readonlyCss] : [unReadonlyCss])
            ]
        }
    },

    // 组件创建
    created () {
        // 当 placeholder 区域隐藏，input展示的时候，对input 进行手动聚焦。
        this.watch('ifShowPlaceHolder', (val) => {
            if (!val) {
                setTimeout(() => {
                    this.ref('thisTextarea') && this.ref('thisTextarea').focus()
                }, 1)
            }
        })
    },
    attached () {
        // 此input自动获取焦点
        this.data.get('autofocus') && this.focus()
        this.nextTick(() => {
            this.getWrapperWidth()
        })
    },
    updated () {
        // this.getWrapperWidth()
    },
    // 获取wrapper的宽度
    getWrapperWidth () {
        let thisWrapper = this.el
        let wrapperWidth = thisWrapper.offsetWidth
        this.data.set('wrapperWidth', wrapperWidth)
    },
    // 点击 placeHolder 区域时，取消 placeHolder 的展示
    focusPlaceHolder () {
        this.data.set('ifFocusPlaceholder', true)
    },
    // 此 textarea 自动获取焦点
    focus () {
        let ifShowPlaceHolder = this.data.get('ifShowPlaceHolder')
        if (!ifShowPlaceHolder) {
            setTimeout(() => {
                this.ref('thisTextarea') && this.ref('thisTextarea').focus()
            }, 1)
        } else {
            this.data.set('ifFocusPlaceholder', true)
        }
    },
    // 手动使此 textarea 失焦
    blur () {
        setTimeout(() => {
            this.ref('thisPlaceHolder') && this.ref('thisPlaceHolder').blur()
            this.ref('thisTextarea') && this.ref('thisTextarea').blur()
        }, 1)
    },
    // 清空 value
    clearThisTextarea () {
        this.data.set('value', '', {force: true})
        this.fire('clear')
    },
    /** ** 事件 start ****/
    // 对event进行兼容性处理，并获取
    getEvent ($event) {
        return $event || window.event
    },
    // 对code进行兼容性处理，并获取
    getKeyCode (thisEvent) {
        return thisEvent.keyCode || thisEvent.which || thisEvent.charCode
    },
    // 对target进行兼容性处理，并获取
    getTarget (thisEvent) {
        return thisEvent.target || thisEvent.srcElement
    },
    onBlur ($event) {
        this.data.set('ifFocusPlaceholder', false)
        this.fire('blur', this.getEvent($event))
    },
    onChange ($event) {
        this.fire('change', this.getEvent($event))
    },
    onKeydown ($event) {
        let thisEvent = this.getEvent($event)
        this.fire('keydown', thisEvent)
        this.onEnter(thisEvent)
    },
    // 按下 enter 键事件
    onEnter (thisEvent) {
        if (this.getKeyCode(thisEvent) === 13) {
            let value = this.getTarget(thisEvent).value
            this.fire('enter', value)
        }
    },
    onKeypress ($event) {
        this.fire('keypress', this.getEvent($event))
    },
    onKeyup ($event) {
        this.fire('keyup', this.getEvent($event))
    },
    onFocus ($event) {
        this.data.set('ifFocusPlaceholder', true)
        this.fire('focus', this.getEvent($event))
    }
    /** ** 事件 end ****/

})
