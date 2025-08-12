import React from 'react';
import logo from './logo.svg';
import Home from './Pages/Home'
import Test from './Pages/testing';
import TopBar from './Pages/Top_bar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
 <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
