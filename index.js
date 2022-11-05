
const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()

const PORT = process.env.PORT || 3000

app.ws('/', (ws, req) => {
   console.log('Підключеня виконано')
   ws.send('Ти успішно законектився')
   ws.on('message', (msg) => {
      msg = JSON.parse(msg)
      switch (msg.method) {
         case "connection":
            connectionHandler(ws, msg)
            break
         case "draw":
            broadcastConnection(ws, msg)
            break
      }
   })
})

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))

const connectionHandler = (ws, msg) => {
   ws.id = msg.id
   broadcastConnection(ws, msg)
}

const broadcastConnection = (ws, msg) => {
   aWss.clients.forEach(client => {
      if (client.id === msg.id) {
         client.send(JSON.stringify(msg))
      }
   })
}