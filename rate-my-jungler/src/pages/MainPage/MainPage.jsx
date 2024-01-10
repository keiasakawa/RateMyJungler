import {Center, Container, Flex, Image} from '@chakra-ui/react'
import SearchBar from '../../components/searchBar'
import LandingPageLogo from "../../components/LandingLogo/landingLogo"

const MainPage = () => {
    return (
      <>
        <Container h="100vh" maxW="100%">
          <Image src="images/iu.jpeg" alt='background'/>
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