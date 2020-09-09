/* istanbul ignore next */

const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.)) /g // eslint-disable-line
const MOZ_HACK_REGEXP = /^moz([A-Z])/
const trim = function (string) {
    return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}
const camelCase = function (name) {
    return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter
    }).replace(MOZ_HACK_REGEXP, 'Moz$1')
}

function hasClass (el, cls) {
    if (!el || !cls) {
        return false
    }
    if (cls.indexof(' ') !== -1) {
        throw new Error('className should not contain space.')
    }
    if (el.classList) {
        return el.classList.contains(cls)
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
    }
}

function addClass (el, cls) {
    if (!el) return
    var curClass = el.className
    var classes = (cls || '').split(' ')
    for (var i = 0, j = classes.length; i < j; i++) {
        var clsName = classes[i]
        if (!clsName) continue
        if (el.classList) {
            el.classList.add(clsName)
        } else if (!hasClass(el, clsName)) {
            curClass += ' ' + clsName
        }
    }
    if (!el.classList) {
        el.className = curClass
    }
}

function removeClass (el, cls) {
    if (!el || !cls) return
    var classes = cls.split(' ')
    var curClass = ' ' + el.className + ' '
    for (var i = 0, j = classes.length; i < j; i++) {
        var clsName = classes[i]
        if (!clsName) continue
        if (el.classList) {
            el.classList.remove(clsName)
        } else if (hasClass(el, clsName)) {
            curClass = curClass.replace(' ' + clsName + ' ', ' ')
        }
    }
    if (!el.classList) {
        el.className = trim(curClass)
    }
}

export const on = (() => {
    if (document.addEventListener) {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false)
            }
        }
    } else {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler)
            }
        }
    }
})()

/* istanbul ignore next */
export const off = (() => {
    if (document.removeEventListener) {
        return function (element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false)
            }
        }
    } else {
        return function (element, event, handler) {
            if (element && event) {
                element.detachEvent('on' + event, handler)
            }
        }
    }
})()

function getScrollBarSize (fresh) {
    let cached
    if (fresh || cached === undefined) {
        const inner = document.createElement('div')
        inner.style.width = '100%'
        inner.style.height = '200px'
        const outer = document.createElement('div')
        const outerStyle = outer.style
        outerStyle.position = 'absolute'
        outerStyle.top = 0
        outerStyle.left = 0
        outerStyle.pointerEvents = 'none'
        outerStyle.visibility = 'hidden'
        outerStyle.width = '200px'
        outerStyle.height = '150px'
        outerStyle.overflow = 'hidden'
        outer.appendChild(inner)
        document.body.appendChild(outer)
        const widthContained = inner.offsetWidth
        outer.style.overflow = 'scroll'
        let widthScroll = inner.offsetWidth
        if (widthContained === widthScroll) {
            widthScroll = outer.clientWidth
        }
        document.body.removeChild(outer)
        cached = widthContained - widthScroll
    }
    return cached
}

// an element contain another element
export const containsElement = (root, el) => {
    if (root.compareDocumentPosition) {
        return root === el || !!(root.compareDocumentPosition(el) & 16)
    }
    if (root.contains && el.nodeType === 1) {
        return root.contains(el) && root !== el
    }
    while ((el = el.parentNode)) {
        if (el === root) return true
    }
    return false
}

// firstUpperCase
function firstUpperCase (str) {
    return str.toString()[0].toUpperCase() + str.toString().slice(1)
}

export const addEvent = (() => {
    if (document.addEventListener) {
        return function (element, event, handler, el) {
            if (element && event && handler) {
                el['_sanHandle' + firstUpperCase(event)] = handler
                element.addEventListener(event, handler, false)
            }
        }
    } else {
        return function (element, event, handler, el) {
            if (element && event && handler) {
                el['_sanHandle' + firstUpperCase(event)] = handler
                element.attachEvent('on' + event, handler)
            }
        }
    }
})()

/* istanbul ignore next */
export const removeEvent = (() => {
    if (document.removeEventListener) {
        return function (element, event, el) {
            if (element && event) {
                element.removeEventListener(event, el['_sanHandle' + firstUpperCase(event)], false)
            }
        }
    } else {
        return function (element, event, el) {
            if (element && event) {
                element.detachEvent('on' + event, el['_sanHandle' + firstUpperCase(event)])
            }
        }
    }
})()

module.exports = {
    hasClass,
    addClass,
    removeClass,
    getStyle: function (element, styleName) {
        if (!element || !styleName) return null
        styleName = camelCase(styleName)
        if (styleName === 'float') {
            styleName = 'cssFloat'
        }
        try {
            const computed = document.defaultView.getComputedStyle(element, '')
            return element.style[styleName] || computed ? computed[styleName] : null
        } catch (e) {
            return element.currentStyle[styleName]
        }
    },
    getScrollBarSize,
    on,
    off,
    addEvent,
    removeEvent
}
