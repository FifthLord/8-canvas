import React from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import "../style/toolbar.scss"
import Brush from '../tools/Brush';

const Toolbar = () => {
   return (
      <div className='toolbar'>
         <button className='toolbar__bth brush' onClick={() => toolState.setTool(new Brush(canvasState.canvas))} />
         <button className='toolbar__bth rect' />
         <button className='toolbar__bth circle' />
         <button className='toolbar__bth eraser' />
         <button className='toolbar__bth line' />
         <input style={{ marginLeft: 10 }} type="color" />
         <button className='toolbar__bth undo' />
         <button className='toolbar__bth redo' />
         <button className='toolbar__bth save' />
      </div>
   );
};

export default Toolbar;