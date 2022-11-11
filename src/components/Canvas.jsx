import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import "../style/canvas.scss"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import Line from '../tools/Line';
import Eraser from '../tools/Eraser';
import Circle from '../tools/Circle';

const Canvas = observer(() => {
   const canvasRef = useRef()
   const usernameRef = useRef()
   const [modal, setModal] = useState(true)
   const params = useParams()
   console.log(params);

   useEffect(() => {
      canvasState.setCanvas(canvasRef.current)
      //3001 тому що 3000 занятий сервером
      let ctx = canvasRef.current.getContext('2d')
      axios.get(`http://localhost:3001/image?id=${params.id}`)
         .then(response => {
            const img = new Image()
            img.src = response.data
            img.onload = () => {
               ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
               ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
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
            Brush.draw(ctx, figure.x, figure.y, figure.colorS, figure.width)
            break;
         case "rect":
            Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color, figure.colorS, figure.width)
            break;
         case "eraser":
            Eraser.draw(ctx, figure.x, figure.y, figure.colorS)
            break;
         case "line":
            Line.staticDraw(ctx, figure.cx, figure.cy, figure.sx, figure.sy, figure.colorS, figure.width)
            break;
         case "circle":
            Circle.staticDraw(ctx, figure.sX, figure.sY, figure.r, figure.sA, figure.eA, figure.color, figure.width, figure.colorS)
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