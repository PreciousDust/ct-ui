/**
 * @author 靳宏灿
 * @date 2019/6/20
 * @time 下午3:06
 * @Description: popper 初版，先在select试用，然后推广
*/

/**
 * 连接drop显示区域以及目标区域，并设置位置
 * @param target 绑定目标区域，比如 select 的展示框
 * @param dropDown 被绑定区域,比如 select 的 dropdown
 * @param placement 展示的方向
 * @param parent 共同的父节点
 */
export function bindReference (target, dropDown, placement, parent) {
    setPositon(target, dropDown, placement, parent) // 首次设置位置
    adjustPosition(target, dropDown, placement, parent) // 调整位置
}

// 调整位置，参数同 bindReference
function adjustPosition (target, dropDown, placement, parent) {
    let overRes = monitorIfOver(dropDown) // 获取溢出情况
    let reasonablePosition = getReasonablePlacement(overRes, placement) // 获取适宜的位置
    setPositon(target, dropDown, reasonablePosition, parent) // 重新设置位置
}

/**
 * 监测是否超出窗口
 * @param dom 需要检测的 dom
 * @returns {{topOver: boolean, bottomOver: boolean, leftOver: boolean, rightOver: boolean}}
 * 各个方向是否溢出
 */
function monitorIfOver (dom) {
    let {clientHeight, clientWidth} = document.body
    // 获取 dom 的各个边距离页面左侧以及顶部的距离
    let {top, left, bottom, right} = dom.getBoundingClientRect()
    // 判断各个位置是否溢出
    let topOver = top < 0
    let bottomOver = bottom > clientHeight
    let leftOver = left < 0
    let rightOver = right > clientWidth
    return {
        topOver,
        bottomOver,
        leftOver,
        rightOver
    }
}

/**
 * 获取合理的位置
 * @param overRes 溢出屏幕的情况
 * @param placement 现有的布局方向
 * @returns {string} 调整之后的布局方向
 */
function getReasonablePlacement (overRes, placement) {
    let divection1 = placement.split('-')[0]
    let divection2 = placement.split('-')[1] || ''
    let {topOver, bottomOver, leftOver, rightOver} = overRes
    // 判断是否是垂直布局方向即，top，bottom。反之则为left，right
    let ifVerticalDirection = divection1 === 'top' || divection1 === 'bottom'

    // 存放调整后的位置的 Array
    let afterPosition = [divection1, divection2]

    // 针对各个方向的溢出情况，重新调整各个位置的方向
    if (topOver) {
        ifVerticalDirection ? (afterPosition[0] = 'bottom') : (afterPosition[1] = 'start')
    }
    if (bottomOver) {
        ifVerticalDirection ? (afterPosition[0] = 'top') : (afterPosition[1] = 'end')
    }
    if (leftOver) {
        ifVerticalDirection ? (afterPosition[1] = 'start') : (afterPosition[0] = 'right')
    }
    if (rightOver) {
        ifVerticalDirection ? (afterPosition[1] = 'end') : (afterPosition[0] = 'left')
    }
    // 以字符串的形式，返回调整之后的布局方向
    return afterPosition[0] + (afterPosition[1] ? ('-' + afterPosition[1]) : '')
}

/**
 * 按照既定的方向设置下拉框的位置，参数同 bindReference
 * 备注1：left 和 right 方向，没有全部使用 left（绝对定位的属性） 进行绝对定位，
 * 因为当drop自带margin时，若只使用 left 定位，会导致当 left主方向时 ，margin的效果展示不好。
 *
 * 备注2：下面代码中 left，bottom，right + 值，均指的 绝对定位的属性值；
 * 而 top，left，right方向 均指的 placement的大方向
 */
