import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Main from './pages/Main'; 
import Solution from './pages/Solution'; 
import Notice from './pages/Notice';
import MyPage from './pages/MyPage'; 

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/pages/main" element={<Main />} />
          <Route path="/pages/solution" element={<Solution />} />
          <Route path="/pages/notice" element={<Notice />} />
          <Route path="/pages/mypage" element={<MyPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
