const san = require('san')
const { Component } = require('san')
const Notice = require('./notice')
const { prefix } = require('../../utils/common')
const prefixCls = `${prefix}notice`

const NoticeWrapper = san.defineComponent({
    template: `
        <div 
            id="{{prefixCls}}-wrapper" 
            class="{{prefixCls}}-wrapper"
            style="{{wrapperStyle}}">
        </div>
    `,
    initData () {
        return {
            prefixCls,
            wrapperStyle: {
                right: '24px'
            }
        }
    }
})

function notice ({
    title = '',
    content = '',
    duration = 3000,
    showClose = true,
    show = true,
    type = 'info',
    showIcon = true,
    autoClose = true
}) {
    if (!document.getElementById(`${prefixCls}-wrapper`)) {
        new NoticeWrapper().attach(document.body)
    }

    new Notice({
        data: {
            showClose,
            title,
            content,
            duration,
            show,
            type,
            showIcon,
            autoClose
        }
    }).attach(document.getElementById(`${prefixCls}-wrapper`))
}

Component.prototype.$notice = notice

module.exports = notice
