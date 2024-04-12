const datauriparser = require('datauri/parser')
const path = require('path')

const getfile = (file) => {
    const parser = new datauriparser()
    const extName = path.extname(file.originalname).toString()
    return parser.format(extName, file.buffer)
}
module.exports = getfile