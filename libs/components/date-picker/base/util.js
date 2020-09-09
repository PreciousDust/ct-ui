function getCriticalTime (value, type = 'date') {
    if (!value) return null

    const date = new Date(value)
    switch (type) {
        case 'year':
            return new Date(date.getFullYear(), 0).getTime()
        case 'month':
            return new Date(date.getFullYear(), date.getMonth()).getTime()
        case 'date':
            return date.setHours(0, 0, 0, 0)
        default:
            return date.getTime()
    }
}

function inBefore (time, notBefore, startAt) {
    const notBeforeTime = getCriticalTime(notBefore)
    return (notBeforeTime && time < notBeforeTime) || (startAt && time < getCriticalTime(startAt))
}
function inAfter (time, notAfter, endAt) {
    const notAfterTime = getCriticalTime(notAfter)
    return (notAfterTime && time > notAfterTime) || (endAt && time > getCriticalTime(endAt))
}
function inDisabledDays (time, disabledDays) {
    if (Array.isArray(disabledDays)) {
        return disabledDays.some(v => getCriticalTime(v) === time)
    }
    return false
}

function scrollTop (el, from = 0, to, duration = 500, endCallback) {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000 / 60)
            }
        )

        window.cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout
    }
    const difference = Math.abs(from - to)
    const step = Math.ceil(difference / duration * 50)
    function scroll (start, end, step) {
        if (start === end) {
            endCallback && endCallback()
            return
        }
        let d = (start + step > end) ? end : start + step
        if (start > end) {
            d = (start - step < end) ? end : start - step
        }
        if (el === window) {
            window.scrollTo(d, d)
        } else {
            el.scrollTop = d
        }
        window.requestAnimationFrame(() => scroll(d, end, step))
    }
    scroll(from, to, step)
}

function firstUpperCase (str) {
    return str.toString()[0].toUpperCase() + str.toString().slice(1)
}

module.exports = {
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    weeks: ['日', '一', '二', '三', '四', '五', '六'],
    getCriticalTime,
    inBefore,
    inAfter,
    inDisabledDays,
    scrollTop,
    firstUpperCase
}
