/**
 * @author 靳宏灿
 * @date 2019/5/27
 * @time 下午4:10
 * @Description: input组件
 */
import san from 'san'
import { prefix } from '../../utils/common'
import Icon from '../icon/icon'

const prefixCls = prefix + 'input-number'

module.exports = san.defineComponent({
    template: `
        <div class="{{wrapperCss}}">
            <input s-if="ifShowPlaceHolder"  s-ref="thisPlaceHolder"
                value="{{placeholder}}"  style="{{inputNumberStyle}}"
                class="{{[...cssList,inputNumberPlaceHolder]}}" on-focus="focusPlaceHolder"/>
            <input s-else value="{= value =}" style="{{inputNumberStyle}}" class="{{cssList}}"
                readonly="{{readonly}}"  disabled="{{disabled}}" type="text"
                
                s-ref="thisInput"
                
                  on-focus="onFocus($event)" on-blur="onBlur($event)"
                on-keyup="onKeyup($event)" on-keydown="onKeydown($event)" on-keypress="onKeypress($event)"
                on-compositionstart="onCompositionstart($event)" on-compositionend="onCompositionend($event)"
                on-paste="onPaste($event)"
            />
            <div class="{{iconAreaCss}}">
                <div class="{{iconAddCss}}" on-click="up">
                    <b-icon type="shang" size="12" ></b-icon>
                </div>
                <div class="{{iconSubtractCss}}" on-click="down">
                    <b-icon type="xia" size="12"  ></b-icon>
                </div>
            </div>
        </div>
    `,
    initData () {
        return {
            value: '',
            prefixCls,
            width: '100%',
            readonly: false,
            disabled: false,
            placeholder: '请输入',
            size: 'normal',
            autofocus: false,
            editable: true,
            ifFocusPlaceholder: false,
            ifPasteValue: 0,
            step: 1,
            max: Infinity,
            min: -Infinity,
            precision: ''
        }
    },
    components: {
        'b-icon': Icon
    },
    computed: {
        // input-number外层框的class
        wrapperCss () {
            let size = this.data.get('size')
            let wrapper = `${prefixCls}-wrapper`
            return [wrapper, `${wrapper}-${size}`]
        },
        // input-number中input的class
        cssList () {
            let disabled = this.data.get('disabled')
            let readonly = this.data.get('readonly')
            let inputDisabledCss = `${prefixCls}-disabled`
            let inputUnDisabledCss = `${prefixCls}-un-disabled`
            let inputReadonlyCss = `${prefixCls}-readonly`
            let inputUnReadonlyCss = `${prefixCls}-un-readonly`
            return [prefixCls,
                ...(disabled ? [inputDisabledCss] : [inputUnDisabledCss]),
                ...(readonly ? [inputReadonlyCss] : [inputUnReadonlyCss])
            ]
        },
        // input-number 的style
        inputNumberStyle () {
            let width = this.data.get('width')
            let inputWidth = (+width ? `${width}px` : width)
            // ie8 以及 ie8之前禁用中文输入法
            return `width:${inputWidth};ime-mode:disabled;-ms-ime-mode:disabled;`
        },
        // 是否展示placeholder区域
        ifShowPlaceHolder () {
            let ifFocusPlaceholder = this.data.get('ifFocusPlaceholder')
            let value = this.data.get('value')
            let readonly = this.data.get('readonly')
            let disabled = this.data.get('disabled')
            return (!value && value !== 0) && !readonly && !disabled && !ifFocusPlaceholder
        },
        // input-number 的placeholder
        inputNumberPlaceHolder () {
            return `${prefixCls}-placeholder`
        },
        // 右侧按钮的区域
        iconAreaCss () {
            return `${prefixCls}-icon-area`
        },
        // 右侧增加数值的按钮
        iconAddCss () {
            return `${prefixCls}-icon-add`
        },
        // 右侧减少数值的按钮
        iconSubtractCss () {
            return `${prefixCls}-icon-subtract`
        }
    },
    // 组件创建
    created () {
        this.watch('value', (val) => {
            this.inspectIfPointAtHead(val)
            this.onChange()
        })
        // 当 placeholder 区域隐藏，input展示的时候，对input 进行手动聚焦。
        this.watch('ifShowPlaceHolder', (val) => {
            if (!val) {
                setTimeout(() => {
                    this.ref('thisInput') && this.ref('thisInput').focus()
                }, 1)
            }
        })
        // 监听是否执行了粘贴操作，并格式化 value
        this.watch('ifPasteValue', (val) => {
            setTimeout(() => {
                this.formatValue()// 粘贴后，格式化数值
            }, 1)
        })
        // 初始化的时候，格式化数值
        this.formatValue()
    },
    attached () {
        // 自动获取焦点
        if (this.data.get('autofocus')) {
            setTimeout(() => {
                this.focus()
            }, 1)
        }

        setTimeout(() => {
            let formatter = this.data.get('formatter')
            console.log('formatter', formatter)
        }, 1)
    },
    // 此input自动获取焦点
    focus () {
        let ifShowPlaceHolder = this.data.get('ifShowPlaceHolder')
        if (!ifShowPlaceHolder) {
            setTimeout(() => {
                this.ref('thisInput') && this.ref('thisInput').focus()
            }, 1)
        } else {
            this.data.set('ifFocusPlaceholder', true)
        }
    },
    // 手动使此input框失焦
    blur () {
        setTimeout(() => {
            this.ref('thisPlaceHolder') && this.ref('thisPlaceHolder').blur()
            this.ref('thisInput') && this.ref('thisInput').blur()
        }, 1)
    },
    // 点击 placeHolder 区域时，取消 placeHolder 的展示
    focusPlaceHolder () {
        this.data.set('ifFocusPlaceholder', true)
    },

    /** 事件 start **/
    // 对event进行兼容性处理，并获取
    getEvent ($event) {
        return $event || window.event
    },
    // 对target进行兼容性处理，并获取
    getTarget (thisEvent) {
        return thisEvent.target || thisEvent.srcElement
    },
    // 取消事件触发
    cancelEvent (thisEvent) {
        if (thisEvent.preventDefault) {
            thisEvent.preventDefault()
        } else {
            thisEvent.returnValue = false
        }
    },
    // 若 editable 为false，则禁止光标进入
    onFocus ($event) {
        if (this.data.get('editable')) {
            this.data.set('ifFocusPlaceholder', true)
            this.fire('focus', this.getEvent($event))
        } else {
            this.ref('thisInput') && this.ref('thisInput').blur()
        }
    },
    // 在失焦的时候，对精度和最大最小值范围进行控制一下。此处没有做实时控制，是为了用户体验考虑，这样更灵活
    onBlur ($event) {
        this.formatValue({ifBlur: true})
        this.data.set('ifFocusPlaceholder', false)
        this.fire('blur', this.getEvent($event))
    },
    // 数值发生改变时触发
    onChange () {
        let value = this.data.get('value')
        this.fire('change', value.toString())
    },
    // 按键谈起事件，并对特殊字符进行处理。
    onKeyup ($event) {
        let thisEvent = this.getEvent($event)
        // console.log('onKeyup', thisEvent)
        // 对长横线特殊处理
        if (thisEvent.keyCode === 189 && !!thisEvent.shiftKey) {
            this.formatValue() // 排除按住shift和减号按键的时候造成的影响，格式化value
        }
        this.fire('keyup', thisEvent)
    },
    // 按下按键时，判断是否是上下键，进行增减
    onKeydown ($event) {
        let thisEvent = this.getEvent($event)
        if (thisEvent.keyCode === 38) {
            thisEvent.preventDefault()
            this.up()
        } else if (thisEvent.keyCode === 40) {
            thisEvent.preventDefault()
            this.down()
        }
        // console.log('onKeydown', thisEvent)
        this.fire('keydown', thisEvent)
    },
    // 在键盘按下时，对键位进行检测，约束输入值，使其规范
    onKeypress ($event) {
        let thisEvent = this.getEvent($event)
        // 检测键入的值是否合规
        this.inspectKeyCodeIfCompliance(thisEvent)
        this.fire('keypress', thisEvent)
    },
    // 粘贴事件，未在此处对数值进行格式化，因为在ie8上会有bug
    onPaste ($event) {
        setTimeout(() => {
            let ifPasteValue = this.data.get('ifPasteValue')
            this.data.set('ifPasteValue', ++ifPasteValue)
        }, 1)
    },
    // 中文输入法开始
    onCompositionstart ($event) {
        let thisEvent = this.getEvent($event)
        console.log('onCompositionstart', thisEvent)
        this.cancelEvent(thisEvent)
    },
    // 中文输入法结束
    onCompositionend ($event) {
        let thisEvent = this.getEvent($event)
        console.log('onCompositionend', thisEvent)
        this.cancelEvent(thisEvent)
        this.formatValue() // 中文输入法结束后，对数据格式化
    },
    /** 事件 end **/

    /** onKeypress 事件中控制键入的值合规 start **/
    // 检测键入的值是否合规
    inspectKeyCodeIfCompliance (thisEvent) {
        let value = this.data.get('value')
        let keyCode = thisEvent.keyCode
        if (this.inspectKeyCodeRange(keyCode) || this.inspectFloatPoint(keyCode, value) || this.inspectUpAndDownPosition(keyCode, value)) {
            this.cancelEvent(thisEvent)
        }
    },
    // 检测按下的键位是否在"-"(45),"."(46),"0~9"之间
    inspectKeyCodeRange (keyCode) {
        return (keyCode !== 8 && keyCode !== 46 && keyCode !== 45 && keyCode < 48) || keyCode > 57
    },
    // 检测小数点是否合规，小数点只能有一个
    inspectFloatPoint (keyCode, value) {
        return keyCode === 46 && value.indexOf('.') > -1
    },
    // 正负号只能有一个，且必须在首位
    inspectUpAndDownPosition (keyCode, value) {
        let thisInput = this.ref('thisInput')

        // 正负号必须在首位
        let position = 0
        if (thisInput.selectionStart) {
            position = thisInput.selectionStart
        } else {
            try {
                let range = document.selection.createRange()
                range.collapse(false)
                range.setEndPoint('StartToStart', thisInput.createTextRange())
                position = range.text.length
            } catch (e) {
                position = 0
            }
        }
        return keyCode === 45 && (value.indexOf('-') > -1 || position !== 0)
    },
    /** 控制键入的值合规 end **/

    /** 检测输入的值是否符合规范start **/
    // 检测在首位是否是小数点
    inspectIfPointAtHead (val) {
        if (val === '.') {
            setTimeout(() => {
                this.setValue('0.')
            }, 1)
            return false
        }
        return true
    },
    // 强制将数值放在max和min之间,并将返回判断结果
    forceInRange (val) {
        let {max, min} = this.data.get()
        let ifInRange = true
        if (val > max) {
            val = max
            ifInRange = false
        } else if (val < min) {
            val = min
            ifInRange = false
        }
        if (!ifInRange) {
            setTimeout(() => {
                this.setValue(val)
            }, 1)
        }
        return ifInRange
    },
    // 检测输入的值是否符合规范，并且修复，最后返回是否校验通过
    inspectValueIfComplianceAndRepair (val) {
        let ifPointAtHead = this.inspectIfPointAtHead(val)
        let inRange = this.forceInRange(val)
        return ifPointAtHead && inRange
    },
    // 格式化value
    formatValue ({ifBlur = false} = {}) {
        let value = this.data.get('value')
        value = this.getValue(value).toString()
        if (this.inspectValueIfComplianceAndRepair(value)) {
            this.setValue(value, {ifBlur})
        }
    },
    // 排除冗余值的干扰
    getValue (val) {
        if (val !== 0 && val !== '0') {
            return parseFloat(val) || ''
        } else {
            return 0
        }
    },
    /** 检测输入的值是否符合规范 end **/

    /** 按下上下键，点击上下按钮触发数据更新 start **/
    // 点击进行增加数值
    up () {
        if (!this.data.get('readonly') && !this.data.get('disabled')) {
            let {value, step} = this.data.get()
            let nextVal = this.addNum(+value, +step)
            if (this.forceInRange(nextVal)) {
                this.setValue(nextVal)
            }
        }
    },
    // 点击进行减少数值
    down () {
        if (!this.data.get('readonly') && !this.data.get('disabled')) {
            let {value, step} = this.data.get()
            let nextVal = this.addNum(+value, -step)
            if (this.forceInRange(nextVal)) {
                this.setValue(nextVal)
            }
        }
    },
    // 计算数值
    addNum (num1, num2) {
        let sq1, sq2, m
        try {
            sq1 = num1.toString().split('.')[1].length
        } catch (e) {
            sq1 = 0
        }
        try {
            sq2 = num2.toString().split('.')[1].length
        } catch (e) {
            sq2 = 0
        }
        m = Math.pow(10, Math.max(sq1, sq2))
        return (Math.round(num1 * m) + Math.round(num2 * m)) / m
    },
    /** 按下上下键，点击上下按钮触发数据更新 end **/

    // 设置 value ，并对精度进行控制
    setValue (val, {ifBlur} = {}) {
        let precision = this.data.get('precision')
        if (!!precision || precision === 0 || precision === '0') {
            val = (+val).toFixed(precision)
        }
        this.data.set('value', val.toString())
    }
})
