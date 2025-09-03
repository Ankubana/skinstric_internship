import React from 'react';
import logo from './logo.svg';
import Home from './Pages/Home'
import Testing from './Pages/testing';
import TopBar from './Pages/Top_bar';
import Result from './Pages/Result';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Camera from './Pages/camera';
import Select from './Pages/Select';
import Summary from './Pages/Summary'

function App() {
  return (
    <>
 <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/Result"  element={<Result />} />
        <Route path="/camera"  element={<Camera />} />
        <Route path="/Summary" element={<Summary/>} />
         <Route path="/Select" element={<Select />} />
         
         
      </Routes>
    </Router>
    </>
  );
}

export default App;
