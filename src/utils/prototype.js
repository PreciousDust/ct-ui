/**
 * Created by gaoguoqing on 2019/6/13.
 *
 */
Array.prototype.findIndex = function (func) {
    for (var i = 0; i < this.length; i++) {
        if (func(this[i], i)) {
            return i
        }
    }
}
Array.prototype.find = function (func) {
    for (var i = 0; i < this.length; i++) {
        if (func(this[i], i)) {
            return this[i]
        }
    }
}
Array.prototype.includes = function (searchElement, fromIndex) {
    if (this === null) {
        throw new TypeError('"this" is null or not defined')
    }
    let that = Object(this), len = that.length >>> 0, param = arguments, index = fromIndex | 0
    if (len === 0) {return false}
    var startIndex = Math.max(index >= 0 ? index : len - Math.abs(index), 0)
    while (startIndex < len) {
        if (String(that[startIndex]) === String(param[0])) return true
        startIndex++
    }
    return false
}

// 字符串的原生方法扩展 去除空格
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, "");
}
String.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, "");
}
