import React from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import "../style/toolbar.scss"
import Brush from '../tools/Brush';
import Circle from '../tools/Circle';
import Eraser from '../tools/Eraser';
import Line from '../tools/Line';
import Rect from '../tools/Rect';

const Toolbar = () => {
   return (
      <div className='toolbar'>
         <button className='toolbar__bth brush' onClick={() => toolState.setTool(new Brush(canvasState.canvas))} />
         <button className='toolbar__bth rect' onClick={() => toolState.setTool(new Rect(canvasState.canvas))} />
         <button className='toolbar__bth circle' onClick={() => toolState.setTool(new Circle(canvasState.canvas))} />
         <button className='toolbar__bth eraser' onClick={() => toolState.setTool(new Eraser(canvasState.canvas))} />
         <button className='toolbar__bth line' onClick={() => toolState.setTool(new Line(canvasState.canvas))} />
         <input style={{ marginLeft: 10 }} type="color" />
         <button className='toolbar__bth undo' />
         <button className='toolbar__bth redo' />
         <button className='toolbar__bth save' />
      </div>
   );
};

export default Toolbar;