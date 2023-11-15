import './App.css';
import React from 'react';
import useToken from './components/useToken';
import LoginButton from './components/login';

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'

import MainPage from './pages/MainPage/MainPage'
import PlayerPage from './pages/PlayerPage/PlayerPage'

function App() {
  const {token, setToken} = useToken();

  return (
    <>
      <ChakraProvider>
        <Router>
          {!token && <LoginButton setToken={setToken}/>}
          <Routes>
            <Route exact path="/" element = {<MainPage />} />
            <Route exact path="/player" element = {<PlayerPage />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </>
  );
}

export default App;
