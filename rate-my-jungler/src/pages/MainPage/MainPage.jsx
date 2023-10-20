import React, {useState} from 'react';
import {Input, Card, CardHeader, CardBody, Image, Stack, Button, Box} from '@chakra-ui/react'
import {instance} from '../../utils';
import {useNavigate} from "react-router-dom";

const MainPage = () => {
    const navigate = useNavigate();
    const [player, setPlayer] = useState('')

    async function getSummoner() {
        try {
          navigate(`/player?playerName=${player}`)
        }
        catch (err){
          if (err instanceof Error) {
            console.log(err.message)
          }
      }
    }

    const handleChange = (event) => setPlayer(event.target.value)
    return (
      <>
        <Input value={player} placeholder='enter player name' size='lg' onChange={handleChange}/>
        <Button onClick={getSummoner}>Search</Button>
      </>
      )
}

export default MainPage;