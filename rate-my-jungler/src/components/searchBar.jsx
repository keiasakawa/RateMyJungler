import {useState} from 'react';
import {Button, Input, InputGroup, InputLeftElement, InputRightElement} from '@chakra-ui/react'
import {useNavigate} from "react-router-dom";
import {SearchIcon} from '@chakra-ui/icons'

const SearchBar = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('')

    async function getSummoner() {
        try {
            navigate(`/player?playerName=${search}`)

            window.location.reload()
        }
        catch (err){
          if (err instanceof Error) {
            console.log(err.message)
          }
      }
    }

    return (
        <InputGroup>
        <InputLeftElement pointerEvents='none'>
            <SearchIcon />
        </InputLeftElement>
        <Input value={search} placeholder='Enter player name' onChange={(e) => setSearch(e.target.value)}/>
        <InputRightElement width='6rem'>
            <Button h='1.75rem' onClick={getSummoner}>Search</Button>
        </InputRightElement>
        </InputGroup>
    )
}

export default SearchBar;