const san = require('san')
const { DataTypes } = require('san')
const Icon = require('@/icon/icon')
const { prefix } = require('../../utils/common')
const prefixCls = `${prefix}steps`
const iconPrefixCls = `${prefix}icon`

module.exports = san.defineComponent({
    name: `${prefix}step`,
    template: `
        <div class="{{classes}}" style="{{styles}}">
            <div class="{{prefixCls + '-tail'}}"><i></i></div>
            <div class="{{prefixCls + '-head'}}">
                <div class="{{prefixCls + '-head-inner'}}">
                    <span s-if="!icon && currentStatus != 'finish' && currentStatus != 'error'">
                        {{ stepNumber }}
                    </span>
                    <span s-else class="{{iconClasses}}">
                        <b-icon type="{{icons}}"></b-icon>
                    </span>
                </div>
            </div>
            <div class="{{prefixCls + '-main'}}">
                <div class="{{prefixCls + '-title'}}">
                    {{ title }}
                </div>
                <slot>
                    <div s-if="content" class="{{prefixCls + '-content'}}">
                        {{ content }}
                    </div>
                </slot>
            </div>
        </div>
    `,
    dataTypes: {
        status: DataTypes.oneOf(['wait', 'process', 'finish', 'error']),
        title: DataTypes.string,
        content: DataTypes.string,
        icon: DataTypes.string
    },
    initData () {
        return {
            componentName: `${prefix}step`,

            prefixCls,
            currentStatus: '',
            total: 0,
            stepNumber: '',
            nextError: false
        }
    },
    components: {
        'b-icon': Icon
    },
    computed: {
        classes () {
            return [
                `${prefixCls}-item`,
                `${prefixCls}-status-${this.data.get('currentStatus')}`,
                this.data.get('nextError') ? `${prefixCls}-next-error` : ''
            ]
        },
        styles () {
            return {
                width: `${1 / this.data.get('total') * 100}%`
            }
        },
        iconClasses () {
            let icon = ''
            if (this.data.get('icon')) {
                icon = this.data.get('icon')
            } else {
                const currentStatus = this.data.get('currentStatus')
                if (currentStatus === 'finish') {
                    icon = 'checkmark'
                } else if (currentStatus === 'error') {
                    icon = 'close'
                }
            }
            return [
                `${prefixCls}-icon`,
                `${iconPrefixCls}`,
                icon !== '' ? `${iconPrefixCls}-${icon}` : ''
            ]
        },
        icons () {
            let icon = ''
            if (this.data.get('icon')) {
                icon = this.data.get('icon')
            } else {
                const currentStatus = this.data.get('currentStatus')
                if (currentStatus === 'finish') {
                    icon = 'queding'
                } else if (currentStatus === 'error') {
                    icon = 'quxiao-guanbi-shanchu'
                }
            }
            return icon
        }
    },
    attached () {
        this.data.set('currentStatus', this.data.get('status'))

        this.watch('status', val => {
            this.data.set('currentStatus', val)
            if (val === 'error') {
                this.dispatch(`${prefix}steps-set-next-error`)
            }
        })
    },
    created () {
        this.dispatch(`${prefix}steps-append`)
    },
    detached () {
        this.dispatch(`${prefix}steps-remove`)
    }
})
