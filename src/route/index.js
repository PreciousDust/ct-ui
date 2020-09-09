/**
 * Created by gaoguoqing on 2019/5/9.
 *
 */

let router = require('san-router').router
let menuList = require('./menu')
router.add({
    rule: '/',
    Component: require('../documents/guide.md'),
    target: '#route'
})
let routes = []
Object.keys(menuList).forEach((item) => {
    routes = routes.concat(menuList[item])
})
let addRoute = (list) => {
    list.forEach((route) => {
        if (route.items) {
            addRoute(route.items)
            routes = routes.concat(route.items)
        } else if (route.name) {
            router.add({
                rule: '/' + route.name,
                Component: require(`../documents/${route.name}.md`),
                target: '#route'
            })
        }
    })
}

addRoute(routes)
router.start()
