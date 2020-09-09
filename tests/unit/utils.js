import san from 'san'

const viewport = document.createElement('div')

exports.createComponent = function (options) {
    let Component = san.defineComponent(
        Object.assign({}, options)
    )
    let component = new Component()
    component.attach(viewport)
    return component
}
