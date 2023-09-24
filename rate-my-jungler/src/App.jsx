import './App.css';
import React from 'react';
import {instance} from './utils';

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'

import MainPage from './pages/MainPage/MainPage'
import PlayerPage from './pages/PlayerPage/PlayerPage'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route exact path="/" element = {<MainPage />} />
          <Route exact path="/player" element = {<PlayerPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
