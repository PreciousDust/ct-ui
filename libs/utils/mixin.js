/**
 * Created by gaoguoqing on 2019/5/23.
 *
 */
function merge (oldObj, newObj) {
    for (var key in newObj) {
        oldObj[key] = newObj[key]
    }
    return oldObj
}

export default function mixin (Component, mixins) {
    for (var key in mixins) {
        (function (key) {
            var proto = Component.prototype[key]
            var mixin = mixins[key]
            switch (key) {
                case 'initData':
                    Component.prototype[key] = function () {
                        return merge(mixin.call(this), proto ? proto.call(this) : {})
                    }
                    break
                case 'compiled':
                case 'inited':
                case 'created':
                case 'attached':
                case 'detached':
                case 'disposed':
                case 'updated':
                    Component.prototype[key] = function () {
                        mixin.call(this)
                        proto && proto.call(this)
                    }
                    break
                case 'computed':
                case 'messages':
                case 'components':
                case 'filters':
                    Component.prototype[key] = merge(mixin, proto || {})
                    break
                default:
                    Component.prototype[key] = proto || mixin
            }
        })(key)
    }
    return Component
}
