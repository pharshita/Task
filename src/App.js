import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import TimerSection from './Components/TimerSection';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TimerSection />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
