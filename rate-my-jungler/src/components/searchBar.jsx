import {useState} from 'react';
import {Button, Input, InputGroup, InputLeftElement, InputRightElement} from '@chakra-ui/react'
import {useNavigate} from "react-router-dom";
import {SearchIcon} from '@chakra-ui/icons'

const SearchBar = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('')

    document.addEventListener("keypress", function(event) {
        if(event.keyCode==13) {
            getSummoner()
        }
    })

    async function getSummoner() {
        if (search.length != 0) {
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
    }

    return (
        <InputGroup>
        <InputLeftElement pointerEvents='none'>
            <SearchIcon color="#EDF2F7"/>
        </InputLeftElement>
        <Input value={search} color="#EDF2F7" _placeholder={{ color: "#EDF2F7"}} placeholder='Enter player name' onChange={(e) => setSearch(e.target.value)}/>
        <InputRightElement width='6rem'>
            <Button h='1.75rem' onClick={getSummoner}>Search</Button>
        </InputRightElement>
        </InputGroup>
    )
}

export default SearchBar;