//import Tool from "./Tool";
import Brush from "./Brush";

export default class Eraser extends Brush {
   constructor(canvas, socket, id) {
      super(canvas, socket, id);
   }

   // static draw(ctx, x, y) {
   //    ctx.lineTo(x, y)
   //    ctx.stroke()
   //    ctx.strokeStyle = "#ffff"
   // }
   draw(x, y) {
      this.ctx.lineTo(x, y)
      this.ctx.stroke()
      this.ctx.strokeStyle = "#ffff"
   }
}