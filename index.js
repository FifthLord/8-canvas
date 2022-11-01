
const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()

const PORT = process.env.PORT || 5000

app.ws('/', (ws, req) => {
   console.log('Підключеня виконано')
   ws.send('Ти успішно законектився')
   ws.on('message', (msq) => {
      msq = JSON.parse(msq)
      switch (msq.method) {
         case "connection":
            connectionHandler(ws, msq)
            break
      }
   })
})

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))

const connectionHandler = (ws, msq) => {
   ws.id = msq.id
   broadcastConnection(ws, msq)
}

const broadcastConnection = (ws, msq) => {
   aWss.clients.forEach(client => {
      if (client.id === msq.id) {
         client.send(`Користувач ${msq.username} доєднався`)
      }
   })
}