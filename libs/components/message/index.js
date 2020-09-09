const san = require('san')
const { Component } = require('san')
const Notice = require('../notice/notice')
const { prefix } = require('../../utils/common')
const prefixCls = `${prefix}message`

const MessageWrapper = san.defineComponent({
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
                left: '50%',
                'margin-left': '-190px'
            }
        }
    }
})

function message ({
    content = '',
    duration = 3000,
    showClose = true,
    show = true,
    type = 'info',
    showIcon = true,
    autoClose = true
}) {
    if (!document.getElementById(`${prefixCls}-wrapper`)) {
        new MessageWrapper().attach(document.body)
    }

    new Notice({
        data: {
            showClose,
            content,
            duration,
            show,
            type,
            showIcon,
            autoClose
        }
    }).attach(document.getElementById(`${prefixCls}-wrapper`))
}

Component.prototype.$message = message

module.exports = message
