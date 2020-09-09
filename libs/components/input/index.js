import san from 'san'
import { prefix } from '../../utils/common'
import Icon from '../icon/icon'

const prefixCls = prefix + 'input'

module.exports = san.defineComponent({
    template: `
        <div style="{{inputLabelBoxStyle}}">
            <span s-if="label && !fixed" class="{{labelNoFixed}}" style="{{labelStyle}}">{{label}}</span>
            <div class="{{inputWrapperCss}}" style="{{inputBoxStyle}}">
                <div class="{{inputPrefixArea}}" s-if="prefix || ifShowprefix" on-click="clickPrefix">
                    <div s-if="prefix" class="{{inputPrefix}}">
                         <b-icon type="{{prefix}}"   size="15"></b-icon>
                    </div>
                    <slot s-else name="prefix"></slot>
                </div>
                <div class="{{inputPrepend}}" s-if="(ifShowprepend && !label) || (label && fixed)">
                    <span s-if="label" style="{{labelStyle}}">{{label}}</span>
                    <slot s-else name="prepend"></slot>
                </div>
                <input s-if="ifShowPlaceHolder"  s-ref="thisPlaceHolder"
                    value="{{placeholder}}"  style="{{inputStyle}}"
                    class="{{[...cssList,inputPlaceHolder]}}" on-focus="focusPlaceHolder"/>
                <input s-else-if="getInputType === 'text'" s-ref="thisInput"
                   style="{{inputStyle}}" autocomplete="{{ifAutocomplete}}"
                    class="{{cssList}}" value="{= value =}" name="{{name}}"
                    maxlength="{{getMaxlength}}" readonly="{{readonly}}" type="text"
                    disabled="{{disabled}}" spellcheck="{{spellcheck}}"
                    
                    on-change="onChange($event)" on-focus="onFocus($event)" on-blur="onBlur($event)"
                    on-keyup="onKeyup($event)" on-keydown="onKeydown($event)" on-keypress="onKeypress($event)"
                />
                <input s-else s-ref="thisInput"
                   style="{{inputStyle}}" spellcheck="{{spellcheck}}"
                    class="{{cssList}}" value="{= value =}" name="{{name}}"
                    maxlength="{{getMaxlength}}" readonly="{{readonly}}" type="password"
                    disabled="{{disabled}}"
                    
                    on-change="onChange($event)" on-focus="onFocus($event)" on-blur="onBlur($event)"
                    on-keyup="onKeyup($event)" on-keydown="onKeydown($event)" on-keypress="onKeypress($event)"
                />
                <div class="{{inputIconAeaCss}}" style="{{clearStyle}}">
                    <div class="{{inputClearCss}}" s-if="ifShowClearIcon" on-click="clearThisInput">
                        <b-icon type="shibai-mian" color="#ccc" size="15" ></b-icon>
                    </div>
                </div>
                <div class="{{inputSuffixArea}}" s-if="suffix || ifSearch || ifShowPasswordIcon || slot('suffix')[0]['children'].length" on-click="clickSuffix">
                    <div s-if="suffix || ifSearch || ifShowPasswordIcon" class="{{inputSuffix}}">
                        <b-icon  type="{{ifSearch? 'chaxun' : (ifShowPasswordIcon ? (showPassword ? 'xianshi': 'yincang'): suffix)}}"
                            size="15"></b-icon>
                    </div>
                    <slot s-else name="suffix"></slot>
                </div>
                <div class="{{inputAppend}}" s-if="ifShowappend" s-ref="thisAppend">
                    <slot name="append"></slot>
                </div>
            </div>
        </div>
    `,
    initData () {
        return {
            value: '',
            type: 'text',
            width: '100%',
            prefixCls: prefixCls,
            placeholder: '请输入',
            maxlength: Infinity,
            readonly: false,
            disabled: false,
            size: 'normal',
            clearable: false,
            label: '',
            labelWidth: '',
            labelAlign: 'center',
            fixed: false,
            prefix: '',
            suffix: '',
            ifFocusPlaceholder: false,
            ifShowprefix: true,
            ifShowsuffix: true,
            ifShowprepend: true,
            ifShowappend: true,
            autofocus: false,
            clearStyle: '',
            showPassword: false,
            oneIcon: true,
            name: '',
            autocomplete: true, // 原生的自动完成功能
            spellcheck: true, // 是否对元素内容进行拼写检查
            visibilityToggle: false// 是否显示密码切换按钮
        }
    },
    components: {
        'b-icon': Icon
    },
    computed: {
        // 是否自动完成
        ifAutocomplete () {
            return this.data.get('autocomplete') ? 'on' : 'off'
        },
        // input 能键入的最大字符数
        getMaxlength () {
            return +this.data.get('maxlength') || Infinity
        },
        // input 的style
        inputStyle () {
            return `width:100%`
        },
        // inputBox 的style
        inputBoxStyle () {
            let width = this.data.get('width')
            let inputWidth = (+width ? `${width}px` : width)
            return `width:${inputWidth}`
        },
        // 具有外标签的input盒子的style
        inputLabelBoxStyle () {
            if (this.data.get('label') && !this.data.get('fixed')) {
                return 'display:table'
            } else {
                return ''
            }
        },
        // label的style
        labelStyle () {
            let width = this.data.get('labelWidth')
            let labelAlign = this.data.get('labelAlign')
            let labelWidth = (+width ? `${width}px` : width)
            return `width:${labelWidth};display:inline-block;text-align:${labelAlign};`
        },
        // 获取input的type
        getInputType () {
            if (this.data.get('type').toLocaleLowerCase() === 'password' && !this.data.get('showPassword')) {
                return 'password'
            } else {
                return 'text'
            }
        },
        // input 的cssList
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
        // input 的placeholder
        inputPlaceHolder () {
            return `${prefixCls}-placeholder`
        },
        // label 无fixed的css
        labelNoFixed () {
            return `${prefixCls}-label-no-fixed`
        },
        // input 外部区域的css
        inputWrapperCss () {
            let inputWrapper = `${prefixCls}-wrapper-ct`
            let ifSearch = this.data.get('ifSearch')
            let ifPassword = this.data.get('ifPassword')
            // 搜索框和密码框的icon不能和clear的icon重合
            let oneIcon = (ifPassword || ifSearch) ? false : this.data.get('oneIcon')
            let ifShowClearIcon = this.data.get('ifShowClearIcon')
            let prefix = this.data.get('prefix') || this.data.get('ifShowprefix')
            let suffix = this.data.get('suffix') || ifSearch || this.data.get('ifShowPasswordIcon') || this.data.get('ifShowsuffix')
            let label = this.data.get('label')
            let fixed = this.data.get('fixed')
            let labelNotFixed = label && !fixed
            let inputWrapperWithLabelNotFixed = `${inputWrapper}-label-not-fixed`
            let prepend = (this.data.get('ifShowprepend') && !label) || (label && fixed)
            let append = this.data.get('ifShowappend')
            let size = this.data.get('size')
            let inputWithPrefixCss = `${prefixCls}-with-prefix`
            let inputNotWithPrefixCss = `${prefixCls}-not-with-prefix`
            let inputWithSuffixCss = `${prefixCls}-with-suffix`
            let inputNotWithSuffixCss = `${prefixCls}-not-with-suffix`
            let inputWithPrependCss = `${prefixCls}-with-prepend`
            let inputNotWithPrependCss = `${prefixCls}-not-with-prepend`
            let inputWithAppendCss = `${prefixCls}-with-append`
            let inputNotWithAppendCss = `${prefixCls}-not-with-append`
            let inputOneIcon = `${prefixCls}-one-icon`
            let inputNotOneIcon = `${prefixCls}-not-one-icon`
            let inputShowClearIcon = `${prefixCls}-show-clear-icon`
            let inputNotShowClearIcon = `${prefixCls}-not-show-clear-icon`
            return [inputWrapper, `${inputWrapper}-${size}`,
                ...(labelNotFixed ? [inputWrapperWithLabelNotFixed] : ['']),
                ...(oneIcon ? [inputOneIcon] : [inputNotOneIcon]),
                ...(ifShowClearIcon ? [inputShowClearIcon] : [inputNotShowClearIcon]),
                ...(prepend ? [inputWithPrependCss] : [inputNotWithPrependCss]),
                ...(append ? [inputWithAppendCss] : [inputNotWithAppendCss]),
                ...(prefix ? [inputWithPrefixCss] : [inputNotWithPrefixCss]),
                ...(suffix ? [inputWithSuffixCss] : [inputNotWithSuffixCss])
            ]
        },
        // input的icon所在区域
        inputIconAeaCss () {
            return `${prefixCls}-icon-area`
        },
        // 清空功能css
        inputClearCss () {
            return `${prefixCls}-clear-icon`
        },
        // input的头部图标所在区域
        inputPrefixArea () {
            return `${prefixCls}-prefix-area`
        },
        // input的头部图标
        inputPrefix () {
            return `${prefixCls}-prefix`
        },
        // input的头部图标所在区域
        inputSuffixArea () {
            return `${prefixCls}-suffix-area`
        },
        // input的头部图标
        inputSuffix () {
            let ifSearch = this.data.get('ifSearch')
            let ifShowPasswordIcon = this.data.get('ifShowPasswordIcon')
            let showPassword = this.data.get('showPassword')
            let inputSearch = `${prefixCls}-search`
            let inputNotSearch = `${prefixCls}-not-search`
            let inputPassword = `${prefixCls}-password`
            let inputNotPassword = `${prefixCls}-not-password`
            let inputShowPassword = `${prefixCls}-show-password`
            let inputNotShowPassword = `${prefixCls}-not-show-password`
            return [`${prefixCls}-suffix`,
                ...[ifSearch ? inputSearch : inputNotSearch],
                ...[showPassword ? inputShowPassword : inputNotShowPassword],
                ...[ifShowPasswordIcon ? inputPassword : inputNotPassword]
            ]
        },
        // input 前置的slot复合型区域
        inputPrepend () {
            return `${prefixCls}-prepend`
        },
        // input 后置的slot复合型区域
        inputAppend () {
            return `${prefixCls}-append`
        },
        // 是否展示placeholder区域
        ifShowPlaceHolder () {
            let ifFocusPlaceholder = this.data.get('ifFocusPlaceholder')
            let value = this.data.get('value')
            let readonly = this.data.get('readonly')
            let disabled = this.data.get('disabled')
            return !value && !readonly && !disabled && !ifFocusPlaceholder
        },
        // 是否是搜索框
        ifSearch () {
            return this.data.get('type').toLocaleLowerCase() === 'search'
        },
        // 是否是密码框
        ifPassword () {
            return this.data.get('type').toLocaleLowerCase() === 'password'
        },
        // 是否展示clearIcon
        ifShowClearIcon () {
            return this.data.get('clearable') && this.data.get('value')
        },
        // 是否是密码切换按钮
        ifShowPasswordIcon () {
            return this.data.get('type').toLocaleLowerCase() === 'password' && !!this.data.get('visibilityToggle') && !!this.data.get('value')
        }
    },
    // 组件创建
    created () {
        // 当 placeholder 区域隐藏，input展示的时候，对input 进行手动聚焦。
        this.watch('ifShowPlaceHolder', (val) => {
            if (!val) {
                setTimeout(() => {
                    this.data.get('ifFocusPlaceholder') && this.ref('thisInput') && this.ref('thisInput').focus()
                }, 1)
            }
        })
    },
    attached () {
        // 判断是否展示前缀图标区域
        this.setIfShowPrefixOrSuffix('prefix')
        // 判断是否展示后缀图标区域
        this.setIfShowPrefixOrSuffix('suffix')
        // 判断是否展示前缀slot区域
        this.setIfShowPrefixOrSuffix('prepend')
        // 判断是否展示后缀slot区域
        this.setIfShowPrefixOrSuffix('append')
        // 自动获取焦点
        this.data.get('autofocus') && this.focus()
        // 当有后缀slot时 ,设置清除按钮的位置
        this.data.get('ifShowappend') && this.setClearPosition()
    },
    // 当有后缀slot时，设置清除按钮的位置
    setClearPosition () {
        let appendWidth = this.ref('thisAppend') ? this.ref('thisAppend').offsetWidth : 0
        this.data.set('clearStyle', `right:${appendWidth}px`)
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
    // 设置是否具有前缀图标
    setIfShowPrefixOrSuffix (type = 'prefix') {
        let propsVal = this.data.get(type) || false
        let targetSlot = (this.slot ? this.slot(type) : [{}])[0] || {}
        let lth = (targetSlot['children'] || []).length
        let ifShow = !!propsVal || lth
        this.data.set(`ifShow${type}`, ifShow)
    },
    /**  原生事件start **/
    onChange ($event) {
        this.fire('change', this.getEvent($event))
    },
    onFocus ($event) {
        this.data.set('ifFocusPlaceholder', true)
        this.fire('focus', this.getEvent($event))
    },
    onBlur ($event) {
        this.data.set('ifFocusPlaceholder', false) // 鼠标挪开后，展示placeholder
        this.fire('blur', this.getEvent($event))
    },
    onKeyup ($event) {
        this.fire('keyup', this.getEvent($event))
    },
    onKeydown ($event) {
        let thisEvent = this.getEvent($event)
        this.fire('keydown', thisEvent)
        this.onEnter(thisEvent)
    },
    onKeypress ($event) {
        this.fire('keypress', this.getEvent($event))
    },
    /**  原生事件end **/
    // 按下 enter 键事件
    onEnter (thisEvent) {
        if (this.getKeyCode(thisEvent) === 13) {
            let value = this.getTarget(thisEvent).value
            if (this.data.get('ifSearch')) {
                this.fire('search', value)
            }
            this.fire('enter', value)
        }
    },
    // 对event进行兼容性处理，并获取
    getEvent ($event) {
        return $event || window.event
    },
    // 对target进行兼容性处理，并获取
    getTarget (thisEvent) {
        return thisEvent.target || thisEvent.srcElement
    },
    // 对code进行兼容性处理，并获取
    getKeyCode (thisEvent) {
        return thisEvent.keyCode || thisEvent.which || thisEvent.charCode
    },
    // 清空input的值
    clearThisInput () {
        console.log('clearThisInput')
        this.data.set('value', '', {force: true})
        this.fire('clear')
    },
    // 点击后缀图标触发的事件
    clickSuffix () {
        let value = this.data.get('value')
        if (this.data.get('ifSearch')) {
            this.fire('search', value)
        }
        if (this.data.get('ifShowPasswordIcon')) {
            let showPassword = this.data.get('showPassword')
            this.data.set('showPassword', !showPassword)
        }
        this.fire('click-suffix', value)
    },
    // 点击前缀图标触发的事件
    clickPrefix () {
        let value = this.data.get('value')
        this.fire('click-prefix', value)
    },
    // 点击 placeHolder 区域时，取消 placeHolder 的展示
    focusPlaceHolder () {
        this.data.set('ifFocusPlaceholder', true)
    }
})
