import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from '../views/home';
import Game from '../views/game';

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
