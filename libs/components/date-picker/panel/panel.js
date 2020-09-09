const san = require('san')
const TableDate = require('../base/date')
const TableYear = require('../base/year')
const TableMonth = require('../base/month')
const TableTime = require('../base/time')

const { months } = require('../base/util')
const { isDateObject } = require('../../../utils/date')
const { prefix } = require('../../../utils/common')
const prefixCls = prefix + 'calendar'

module.exports = san.defineComponent({
    template: `
        <div class="{{prefixCls}}">
            <div class="{{prefixCls}}-header">
                <a
                    s-if="panel !== 'TIME'"
                    class="{{prefix}}icon-last-year"
                    on-click="handleIconYear(-1)">
                    <<
                </a>
                <a
                    s-if="panel === 'DATE'"
                    class="{{prefix}}icon-last-month"
                    on-click="handleIconMonth(-1)">
                    <
                </a>
                <a
                    s-if="panel === 'YEAR'"
                    class="{{prefix}}current-year">
                    {{yearHeader}}
                </a>
                <a
                    s-if="panel === 'DATE'"
                    class="{{prefix}}current-month"
                    on-click="handleClickMonth">
                    {{months[month]}}
                </a>
                <a
                    s-if="panel === 'DATE' || panel === 'MONTH'"
                    class="{{prefix}}current-year"
                    on-click="handleClickYear">
                    {{ year + ' 年' }}
                </a>
                <a
                    s-if="panel !== 'TIME'"
                    class="{{prefix}}icon-next-year"
                    on-click="handleIconYear(1)">
                    >>
                </a>
                <a
                    s-if="panel === 'DATE'"
                    class="{{prefix}}icon-next-month"
                    on-click="handleIconMonth(1)">
                    >
                </a>
                <a
                    s-if="panel === 'TIME'"
                    class="{{prefix}}time-header"
                    on-click="handleTimeHeader">
                    {{ timeHeader }}
                </a>
            </div>
            <div class="{{prefixCls}}-content">
                <b-table-year
                    s-if="panel === 'YEAR'"
                    value='{{value}}'
                    type="{{type}}"
                    first-year='{{firstYear}}'
                    not-before="{{notBefore}}"
                    not-after="{{notAfter}}"
                    start-at="{{startAt}}"
                    end-at="{{endAt}}"
                    disabled-days="{{disabledDays}}"
                    on-select="selectYear">
                </b-table-year>
                <b-table-month
                    s-if="panel === 'MONTH'"
                    value='{{value}}'
                    type="{{type}}"
                    year='{{year}}'
                    start-at="{{startAt}}"
                    end-at="{{endAt}}"
                    not-before="{{notBefore}}"
                    not-after="{{notAfter}}"
                    disabled-days="{{disabledDays}}"
                    on-select="selectMonth">
                </b-table-month>
                <b-table-date
                    s-if="panel === 'DATE'"
                    value='{{value}}'
                    type="{{type}}"
                    year='{{year}}'
                    month='{{month}}'
                    start-at="{{startAt}}"
                    end-at="{{endAt}}"
                    not-before="{{notBefore}}"
                    not-after="{{notAfter}}"
                    disabled-days="{{disabledDays}}"
                    first-day-of-week='{{firstDayOfWeek}}'
                    on-select="selectDate">
                </b-table-date>
                <b-table-time
                    s-if="panel === 'TIME'"
                    value="{{value}}"
                    type="{{type}}"
                    minute-step="{{minuteStep}}"
                    on-select="selectTime">
                </b-table-time>
            </div>
        </div>
    `,
    components: {
        'b-table-date': TableDate,
        'b-table-year': TableYear,
        'b-table-month': TableMonth,
        'b-table-time': TableTime
    },
    initData () {
        const _date = new Date()
        const _year = _date.getFullYear()
        const _month = _date.getMonth()
        const _firstYear = Math.floor(_year / 10) * 10

        return {
            prefix,
            prefixCls,
            panel: 'DATE',
            dates: [],
            year: _year,
            month: _month,
            firstYear: _firstYear,
            months,
            value: null,
            type: '',
            visible: false,
            minuteStep: 0
        }
    },
    computed: {
        yearHeader () {
            return `${this.data.get('firstYear')} ~ ${this.data.get('firstYear') + 9}`
        },
        timeHeader () {
            if (this.data.get('type') === 'time') {
                return 'HH:mm:ss'
            }
            // return this.data.get('value')
            //     ? formatDate(this.data.get('value'), this.data.get('dateFormat'))
            //     : ''
        }
    },
    attached () {
        this.watch('panel', val => {
            if (val === 'YEAR') {
                this.data.set('firstYear', Math.floor(this.data.get('year') / 10) * 10)
            }
        })

        if (this.data.get('visible')) {
            const { value, type } = this.data.get()
            const date = new Date(value || new Date())
            const year = date.getFullYear()
            const month = date.getMonth()
            this.data.set('year', year, { force: true })
            this.data.set('month', month, { force: true })

            switch (type) {
                case 'year':
                    this.data.set('panel', 'YEAR')
                    break
                case 'month':
                    this.data.set('panel', 'MONTH')
                    break
                case 'date':
                    this.data.set('panel', 'DATE')
                    break
                case 'time':
                    this.data.set('panel', 'TIME')
                    break
                default:
                    this.data.set('panel', 'DATE')
            }
        }
    },
    changePanelYears (flag) {
        const firstYear = this.data.get('firstYear') + flag * 10
        this.data.set('firstYear', firstYear)
    },
    handleIconYear (flag) {
        if (this.data.get('panel') === 'YEAR') {
            this.changePanelYears(flag)
        } else {
            this.changeYear(this.data.get('year') + flag)
        }
    },
    handleIconMonth (flag) {
        this.changeMonth(this.data.get('month') + flag)
    },
    handleTimeHeader () {
        if (this.data.get('type') === 'time') return

        this.data.set('panel', 'DATE')
    },
    selectDate (date) {
        const { type } = this.data.get()
        if (type === 'datetime') {
            const { value } = this.data.get()
            let time = new Date(date)
            if (isDateObject(value)) {
                time.setHours(value.getHours(), value.getMinutes(), value.getSeconds())
            }

            return this.selectTime(time)
        }

        this.fire('select-date', date)
    },
    changeYear (year) {
        const { month } = this.data.get()
        this.data.set('year', year)
        this.data.set('month', month)
    },
    changeMonth (month) {
        const { year } = this.data.get()
        this.data.set('year', year)
        this.data.set('month', month)
    },
    selectYear (year) {
        this.changeYear(year)
        const { type, month } = this.data.get()
        if (type === 'year') {
            return this.selectDate(new Date(year, month))
        }
        this.data.set('panel', 'MONTH')
    },
    selectMonth (month) {
        this.changeMonth(month)
        const { type, year } = this.data.get()
        if (type === 'month') {
            return this.selectDate(new Date(year, month))
        }
        this.data.set('panel', 'DATE')
    },
    selectTime (time) {
        this.fire('select-time', time)
    },
    handleClickYear () {
        this.data.set('panel', 'YEAR')
    },
    handleClickMonth () {
        this.data.set('panel', 'MONTH')
    },
    parentChangePanel () {
        this.data.set('panel', 'TIME')
    }
})
