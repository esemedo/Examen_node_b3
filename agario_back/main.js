const express = require('express')
const app = express()
const cors = require("cors")
const bodyParser = require('body-parser')
const port = 3001
const http = require("node:http")
const {Server} = require("socket.io")
const getRandomInt = require('./utils/getRandomInt')
const getRandomColor = require('./utils/getRandomColor')
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

let allPlayer = []
io.on('connection', (socket)=> {
    console.log("Connecion client : "+ socket.id);
    socket.on('createPlayer', (data)=> {
        const allXPosition = allPlayer.map(player => ({start:player.x, end: player.x + (player.point*10)}))
        const allYPosition = allPlayer.map(player =>({start:player.y, end: player.y + (player.point*10)}))
        let xNewPlayer = getRandomInt(data.width)   
        let yNewPlayer = getRandomInt(data.height)   
        // ne pas apparaitre sur un autre joueur
        while (allXPosition.filter((position)=> xNewPlayer > position.start && xNewPlayer < position.end).length > 0) {
            xNewPlayer = getRandomInt(data.width)
        }
        while (allYPosition.filter((position)=> yNewPlayer > position.start && yNewPlayer < position.end).length >0) {
            yNewPlayer = getRandomInt(data.height)
        }
        const newPlayer = {id: socket.id, color: getRandomColor(), point: 1, x:xNewPlayer, y:yNewPlayer}
        allPlayer.push(newPlayer)
        socket.emit("player", newPlayer)
        io.emit("newPlayer", allPlayer)
        
    })
    socket.on('position', (data)=>{
        const playerIndex = allPlayer.map((item)=> item.id).indexOf(socket.id)
        if(playerIndex === -1) return
        allPlayer[playerIndex].x = data.x
        allPlayer[playerIndex].y = data.y
        socket.emit("player", allPlayer[playerIndex])
        io.emit("newPlayer", allPlayer)
    })


    socket.on('disconnect', () => {
        console.log('Client déconnecté :', socket.id);
        const allPlayerFiltered = allPlayer.filter((player)=> player.id !== socket.id)
        allPlayer= allPlayerFiltered
        io.emit("removePlayer", allPlayerFiltered)

    });
})

server.listen(port, () => { console.log("Server running") });
