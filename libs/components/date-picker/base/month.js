const san = require('san')
const { inAfter, inBefore, inDisabledDays, months } = require('./util')
const { prefix } = require('../../../utils/common')

module.exports = san.defineComponent({
    template: `
        <div class="{{classes}}">
            <span
                class="cell {{ item.classes }}"
                s-for="item, i in months"
                on-click='selectMonth(item, i)'>
                {{ item.month }}
            </span>
        </div>
    `,
    initData () {
        return {
            // Props:
            value: null,
            year: new Date().getFullYear()
        }
    },
    computed: {
        classes () {
            return [`${prefix}panel`, `${prefix}panel-month`]
        },
        curYear () {
            const value = this.data.get('value')
            return value && new Date(value).getFullYear()
        },
        curMonth () {
            const value = this.data.get('value')
            return value && new Date(value).getMonth()
        },
        months () {
            const curYear = this.data.get('curYear')
            const curMonth = this.data.get('curMonth')
            const year = this.data.get('year')
            const notBefore = this.data.get('notBefore')
            const notAfter = this.data.get('notAfter')
            const type = this.data.get('type')
            const disabledDays = this.data.get('disabledDays')
            const startAt = this.data.get('startAt')
            const endAt = this.data.get('endAt')

            let arr = []
            months.forEach((month, i) => {
                let classes = []

                if (curYear === year && curMonth === i) {
                    classes.push('actived')
                }

                const time = new Date(year, i).getTime()
                const maxTime = new Date(year, i + 1).getTime() - 1
                if (
                    inBefore(maxTime, notBefore, startAt) ||
                    inAfter(time, notAfter, endAt) ||
                    (type === 'month' && inDisabledDays(time, disabledDays))
                ) {
                    classes.push('disabled')
                }

                arr.push({ month, classes })
            })

            return arr
        }
    },
    selectMonth (item, i) {
        if (item.classes.indexOf('disabled') > -1) return

        this.fire('select', i)
    }
})
