//import Tool from "./Tool";
import Brush from "./Brush";

export default class Eraser extends Brush {
   // constructor(canvas, socket, id) {
   //    super(canvas, socket, id);
   // }

   mouseMoveHandler(e) {
      if (this.mouseDown) {
         this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
               type: 'eraser',
               x: e.pageX - e.target.offsetLeft,
               y: e.pageY - e.target.offsetTop,
               colorS: "#ffff"
            }
         }))
      }
   }

   static draw(ctx, x, y, colorS) {
      ctx.strokeStyle = colorS
      ctx.lineTo(x, y)
      ctx.stroke()
   }
   // draw(x, y) {
   //    this.ctx.lineTo(x, y)
   //    this.ctx.stroke()
   //    this.ctx.strokeStyle = "#ffff"
   // }
}