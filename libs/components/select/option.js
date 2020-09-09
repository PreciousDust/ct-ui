import san from 'san'
import { prefix } from '../../utils/common'

const prefixCls = prefix + 'select-option'

module.exports = san.defineComponent({
    template: `
        <li class="{{optionCssList}}" on-click="onClick">
            {{showText}}
        </li>
    `,
    initData () {
        return {
            label: '',
            value: '',
            disabled: false,
            currentValue: '',
            className: '',
            showLabelWidthValue: false,
            allOption: false,
            ifClear: false,
            clickThis: false
        }
    },
    components: {
    },
    computed: {
        optionCssList () {
            let ifSelected = this.data.get('ifSelected')
            let disabled = this.data.get('disabled')
            let className = this.data.get('className')
            let ifSelectedCss = `${prefixCls}-selected`
            let ifNotSelectedCss = `${prefixCls}-un-selected`
            let disabledCss = `${prefixCls}-disabled`
            let unDisabledCss = `${prefixCls}-un-disabled`
            return [
                prefixCls, className,
                ...[ifSelected ? [ifSelectedCss] : [ifNotSelectedCss]],
                ...[disabled ? [disabledCss] : [unDisabledCss]]
            ]
        },
        ifSelected () {
            let currentValue = this.data.get('currentValue')
            let ifClear = this.data.get('ifClear')
            let value = this.data.get('value')
            let allOption = this.data.get('allOption')
            let clickThis = this.data.get('clickThis')
            // 如果点击了清空按钮，则强制清空选择状态
            if (ifClear) {
                return false
            }
            // 全部按钮未点击的话不会处于选择状态
            if (allOption && !clickThis) {
                return false
            }
            return currentValue === value
        },
        // 展示的文本
        showText () {
            let label = this.data.get('label')
            let value = this.data.get('value')
            let showLabelWidthValue = this.data.get('showLabelWidthValue')
            if (showLabelWidthValue) {
                return `${label}(${value})`
            }
            return label
        }
    },
    onClick () {
        let {value, label, disabled, allOption} = this.data.get()
        if (!disabled) {
            this.data.set('clickThis', true)
            this.dispatch('option:click', {value, label, allOption})
        }
    }
})
