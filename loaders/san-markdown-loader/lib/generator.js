const fs = require('fs')
const path = require('path')
const hash = require('shorthash')
const transform = require('./transform')
const CODE_BLOCK_NAME = 'san-code-block'
const _ = require('lodash')
const relative = require('require-path-relative')
const {findAll, appendChild} = require('domutils')
const {getInnerHTML, getOuterHTML} = require('./util')

function generateCodeBlock (options) {
    
    let {
        node,
        originPath,
        targetPath,
        index
    } = options
    
    let source = getInnerHTML(node)
    
    // 对顶级的 script 标签内部做路径调整
    node.children
    .filter(child => (
    child.type === 'script'
    && child.name === 'script'
    && !(child.attribs && child.attribs.src)
    ))
    .forEach(script => {
        
        let textNode = script.children[0]
        
        textNode.data = transform.normalizeDependences({
            code: textNode.data,
            targetPath,
            originPath,
            components: []
        })
        
    })
    
    let content = getInnerHTML(node).replace(/\\/g, '')
    let snippetFileName = `${path.basename(originPath)}.snippet-${hash.unique(source)}`
    let snippetFilePath = path.join(
    path.dirname(targetPath),
    `${snippetFileName}.js`
    )
    
    fs.writeFileSync(snippetFilePath, content, 'utf8')
    
    let componentName = _.camelCase(snippetFileName).toLowerCase()
    
    // 用 snippet 替换掉 code block 的原有内容
    node.children = []
    appendChild(node, {
        name: componentName,
        type: 'tag',
        attribs: {},
        children: []
    })
    
    return {
        componentName,
        source: `./${snippetFileName}.js`,
        local: _.capitalize(_.camelCase(snippetFileName)),
        filePath: snippetFilePath,
        mainFilePath: targetPath,
        originPath,
        index
    }
    
}

function resolveComponents (root) {
    
    return findAll(
    node => (
    node.type === 'tag'
    && node.name === CODE_BLOCK_NAME
    ),
    root.children
    )
    
}

function generateRender (options) {
    let {
        template,
        targetPath
    } = options
    
    let relativeSanCodeBlockPath = relative(
    path.dirname(targetPath),
    path.join(__dirname, './component/SanCodeBlock.js')
    )
    let backslash = '`'
    let templateContent = `${backslash}${getOuterHTML(template)}${backslash}`
    return `\
import SanCodeBlock from '${relativeSanCodeBlockPath}';
module.exports = san.defineComponent({
    template:${templateContent}
})`
}

function generateScriptByComponents (options) {
    
    let {
        components,
        template,
        targetPath
    } = options
    
    if (!components || !components.length) {
        return ''
    }
    
    let importContent = components.map(component => {
        
        let {
            source,
            local
        } = component
        
        return `import ${local} from '${source}';`
        
    }).join('\n')
    
    let componentContent = components.map(component => {
        
        let {
            local,
            componentName
        } = component
        
        return `'${componentName}': ${local}`
        
    }).join(',\n')
    
    let relativeSanCodeBlockPath = relative(
    path.dirname(targetPath),
    path.join(__dirname, './component/SanCodeBlock.js')
    )
    let backslash = '`'
    let templateContent = `${backslash}${getOuterHTML(template)}${backslash}`
    return `\
${importContent}
import SanCodeBlock from '${relativeSanCodeBlockPath}';
module.exports = san.defineComponent({
    template:${templateContent},
    components: {
        'san-code-block': SanCodeBlock,
        ${componentContent}
    }
    
})`

}

function wrapRoot (ast) {
    
    let section = {
        type: 'tag',
        name: 'section',
        attribs: {
            'class': 'markdown-loader-wrapper'
        },
        children: []
    }
    
    ast.forEach(node => appendChild(section, node))
    
    let template = {
        type: 'tag',
        name: 'template',
        children: []
    }
    
    appendChild(template, section)
    
    return template
}

function generate (options) {
    
    let {
        source,
        ast,
        filePath,
        cacheDir
    } = options
    
    let filename = `${path.basename(filePath)}.${hash.unique(source)}.js`
    let targetFilePath = path.join(cacheDir, filename)
    let template = wrapRoot(ast)
    let components = resolveComponents(template)
    let script
    
    if (components && components.length) {
        components = components.map((component, index) => (
        generateCodeBlock({
            node: component,
            originPath: filePath,
            targetPath: targetFilePath,
            index
        })
        ))
        script = generateScriptByComponents({
            components,
            targetPath: targetFilePath,
            originPath: filePath,
            template: template
        })
    } else {
        script = generateRender({
            targetPath: targetFilePath,
            originPath: filePath,
            template: template
        })
    }

//     let content = `\
// ${getOuterHTML(template)}
// <script>
//     ${script}
// </script>`
    
    let content = script
    fs.writeFileSync(targetFilePath, content.trim(), 'utf8')
    
    return {
        content,
        filePath: targetFilePath
    }
    
}

module.exports = {
    generate
}
