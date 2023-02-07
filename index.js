const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const app = express();
const server = http.createServer(app)
const io = socketio(server)
const formatMessage = require('./utils/messages')
//SET static folder
app.use(express.static(path.join(__dirname, 'public')))
const botName = " Chat App Bot"
//run when client connects 
io.on('connection', socket=>{
    socket.on('joinRoom', ({ username, room }) => {

        //welcome current user 
        socket.emit('message', formatMessage(botName, "Welcome to chat app"))

        //broadcast when user connects
        socket.broadcast.emit('message', formatMessage(botName, "A user has joined the chat"));

    })

    
    //listen for chat msg 
    socket.on('chatMessage',(msg)=>{
        io.emit('message',formatMessage('user', msg))
    })

    
    //run when discconects
    socket.on('disconnect',()=>{
        io.emit('message',formatMessage(botName,"A user has left the chat"))
    })

})
const PORT = 3000 || process.env.PORT;

server.listen(PORT, ()=>console.log(`Server runniong on port ${PORT}`));