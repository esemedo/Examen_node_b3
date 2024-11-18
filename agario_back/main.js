const express = require('express')
const app = express()
const cors = require("cors")
const bodyParser = require('body-parser')
const port = 3001
const http = require("node:http")
const {Server} = require("socket.io")
const server = http.createServer(app);
const io = new Server(server, {cors:{
    origin: "http://localhost:3000"
} });

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.send('ok')
   })

io.on('connection', (socket)=> {

})

server.listen(port, () => { console.log("Server running") });
