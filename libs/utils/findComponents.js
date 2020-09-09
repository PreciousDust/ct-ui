const { Component } = require('san')
// Find component upward
export function findComponentUpward (context, componentName) {
    let parent = context.parentComponent
    let name = parent.name
    while (parent && (!name || componentName !== name)) {
        parent = parent.parentComponent
        if (parent) name = parent.name
    }
    return parent
}

// Find components upward
export function findComponentsUpward (context, componentName, componentNames) {
    if (typeof componentName === 'string') {
        componentNames = [componentName]
    } else {
        componentNames = componentName
    }
    let parent = context.parentComponent
    let name = parent.name
    let parents = []
    while (parent) {
        if (componentNames.indexOf(name) > -1) {
            parents.push(parent)
        }
        parent = parent.parentComponent
        if (parent) name = parent.name
    }
    return parents
}
export function findBrothersComponents (context, componentName, exceptSelf = true) {
    let res = []
    context.parentComponent.children.forEach(item => {
        if (item.children) {
            res.push(...item.children.filter(node => {
                return node instanceof Component && componentName === node.name
            }))
        }
    })
    let index = res.findIndex(item => item.id === context.id)
    if (exceptSelf) res.splice(index, 1)
    return res
}
export function findComponentsDownward (context, componentName, componentNames) {
    if (typeof componentName === 'string') {
        componentNames = [componentName]
    } else {
        componentNames = componentName
    }
    return context.children && context.children.reduce((components, child) => {
        if (child instanceof Component && componentNames.indexOf(child.name) > -1) components.push(child)
        let foundChilds = findComponentsDownward(child, componentNames) || []
        return components.concat(foundChilds)
    }, [])
}

// Find SlotNode conponent downward (只找第一层)
export function findSlotNodeComponentsDownward (context, componentName) {
    const slotNode = context.slot().length && context.slot()[0] // https://baidu.github.io/san/doc/api/ 组件 API
    // san enum NodeType { TEXT = 1, IF = 2, FOR = 3, ELEM = 4, CMPT = 5, SLOT = 6, TPL = 7 }
    // https://github.com/baidu/san/blob/master/types/index.d.ts
    if (!slotNode || slotNode.nodeType !== 6) return []
    const childrens = slotNode.children
    let children = []
    if (childrens.length) {
        childrens.forEach(child => {
            if (child instanceof Component && child.name === componentName) {
                children.push(child)
            }
        })
    }
    return children
}
