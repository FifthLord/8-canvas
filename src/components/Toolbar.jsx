import React from 'react';
import "../style/toolbar.scss"

const Toolbar = () => {
   return (
      <div className='toolbar'>
         <button className='toolbar__bth brush' />
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