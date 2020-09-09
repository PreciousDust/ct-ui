/**
 * Created by gaoguoqing on 2019/5/23.
 *
 */
const prefix = 'b-'
export { prefix }
export function typeOf (obj) {
    const toString = Object.prototype.toString
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    }
    return map[toString.call(obj)]
}
/**
 * propsInit
 * @param {Obj} params
 * params.props {Array} props name
 * params.config {Obj} props config
 */
export function propsInit (params) {
    let propsInitObj = {}
    for (var i = 0, len = params.props.length; i < len; i++) {
        propsInitObj[params.props[i]] = params.config
    }
    return propsInitObj
}
