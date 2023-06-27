import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import TaskFrom from './component/TaskFrom';
import About from './component/About';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskFrom/>} />
        <Route path="about" element={<About />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
