/**
 * Created by gaoguoqing on 2019/5/23.
 *
 */
const path = require('path')

exports.resolve = function (dir) {
    return path.join(__dirname, '..', dir)
}
