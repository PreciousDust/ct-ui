const san = require('san')
const { scrollTop, firstUpperCase } = require('./util')
const { prefix } = require('../../../utils/common')

const timeParts = ['hour', 'minute', 'second']
const itemHeight = 30

module.exports = san.defineComponent({
    template: `
        <div class="{{prefix}}panel {{prefix}}panel-time">
            <!-- 时 -->
            <ul 
                s-ref="hour"
                class="{{prefix}}time-list" 
                style="{{timeListStyle}}">
                <li 
                    class="cell {{ i === curHour ? 'actived' : '' }}"
                    s-for="hour, i in hours"
                    on-click="selectTime(i, 'hour')">
                    {{ stringifyText(i) }}
                </li>
            </ul>
            <!-- 分 -->
            <ul 
                s-ref="minute"
                class="{{prefix}}time-list" 
                style="{{timeListStyle}}">
                <li
                    class="cell {{i * step === curMinute ? 'actived' : '' }}"
                    s-for="minute, i in minutes"
                    on-click="selectTime(i, 'minute')">
                    {{ minute }}
                </li>
            </ul>
            <!-- 秒 -->
            <ul 
                s-ref="second"
                s-if="{{ minuteStep === 0 }}"
                class="{{prefix}}time-list" 
                style="{{timeListStyle}}">
                <li
                    class="cell {{ i === curSecond ? 'actived' : '' }}"
                    s-for="second, i in seconds"
                    on-click="selectTime(i, 'second')">
                    {{ stringifyText(i) }}
                </li>
            </ul>
        </div>
    `,
    initData () {
        return {
            prefix,
            hours: new Array(24),
            seconds: new Array(60),
            // Props:
            value: null,
            minuteStep: 0
        }
    },
    computed: {
        step () {
            return this.data.get('minuteStep') || 1
        },
        date () {
            const value = this.data.get('value')
            return value ? new Date(value) : new Date().setHours(0, 0, 0, 0) // 如果没有值则设置为当天零点，否则会以1970年8点开始计算
        },
        curHour () {
            const value = this.data.get('value')
            return value ? new Date(value).getHours() : 0
        },
        curMinute () {
            const value = this.data.get('value')
            return value ? new Date(value).getMinutes() : 0
        },
        curSecond () {
            const value = this.data.get('value')
            return value ? new Date(value).getSeconds() : 0
        },
        minutes () {
            const step = this.data.get('step')
            const len = parseInt(60 / step, 10)

            let ms = []
            for (let i = 0; i < len; i++) {
                const value = i * step
                ms.push(`00${value}`.slice(String(value).length))
            }

            return ms
        },
        timeListStyle () {
            const times = !this.data.get('minuteStep') ? 3 : 2
            return {
                width: `${100 / times}%`
            }
        }
    },
    stringifyText (value) {
        return `00${value}`.slice(String(value).length)
    },
    hourCls (i) {
        // const { curHour, date } = this.data.get()
        // const time = new Date(date).setHours(i)

        return ['cell']
    },
    minuteCls (i) {
        const { step, curMinute } = this.data.get()
        const value = i * step
        // const time = new Date(date).setMinutes(value)

        return ['cell', value === curMinute ? 'actived' : '']
    },
    secondCls (i) {
        const { curSecond } = this.data.get()
        // const time = new Date(date).setSeconds(i)

        return ['cell', i === curSecond ? 'actived' : '']
    },
    selectTime (i, type) {
        const { date, step } = this.data.get()
        let time
        if (type === 'hour') {
            time = new Date(date).setHours(i)
        } else if (type === 'minute') {
            time = new Date(date).setMinutes(i * step)
        } else if (type === 'second') {
            time = new Date(date).setSeconds(i)
        }
        this.fire('select', new Date(time))
        this.scroll(type, i)
    },
    scroll (type, index) {
        const from = this.ref(type).scrollTop
        const to = itemHeight * index
        scrollTop(this.ref(type), from, to, 500)
    },
    attached () {
        const parts = timeParts.slice()
        if (this.data.get('minuteStep') !== 0) parts.pop()

        parts.forEach(type => {
            const Type = firstUpperCase(type)
            const index = this.data.get(`cur${Type}`)
            this.ref(type).scrollTop = itemHeight * index
        })
    }
})
