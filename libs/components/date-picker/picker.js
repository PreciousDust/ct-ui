const san = require('san')
const { DataTypes } = require('san')
const Panel = require('./panel/panel')
const Input = require('@/input')
const { transformDate, formatDate, transformRange, dateEqual, rangeEqual } = require('../../utils/date')
const { prefix } = require('../../utils/common')
const { addEvent, removeEvent } = require('../../utils/dom')

module.exports = san.defineComponent({
    template: `
        <div class='{{prefix}}datepicker'>
            <b-input
                value="{{text}}"
                clearable
                suffix="rili"
                size="{{size}}"
                label="{{label}}"
                readonly="{{readonly}}"
                labelAlign="{{labelAlign}}"
                labelWidth="{{labelWidth}}"
                width="{{width}}"
                fixed="{{fixed}}"
                disabled="{{disabled}}"
                placeholder="{{placeholder}}"
                on-focus="handleFocus"
                on-click="handleFocus"
                on-blur="handleBlur"
                on-clear="clearDate">
            </b-input>
            <div class='{{prefix}}datepicker-popup' s-if='popupVisible' style="left: {{ popupLeft }}">
                <b-panel
                    s-if="!range"
                    s-ref="panel"
                    type="{{innerType}}"
                    date-format="{{innerDateFormat}}"
                    value="{{curVal}}"
                    not-before="{{notBefore}}"
                    not-after="{{notAfter}}"
                    disabled-days="{{disabledDays}}"
                    visible="{{popupVisible}}"
                    on-select-date="selectDate"
                    on-select-time="selectTime">
                </b-panel>
                <div s-else class="{{prefix}}range-wrapper">
                    <b-panel
                        s-ref="left-panel"
                        type="{{innerType}}"
                        date-format="{{innerDateFormat}}"
                        value="{{curVal[0]}}"
                        start-at="{{null}}"
                        end-at="{{curVal[1]}}"
                        not-before="{{notBefore}}"
                        not-after="{{notAfter}}"
                        disabled-days="{{disabledDays}}"
                        visible="{{popupVisible}}"
                        on-select-date="selectStartDate"
                        on-select-time="selectStartTime">
                    </b-panel>
                    <b-panel
                        s-ref="right-panel"
                        type="{{innerType}}"
                        date-format="{{innerDateFormat}}"
                        value="{{curVal[1]}}"
                        start-at="{{curVal[0]}}"
                        end-at="{{null}}"
                        not-before="{{notBefore}}"
                        not-after="{{notAfter}}"
                        disabled-days="{{disabledDays}}"
                        visible="{{popupVisible}}"
                        on-select-date="selectEndDate"
                        on-select-time="selectEndTime">
                    </b-panel>
                </div>
                <div s-if="showFooter" class="{{prefix}}datepicker-footer">
                    <a 
                        s-if="type === 'datetime'" 
                        class="{{ showTimePanel ? '' : 'disabled' }}"
                        on-click="handleClickTime">
                        选择时间
                    </a>
                    <span on-click="confirmDate">
                        {{confirmText}}
                    </span>
                </div>
            </div>
        </div>
    `,
    components: {
        'b-panel': Panel,
        'b-input': Input
    },
    dataTypes: {
        value: DataTypes.oneOfType([
            DataTypes.string,
            DataTypes.array
        ]),
        type: DataTypes.oneOf(['date', 'year', 'month', 'time', 'datetime']),
        format: DataTypes.string,
        disabled: DataTypes.bool,
        readonly: DataTypes.bool,
        confirm: DataTypes.bool,
        confirmText: DataTypes.string,
        placeholder: DataTypes.string,
        size: DataTypes.oneOf(['large', 'normal', 'small']),
        label: DataTypes.string,
        labelAlign: DataTypes.oneOf(['left', 'center', 'right']),
        labelWidth: DataTypes.oneOfType([
            DataTypes.string,
            DataTypes.number
        ]),
        width: DataTypes.oneOfType([
            DataTypes.string,
            DataTypes.number
        ]),
        fixed: DataTypes.bool,
        dateType: DataTypes.oneOf(['formatdate', 'date', 'timestamp'])
    },
    initData () {
        return {
            prefix,
            popupVisible: false,
            // props:
            value: null,
            type: 'date',
            format: 'yyyy-MM-dd',
            disabled: false,
            dateType: 'formatdate',
            size: 'normal',
            readonly: false,
            confirm: false,
            confirmText: '确定'
        }
    },
    computed: {
        curVal () {
            return this.data.get('range') ? [null, null] : null
        },
        transform () {
            const obj = this.data.get('range') ? transformRange : transformDate
            return obj[this.data.get('dateType')]
        },
        text () {
            const transform = this.data.get('transform')
            const value = this.data.get('value')
            const format = this.data.get('format')
            const range = this.data.get('range')
            const date = transform.value2date(value, format)
            if (!range) return date ? formatDate(date, format) : ''

            return Array.isArray(date) && date.length === 2 && date[0] && date[1]
                ? `${formatDate(date[0], format)} ~ ${formatDate(date[1], format)}`
                : ''
        },
        innnerDateFormat () {
            const format = this.data.get('format')
            if (format) return format
            return 'yyyy-MM-dd'
        },
        innerType () {
            return String(this.data.get('type')).toLowerCase()
        },
        showFooter () {
            const confirm = this.data.get('confirm')
            const range = this.data.get('range')
            const type = this.data.get('type')
            if (range || confirm || type === 'time' || type === 'datetime') return true
            return false
        },
        showTimePanel () {
            const date = this.data.get('curVal')
            if (!this.data.get('range')) return !!date
            return Array.isArray(date) && date.length === 2 && !!date[0] && !!date[1]
        },
        popupLeft () {
            const fixed = this.data.get('fixed')
            const label = this.data.get('label')

            if (label && !fixed) return this.data.get('labelWidth') + 'px'
            return 0
        }
    },
    attached () {
        this.watch('popupVisible', (val) => {
            console.log('popupVisible', val)
        })
        addEvent(document, 'click', this.handleClickOutside.bind(this), this)

        // 默认日期
        const { value, transform, format } = this.data.get()
        if (value) {
            this.data.set('curVal', transform.value2date(value, format))
        }
    },
    detached () {
        removeEvent(document, 'click', this)
    },
    handleClickOutside (event) {
        const target = event.target || event.srcElement
        if (!this.el.contains(target)) {
            this.data.set('popupVisible', false)
        }
    },
    updateDate () {
        const { range, value, curVal, transform, format } = this.data.get()
        const equal = range ? rangeEqual(value, curVal) : dateEqual(value, curVal)
        if (equal) return

        const date = transform.date2value(curVal, format)
        this.data.set('value', date)
        this.fire('change', date)
    },
    selectDate (date) {
        this.data.set('curVal', date)
        this.updateDate()

        if (!this.data.get('confirm')) {
            this.data.set('popupVisible', false)
        }
    },
    selectStartDate (date) {
        this.data.set('curVal[0]', date)
        this.updateDate()
    },
    selectEndDate (date) {
        this.data.set('curVal[1]', date)
        this.updateDate()
    },
    selectTime (time) {
        this.data.set('curVal', time)
        this.updateDate()
    },
    selectStartTime (time) {
        this.selectStartDate(time)
    },
    selectEndTime (time) {
        this.selectEndDate(time)
    },
    handleFocus (e) {
        const { popupVisible } = this.data.get()
        if (!popupVisible) {
            this.data.set('popupVisible', true)
        }

        this.fire('focus', e)
    },
    handleBlur (e) {
        this.fire('blur', e)
    },
    clearDate () {
        const date = this.data.get('range') ? [null, null] : null
        this.data.set('curVal', date)
        this.data.set('value', date)
        this.data.set('popupVisible', false)

        this.fire('clear')
    },
    confirmDate () {
        this.data.set('popupVisible', false)
    },
    handleClickTime () {
        if (!this.data.get('showTimePanel')) return

        if (!this.data.get('range')) {
            return this.ref('panel').parentChangePanel()
        }

        this.ref('left-panel').parentChangePanel()
        this.ref('right-panel').parentChangePanel()
    }
})
