import SettingBar from './components/SettingBar';
import Canvas from "./components/Canvas"
import Toolbar from './components/Toolbar';
import './style/app.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

function App() {
   return (
      //* */ BrowserRouter in index.js
      // <div className="app">
      //    <Routes>
      //       <Route path='/:id' element={<Toolbar />} />
      //       <Route path='/:id' element={<SettingBar />} />
      //       <Route path='/:id' element={<Canvas />} />
      //       <Navigate to={`f${(+new Date).toString(16)}`} />
      //    </Routes>
      // </div>
      <div className="app">
         <BrowserRouter>
            <Routes>
               <Route path='/:id' element={<><Toolbar /><SettingBar /><Canvas /></>} />
               <Route path='/' element={<><Toolbar /><SettingBar /><Canvas /><Navigate to={`/f${(+new Date()).toString(16)}`} replace /></>} />
            </Routes>
         </BrowserRouter>
      </div>
      // <div className="app">
      //    <Toolbar />
      //    <SettingBar />
      //    <Canvas />
      //    <Navigate to={`f${(+new Date).toString(16)}`} />
      // </div>
   );
}

export default App;
