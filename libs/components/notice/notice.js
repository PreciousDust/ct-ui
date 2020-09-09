const san = require('san')
const { DataTypes } = require('san')
const { prefix } = require('../../utils/common')
const prefixCls = `${prefix}notice`
const Icon = require('../icon/icon')

let timer = null

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            return window.setTimeout(callback, 1000 / 60)
        }
    )
}

module.exports = san.defineComponent({
    name: prefixCls,
    template: `
        <div s-transition="trans" class="{{classes}}" style="{{wrapperStyle}}">
            <b-icon  
                s-if="showIcon" 
                size="24"
                class="{{prefixCls}}-{{type}}-icon"
                type="{{iconType}}">
            </b-icon>
            <div class="{{prefixCls}}-body" style="{{bodyStyle}}">
                <div s-if="title" title="{{title}}" class="{{prefixCls}}-body-title">{{title}}</div>
                <div class="{{prefixCls}}-body-content" s-html="content"></div>
            </div>
            <b-icon 
                s-if="showClose"
                class="{{prefixCls}}-close"
                type="quxiao-guanbi-shanchu" 
                size="14"
                on-click="handleClose">
            </b-icon>
        </div>
    `,
    dataTypes: {
        show: DataTypes.bool,
        title: DataTypes.string,
        type: DataTypes.oneOf(['success', 'warning', 'error', 'info']),
        duration: DataTypes.number,
        showClose: DataTypes.bool,
        showIcon: DataTypes.bool,
        outoClose: DataTypes.bool
    },
    components: {
        'b-icon': Icon
    },
    initData () {
        return {
            prefixCls,
            show: false,
            // Props
            duration: 2000,
            showClose: false,
            showIcon: true,
            type: 'info',
            autoClose: true
        }
    },
    computed: {
        classes () {
            return [
                `${prefixCls}`,
                `${prefixCls}-${this.data.get('type')}`
            ]
        },
        wrapperStyle () {
            return {
                visibility: this.data.get('show') ? 'visible' : 'hidden'
            }
        },
        bodyStyle () {
            return {
                'margin-left': this.data.get('showIcon') ? '48px' : '12px'
            }
        },
        iconType () {
            const iconType = {
                warning: 'yichang-mian',
                info: 'xinxi-yiban-mian',
                error: 'shibai-mian',
                success: 'chenggong-mian'
            }
            return iconType[this.data.get('type')]
        }
    },
    attached () {
        const { duration, autoClose } = this.data.get()
        if (autoClose) {
            timer = setTimeout(() => {
                this.data.set('show', false)
                this.el.parentNode && this.el.parentNode.removeChild(this.el)
            }, duration)
        }
    },
    detached () {
        clearTimeout(timer)
    },
    handleClose () {
        clearTimeout(timer)
        this.data.set('show', false)
        this.el.parentNode && this.el.parentNode.removeChild(this.el)
        this.fire('close')
    },
    trans: {
        enter: function (el, done) {
            el.classList.add(`${prefixCls}-enter`)
            done()
        },
        leave: function (el, done) {
            el.classList.add(`${prefixCls}-leave`)
        }
    }
})
