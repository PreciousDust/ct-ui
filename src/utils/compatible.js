/**
 * Created by gaoguoqing on 2019/5/22.
 *
 */
require('./prototype')
require('core-js/features/object/define-property')
require('core-js/features/object/create')
require('core-js/features/object/assign')
require('core-js/features/object/keys')
require('core-js/features/array/for-each')
require('core-js/features/array/filter')
require('core-js/features/array/map')
require('core-js/features/array/reduce')
require('core-js/features/array/index-of')
require('core-js/features/function/bind')
require('core-js/features/array/is-array')
require('core-js/features/array/some')
// FIXME: IE 8 HTML parse error
// require('core-js/features/array/includes')
require('core-js/features/array/every')
// Todo 引入下面兼容方法 san 会报错元素修改问题
// require('core-js/features/promise')
// require('core-js/features/array/iterator')
// require('core-js/features/array/find')
// require('core-js/features/array/find-index')
// require('core-js/features/array/includes')
// ie9- classList 使用
if (!('classList' in document.documentElement)) {
    Object.defineProperty(window.Element.prototype, 'classList', {
        get: function () {
            var self = this
            function update (fn) {
                return function () {
                    let valArr = arguments
                    return fn(self.className.replace(/^\s+|\s+$/g, ''), valArr)
                }
            }
            function addRmv (className, valArr, tag) {
                for (var i in valArr) {
                    if (typeof valArr[i] !== 'string' || !!~valArr[i].search(/\s+/g)) throw TypeError('the type of value is error')
                    var temp = valArr[i]
                    var flag = !!~className.search(new RegExp('(\\s+)?' + temp + '(\\s+)?'))
                    if (tag === 1) {
                        !flag ? className += ' ' + temp : ''
                    } else if (tag === 2) {
                        flag ? className = className.replace(new RegExp('(\\s+)?' + temp), '') : ''
                    }
                }
                self.className = className
                return tag
            }
            return {
                add: update(function (className, valArr) {
                    addRmv(className, valArr, 1)
                }),
                remove: update(function (className, valArr) {
                    addRmv(className, valArr, 2)
                }),
                toggle: function (value) {
                    if (typeof value !== 'string' || arguments.length === 0) throw TypeError('Failed to execute \'toggle\' on \'DOMTokenList\': 1 argument(string) required, but only 0 present.')
                    if (arguments.length === 1) {
                        this.contains(value) ? this.remove(value) : this.add(value)
                        return
                    }
                    !arguments[1] ? this.remove(value) : this.add(value)
                },
                contains: update(function (className, valArr) {
                    if (valArr.length === 0) throw TypeError('Failed to execute \'contains\' on \'DOMTokenList\': 1 argument required, but only 0 present.')
                    if (typeof valArr[0] !== 'string' || !!~valArr[0].search(/\s+/g)) return false
                    return !!~className.search(new RegExp(valArr[0]))
                }),
                item: function (index) {
                    typeof index === 'string' ? index = parseInt(index) : ''
                    if (arguments.length === 0 || typeof index !== 'number') throw TypeError('Failed to execute \'toggle\' on \'DOMTokenList\': 1 argument required, but only 0 present.')
                    var claArr = self.className.replace(/^\s+|\s+$/, '').split(/\s+/)
                    var len = claArr.length
                    if (index < 0 || index >= len) return null
                    return claArr[index]
                }
            }
        }
    })
}
// ie8 console
window._console = window.console// 将原始console对象缓存
window.console = (function (orgConsole) {
    return {// 构造的新console对象
        log: getConsoleFn('log'),
        debug: getConsoleFn('debug'),
        info: getConsoleFn('info'),
        warn: getConsoleFn('warn'),
        exception: getConsoleFn('exception'),
        assert: getConsoleFn('assert'),
        dir: getConsoleFn('dir'),
        dirxml: getConsoleFn('dirxml'),
        trace: getConsoleFn('trace'),
        group: getConsoleFn('group'),
        groupCollapsed: getConsoleFn('groupCollapsed'),
        groupEnd: getConsoleFn('groupEnd'),
        profile: getConsoleFn('profile'),
        profileEnd: getConsoleFn('profileEnd'),
        count: getConsoleFn('count'),
        clear: getConsoleFn('clear'),
        time: getConsoleFn('time'),
        timeEnd: getConsoleFn('timeEnd'),
        timeStamp: getConsoleFn('timeStamp'),
        table: getConsoleFn('table'),
        error: getConsoleFn('error'),
        memory: getConsoleFn('memory'),
        markTimeline: getConsoleFn('markTimeline'),
        timeline: getConsoleFn('timeline'),
        timelineEnd: getConsoleFn('timelineEnd')
    }
    function getConsoleFn (name) {
        return function actionConsole () {
            if (typeof (orgConsole) !== 'object') return
            if (typeof (orgConsole[name]) !== 'function') return// 判断原始console对象中是否含有此方法，若没有则直接返回
            return orgConsole[name].apply(orgConsole, Array.prototype.slice.call(arguments))// 调用原始函数
        }
    }
}(window._console))
