import san from 'san'
import { prefix } from '../../utils/common'
import Button from '../button/button'
const { DataTypes } = require('san')
const prefixCls = prefix + 'modal'
module.exports = san.defineComponent({
    template: `
        <div
            class='{{prefixCls}}'
            style="{{showType}}">
            <div
                class='{{prefixCls + "-main"}}'
                style="{{boxStyle}}">
                <div class='{{prefixCls + "-title"}}'>
                    <slot name='title'>
                        {{title}}
                    </slot>
                    <b s-if='{{closable}}' on-click='close' class='{{prefixCls + "-close"}}'>&#215;</b>
                </div>
                <div class='{{prefixCls + "-content"}}'>
                    <slot></slot>
                </div>
                <div class='{{prefixCls + "-footer"}}'>
                    <slot name='footer'>
                        <b-button type='primary' on-click='confirm'>确定</b-button>
                        <b-button on-click='cancel'>取消</b-button>
                    </slot>
                </div>
            </div>
        </div>
    `,
    initData () {
        return {
            prefixCls,
            clientWidth: '',
            // props:
            title: '弹窗名称',
            show: false,
            closable: true,
            width: 620,
            drag: false
        }
    },
    dataTypes: {
        title: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        show: DataTypes.bool,
        closable: DataTypes.bool,
        drag: DataTypes.bool,
        width: DataTypes.oneOfType([DataTypes.string, DataTypes.number])
    },
    components: {
        'b-button': Button
    },
    computed: {
        showType () {
            return this.data.get('show') ? 'display:block' : 'display:none'
        },
        boxStyle () {
            let width = this.data.get('width')
            let clientWidth = this.data.get('clientWidth')
            let displayCss = this.data.get('showType') ? 'block' : 'none'
            return {
                'width': width + 'px',
                'left': clientWidth / 2 - width / 2 + 'px',
                'display': displayCss
            }
        }
    },
    drag () {
        let oBox = this.el.querySelector(`.${prefixCls}-title`)
        let oList = this.el.querySelector(`.${prefixCls}-main`)
        if (oBox) {
            document.onmousemove = null
            // 按下鼠标
            oBox.onmousedown = event => {
                let evt = event || window.event
                // 起始鼠标到拖拽元素的位置
                let target = evt.target || evt.srcElement
                if (target.className === `${prefixCls}-close`) {
                    return
                }
                let width = evt.offsetX
                let height = evt.offsetY
                // 移动鼠标
                document.onmousemove = event => {
                    let evt = event || window.event
                    let left = evt.clientX - width
                    let top = evt.clientY - height
                    // 边界检测
                    if (left < 0) left = 0
                    if (left > document.documentElement.clientWidth - oBox.offsetWidth - 0) {
                        left = document.documentElement.clientWidth - oBox.offsetWidth
                    }
                    if (top < 0) top = 0
                    // 拖拽元素跟随鼠标
                    oList.style.left = left + 'px'
                    oList.style.top = top + 'px'
                }
                // 放开鼠标
                oBox.onmouseup = () => {
                    document.onmousemove = null
                }
            }
        }
    },
    attached () {
        let that = this
        if (this.data.get('drag')) {
            this.watch('show', value => {
                if (value) {
                    setTimeout(() => {
                        that.drag()
                    }, 50)
                }
            })
        }
        setTimeout(() => {
            let clientWidth = document.documentElement.clientWidth || document.body.clientWidth
            that.data.set('clientWidth', clientWidth)
        }, 50)
        window.onresize = () => {
            let clientWidth = document.documentElement.clientWidth || document.body.clientWidth
            that.data.set('clientWidth', clientWidth)
        }
    },
    close () {
        this.fire('close')
        this.data.set('show', false)
    },
    confirm () {
        this.fire('confirm')
        this.data.set('show', false)
    },
    cancel () {
        this.fire('cancel')
        this.data.set('show', false)
    }
})
