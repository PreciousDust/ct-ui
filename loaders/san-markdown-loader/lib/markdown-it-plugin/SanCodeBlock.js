const markdownitfence = require('./fence')
const _ = require('lodash')

function resolveFenceData (fence) {
    
    fence = fence.trim()
    
    let prefix = fence.slice(0, 3)
    let title = fence.slice(4)
    
    return {
        prefix,
        title
    }
    
}

{/*<san-code-block title="${title}" content="${escapedContent}">*/}

module.exports = function (md) {
    
    return markdownitfence(md, 'san', {
        validate (params) {
            let {prefix, title} = resolveFenceData(params)
            return prefix === 'san' && title
        },
        render (tokens, index, options, env, self) {
            
            let {info, content} = tokens[index]
            let {title} = resolveFenceData(info)
            let escapedContent = _.escape(content)
            .replace(/{{/g, '&#x7B;&#x7B;')
            .replace(/}}/g, '&#x7D;&#x7D;')
            return `
<san-code-block title="${title}" content="${escapedContent}">
    ${content}
</san-code-block>
`
        
        }
    })
    
}
