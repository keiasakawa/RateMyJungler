import {Center, Container, Flex} from '@chakra-ui/react'
import SearchBar from '../../components/searchBar'
import LandingPageLogo from "../../components/LandingLogo/landingLogo"

const MainPage = () => {
    return (
      <>
        <Container h="100vh">
          <Center h="100%">
            <Flex flexDirection='column' w='100%'>
              <LandingPageLogo/>
              <SearchBar/>
            </Flex>
          </Center>
        </Container>
      </>
      )
}

export default MainPage;