import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import "../style/canvas.scss"
import Brush from '../tools/Brush';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Rect from '../tools/Rect';
import axios from 'axios'

const Canvas = observer(() => {
   const canvasRef = useRef()
   const usernameRef = useRef()
   const [modal, setModal] = useState(true)
   const params = useParams()
   console.log(params);

   useEffect(() => {
      canvasState.setCanvas(canvasRef.current)
      axios.get(`http://localhost:3001/image?id=${params.id}`)
         .then(response => {
            const img = new Image()
            img.src = response.data
            img.onload = () => {
               this.ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
               this.ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
            }
         })
   }, [])

   useEffect(() => {
      if (canvasState.username) {
         const socket = new WebSocket('ws://localhost:3000/')
         canvasState.setSocket(socket)
         canvasState.setSessionId(params.id)
         toolState.setTool(new Brush(canvasRef.current, socket, params.id))
         socket.onopen = () => {
            console.log('Підключенно');
            socket.send(JSON.stringify({
               id: params.id,
               username: canvasState.username,
               method: "connection"
            }))
         }
         socket.onmessage = (event) => {
            let msg = JSON.parse(event.data)
            console.log(msg)
            switch (msg.method) {
               case "connection":
                  console.log(`Користувач ${msg.username} доєднався`);
                  break
               case "draw":
                  drawHandler(msg)
                  break
               default:
                  break;
            }
         }
      }
   }, [canvasState.username])

   const drawHandler = (msg) => {
      const figure = msg.figure
      const ctx = canvasRef.current.getContext('2d')
      switch (figure.type) {
         case "brush":
            Brush.draw(ctx, figure.x, figure.y, figure.color)
            break;
         case "rect":
            Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color)
            break;
         case "eraser":
            Brush.draw(ctx, figure.x, figure.y, figure.color)
            break;
         case "finish":
            ctx.beginPath()
            break;
         default:
            break;
      }
   }

   const mouseDownHandler = () => {
      canvasState.pushToUndo(canvasRef.current.toDataURL())
      axios.post(`http://localhost:3000/image?id=${params.id}`, { img: canvasRef.current.toDataURL() })
         .then(response => console.log(response.data))
   }

   const connectHandler = () => {
      canvasState.setUsername(usernameRef.current.value)
      setModal(false)
   }

   return (
      <div className='canvas'>
         <Modal show={modal} onHide={() => { }}>
            <Modal.Header>
               <Modal.Title>Напишіть ваше ім'я</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <input type="text" ref={usernameRef} />
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={() => connectHandler()}>
                  Увійти
               </Button>
            </Modal.Footer>
         </Modal>
         <canvas
            onMouseDown={() => mouseDownHandler()}
            ref={canvasRef} width={600} height={400} />
      </div>
   );
});

export default Canvas;