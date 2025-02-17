const fs = require('fs')

let basePath = ''



const paths = {
    // thumbnail: {
    //     directoryPath: 'public/uploads/property/thumbnail',
    //     renderPath: '/uploads/property/thumbnail',
    //     customPath: 'property/thumbnail'
    // },
    // gallery: {
    //     directoryPath: 'public/uploads/property/gallery',
    //     renderPath: '/uploads/property/gallery',
    //     customPath: 'property/gallery'
    // },
}


function createDirectory(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true })
    }
}

const createFileDirectories = () => {
    try {
        Object.keys(paths).forEach(key => {
            createDirectory(paths[key].directoryPath)
        })
    } catch (err) {
        console.error(`Error creating file directories: ${err.message}`)
    }

}

module.exports = { paths,createFileDirectories };


