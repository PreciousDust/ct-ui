/**
 * Created by gaoguoqing on 2019/6/17.
 *
 */
import { findComponentUpward, findComponentsUpward } from '../../utils/findComponents'
import { prefix } from '../../utils/common'

const prefixCls = prefix + 'menu'
/**
 * @param _this
 */
export function hasParentSubmenu (_this) {
    return !!findComponentUpward(_this, prefixCls + '-submenu')
}
/**
 * @param _this
 */
export function parentsSubmenuNum (_this) {
    return findComponentsUpward(_this, prefixCls + '-submenu').length
}
