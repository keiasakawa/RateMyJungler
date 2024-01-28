import './App.css';
import React, {useEffect} from 'react';
import useToken from './components/useToken';
import LoginButton from './components/login';

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'

import MainPage from './pages/MainPage/MainPage'
import PlayerPage from './pages/PlayerPage/PlayerPage'
import ErrorPage from './pages/ErrorPage/ErrorPage'

function App() {
  const {token, setToken} = useToken();

  return (
    <>
      <ChakraProvider>
        <Router>
          {/* {!token && <LoginButton setToken={setToken}/>} */}
          <Routes>
            <Route exact path="/" element = {<MainPage />} />
            <Route exact path="/player" element = {<PlayerPage />} />
            <Route exact path="/error" element = {<ErrorPage />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </>
  );
}

export default App;
