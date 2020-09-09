const loaderUtils = require('loader-utils')
const generator = require('./lib/generator')
const markdown = require('./lib/markdown')
const path = require('path')
const parser = require('./lib/parser')

module.exports = function (source) {
    
    let callback = this.async()
    
    let options = Object.assign(
    loaderUtils.getOptions(this) || {},
    this.sanMarkdown,
    this.options.sanMarkdown
    )
    
    let code = markdown(options).render(source)
    parser.parse(code).then(ast => {
        let {filePath} = generator.generate({
            source,
            code,
            ast,
            filePath: this.resourcePath,
            cacheDir: path.join(__dirname, '../san-markdown-loader/.cache')
        })
        let moduleName = loaderUtils.stringifyRequest(this, filePath).slice(1, -1)
        // callback(null, `module.exports = require('!!san-loader!${moduleName}');`)
        callback(null, `module.exports = require('${moduleName}');`)
    }, callback)
}