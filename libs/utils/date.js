const fecha = require('./fecha')

function isPlainObject (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

function formatDate (date, format) {
    try {
        return fecha.format(new Date(date), format)
    } catch (e) {
        return ''
    }
}

function parseDate (str, format) {
    try {
        return fecha.parse(str, format)
    } catch (e) {
        return null
    }
}

function isDateObject (value) {
    return value instanceof Date
}

function isValidDate (date) {
    if (date === null || date === undefined) {
        return false
    }
    return !isNaN(new Date(date).getTime())
}
function isValidRange (date) {
    return (
        Array.isArray(date) &&
        date.length === 2 &&
        isValidDate(date[0]) &&
        isValidDate(date[1]) &&
        (new Date(date[1]).getTime() >= new Date(date[0]).getTime())
    )
}
function dateEqual (a, b) {
    return isDateObject(a) &&
        isDateObject(b) &&
        a.getTime() === b.getTime()
}

function rangeEqual (a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((item, index) => dateEqual(item, b[index]))
}

const transformDate = {
    date: {
        value2date: val => isValidDate(val) ? new Date(val) : null,
        date2value: date => date
    },
    timestamp: {
        value2date: val => isValidDate(val) ? new Date(val) : null,
        date2value: date => isValidDate(date) ? new Date(date).getTime() : null
    },
    formatdate: {
        value2date: parseDate,
        date2value: (date, format) => isValidDate(date) ? formatDate(date, format) : null
    }
}

const transformRange = {
    date: {
        value2date: val => isValidRange(val) ? [new Date(val[0]), new Date(val[1])] : [null, null],
        date2value: date => date
    },
    timestamp: {
        value2date: val => isValidRange(val) ? [new Date(val[0]), new Date(val[1])] : [null, null],
        date2value: date => date.map(transformDate.timestamp.date2value)
    },
    formatdate: {
        value2date: (val, format) => {
            if (Array.isArray(val) && val.length === 2) {
                const start = parseDate(val[0], format)
                const end = parseDate(val[1], format)
                if (start && end && end >= start) {
                    return [start, end]
                }
            }
            return [null, null]
        },
        date2value: (date, format) => date.map(val => transformDate.formatdate.date2value(val, format))
    }
}

module.exports = {
    isPlainObject,
    formatDate,
    parseDate,
    isDateObject,
    isValidDate,
    dateEqual,
    rangeEqual,
    transformDate,
    transformRange
}
