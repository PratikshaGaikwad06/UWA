const jsonServer = require('json-server')
const server = jsonServer.create({
  static: "./client",
  bodyParser: true
})
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults({ noCors: true })
const cors = require('cors');

server.use(middlewares)
server.use(cors());

server.use("/", router)
server.listen(3000, () => {
  console.log('Mock api server listening at localhost:3000')
})