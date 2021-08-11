// require your server and launch it

const server = require('./api/server');

const port = 5555

server.listen(port, () => {
    console.log(`server running on port ${port}`)
})
