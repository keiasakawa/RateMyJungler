import {useState} from 'react';
import {Center} from '@chakra-ui/react'
import SearchBar from '../../components/searchBar'

const MainPage = () => {
    const [player, setPlayer] = useState('')
    return (
      <>
        <Center>
        <SearchBar/>
        </Center>
      </>
      )
}

export default MainPage;