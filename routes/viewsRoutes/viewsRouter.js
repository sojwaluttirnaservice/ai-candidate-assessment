const { renderPage } = require("../../application/utils/responses/ApiResponse")
const getRouter = require("../utils/getRouter")


const viewsRouter = getRouter()


viewsRouter.get('/', (req, res) => {
    renderPage(res, 'index')
})





module.exports = viewsRouter