import {useState} from 'react';
import {Button} from '@chakra-ui/react'
import SearchBar from '../../components/searchBar'

const MainPage = () => {
    const [player, setPlayer] = useState('')
    return (
      <>
        <SearchBar/>
      </>
      )
}

export default MainPage;