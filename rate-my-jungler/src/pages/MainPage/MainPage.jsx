import {Center, Container, Flex, Image} from '@chakra-ui/react'
import SearchBar from '../../components/searchBar'
import LandingPageLogo from "../../components/LandingLogo/landingLogo"
import './MainPage.css'

const MainPage = () => {
    return (
      <>
        <Container className='container' h="100vh" maxW="100%" bg='black'>
          <Center h="100%">
            <Flex flexDirection='column' w='50%' alignItems="center">
              <LandingPageLogo/>
              <SearchBar/>
            </Flex>
          </Center>
        </Container>
      </>
      )
}

export default MainPage;