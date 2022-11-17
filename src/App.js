import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Chatroom from './Components/Chatroom';
import Mainform from './Components/Mainform';
import  './style.css'
function App() {
  return (
    <div className="container-fluid bg-light text-dark d-flex align-items-center justify-content-center">
      <Router>
        <Routes>
          <Route index element={<Mainform/>}></Route>
          <Route path='/chat/:roomName' element={<Chatroom/>}></Route>
          <Route path='*' element={<h1>404 Error</h1>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
