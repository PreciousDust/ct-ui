/**
 * Created by gaoguoqing on 2019/6/3.
 *
 */
module.exports = {
    eventInit (event) {
        var eve = event || window.event
        if (!eve.target) {
            eve.target = eve.srcElement
        }
        return eve
    }
}
