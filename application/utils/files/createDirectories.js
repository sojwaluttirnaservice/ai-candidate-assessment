const fs = require('fs')

let basePath = ''



const paths = {
    candidate: {
        directoryPath: 'public/uploads/candidate/profile',
        renderPath: '/uploads/candidate/profile',
        customPath: 'candidate/profile'
    },
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

module.exports = { paths ,createFileDirectories };


