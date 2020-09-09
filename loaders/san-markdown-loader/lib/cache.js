const path = require('path')
const mkdirp = require('mkdirp')
const fs = require('fs')

const root = path.join(__dirname, '../.cache')

function createCacheRootDir () {
    mkdirp.sync(root)
}

exports.getCacheFilePath = function (resourcePath) {
    let basename = path.basename(resourcePath)
    let cacheFilePath = path.join(root, `${basename}.js`)
    return cacheFilePath
}

exports.save = function (filePath, content) {
    createCacheRootDir()
    fs.writeFileSync(filePath, content, 'utf8')
}