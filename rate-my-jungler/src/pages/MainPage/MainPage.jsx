import {Center, Container} from '@chakra-ui/react'
import SearchBar from '../../components/searchBar'

const MainPage = () => {
    return (
      <>
        <Container h="100vh">
          <Center h="100%">
            <SearchBar/>
          </Center>
        </Container>
      </>
      )
}

export default MainPage;