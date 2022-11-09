import Tool from "./Tool";


export default class Line extends Tool {
   constructor(canvas, socket, id) {
      super(canvas, socket, id);
      this.listen()
   }

   listen() {
      this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
      this.canvas.onmousedown = this.mouseDownHandler.bind(this)
      this.canvas.onmouseup = this.mouseUpHandler.bind(this)
   }

   mouseUpHandler(e) {
      this.mouseDown = false
      this.socket.send(JSON.stringify({
         method: 'draw',
         id: this.id,
         figure: {
            type: 'line',
            cx: this.currentX,
            cy: this.currentY,
            sx: this.startX,
            sy: this.startY,
            colorS: this.ctx.strokeStyle,
            weight: this.ctx.lineWidth
         }
      }))
   }
   mouseDownHandler(e) {
      this.mouseDown = true
      this.ctx.beginPath()
      this.startX = e.pageX - e.target.offsetLeft;
      this.startY = e.pageY - e.target.offsetTop;
      this.saved = this.canvas.toDataURL()
   }
   mouseMoveHandler(e) {
      if (this.mouseDown) {
         //*при додавані CX CY в метод "line" не забути проставити this. перед всіма current
         this.currentX = e.pageX - e.target.offsetLeft;
         this.currentY = e.pageY - e.target.offsetTop;
         this.draw(this.startX, this.startY, this.currentX, this.currentY)
      }
   }

   draw(sx, sy, cx, cy) {
      const img = new Image()
      img.src = this.saved
      img.onload = () => {
         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
         this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
         this.ctx.beginPath()
         this.ctx.moveTo(sx, sy)
         this.ctx.lineTo(cx, cy)
         this.ctx.stroke()
      }
   }
   static staticDraw(ctx, sx, sy, cx, cy, colorS, weight) {
      ctx.strokeStyle = colorS
      ctx.lineWidth = weight
      ctx.beginPath()
      ctx.moveTo(sx, sy)
      ctx.lineTo(cx, cy)
      ctx.stroke()
   }
}