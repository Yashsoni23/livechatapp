import './App.css';
// import '../src/newstyle.css'
import { BrowserRouter  as Router ,Routes,Route } from 'react-router-dom';
import Test from './Components/Test';
import Mainform from './Components/MainForm';
import Chats from './Components/Chats';


function App() {
  return (
    <>
     
    <Router>
      <Routes>
          {/* <Route path='/' element={<Test/>}></Route> */}
          <Route path='/' element={<Mainform/>}></Route>
          <Route path='/chat/:room' element={<Chats/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