function setPositon (target, dropDown, position, parent) {
    // 获取各个元素的各个参数
    let {offsetWidth, offsetHeight} = parent
    let {targetOffsetTop, targetOffsetLeft, targetOffsetWidth, targetOffsetHeight} = getDetail(target, 'target')
    let {dropDownOffsetWidth, dropDownOffsetHeight} = getDetail(dropDown, 'dropDown')

    // top 方向的 bottom 值
    let topBottom = offsetHeight - targetOffsetTop + 'px'
    // top方向的box-shadow
    let topBoxShadow = '0 -2px 6px rgba(0,0,0,.2)'
    // 水平居中的left值
    let horizontalMiddleLeft = targetOffsetLeft - (dropDownOffsetWidth - targetOffsetWidth) / 2 + 'px'
    // 水平最左的left值
    let horizontalLeftEst = targetOffsetLeft - (dropDownOffsetWidth - targetOffsetWidth) + 'px'
    // left方向的 right 值
    let leftBoxRight = offsetWidth - targetOffsetLeft + 'px'
    // 垂直居中的top值
    let verticalMiddleTop = targetOffsetTop - (dropDownOffsetHeight - targetOffsetHeight) / 2 + 'px'
    // 垂直方向-end 的top值
    let verticalTopEst = targetOffsetTop - (dropDownOffsetHeight - targetOffsetHeight) + 'px'
    // right方向的 left数值
    let rightBoxleft = targetOffsetLeft + targetOffsetWidth + 'px'

    if (!position || position === 'bottom-start') {
        dropDown.style.bottom = ''
        dropDown.style.left = 0
        dropDown.style.boxShadow = '0 1px 6px rgba(0, 0, 0, 0.2)'
    } else if (position === 'bottom') {
        dropDown.style.bottom = ''
        dropDown.style.left = horizontalMiddleLeft
    } else if (position === 'bottom-end') {
        dropDown.style.bottom = ''
        dropDown.style.left = horizontalLeftEst
    } else if (position === 'top-start') {
        dropDown.style.bottom = topBottom
        dropDown.style.left = 0
        dropDown.style.boxShadow = topBoxShadow
    } else if (position === 'top') {
        dropDown.style.bottom = topBottom
        dropDown.style.boxShadow = topBoxShadow
        dropDown.style.left = horizontalMiddleLeft
    } else if (position === 'top-end') {
        dropDown.style.bottom = topBottom
        dropDown.style.boxShadow = topBoxShadow
        dropDown.style.left = horizontalLeftEst
    } else if (position === 'left') {
        dropDown.style.left = null
        dropDown.style.right = leftBoxRight
        dropDown.style.top = verticalMiddleTop
    } else if (position === 'left-start') {
        dropDown.style.left = ''
        dropDown.style.right = leftBoxRight
        dropDown.style.top = targetOffsetTop + 'px'
    } else if (position === 'left-end') {
        dropDown.style.left = ''
        dropDown.style.right = leftBoxRight
        dropDown.style.top = verticalTopEst
    } else if (position === 'right') {
        dropDown.style.right = ''
        dropDown.style.left = rightBoxleft
        dropDown.style.top = verticalMiddleTop
    } else if (position === 'right-start') {
        dropDown.style.right = ''
        dropDown.style.left = rightBoxleft
        dropDown.style.top = targetOffsetTop + 'px'
    } else if (position === 'right-end') {
        dropDown.style.right = ''
        dropDown.style.left = rightBoxleft
        dropDown.style.top = verticalTopEst
    }
    // 对 min-width 进行兼容，在ie8下，如果只有 min-width 而没有 width 会导致定位失准。
    let minWidth = dropDown.style.minWidth
    if (minWidth) {
        if (dropDownOffsetWidth > parseFloat(minWidth)) {
            dropDown.style.width = dropDownOffsetWidth + 'px'
        } else {
            dropDown.style.width = minWidth
        }
    }
}

/**
 * 获取 dom 的属性
 * @param dom 获取的目标
 * @param name 添加的前缀名称
 * @returns {{[p: string]: *}} 返回一个存放属性信息的 obj
 */
function getDetail (dom, name) {
    let {offsetTop, offsetLeft, offsetWidth, offsetHeight} = dom
    return {
        [`${name}OffsetTop`]: offsetTop,
        [`${name}OffsetLeft`]: offsetLeft,
        [`${name}OffsetWidth`]: offsetWidth,
        [`${name}OffsetHeight`]: offsetHeight
    }
}
