import SearchBar from '../../components/searchBar'
import {Container, Image, Flex, Center, Heading, VStack} from '@chakra-ui/react'
import teemo from '../../images/teemo.png'
import "./ErrorPage.css"

const ErrorPage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const playerName = urlParams.get('playerName');
    return (
        <Container bg='#59515e' centerContent maxW='100%' h='100vh'>
            <Center h='100%' w='60%'>
                <Flex w='100%'>
                    <Center w='50%'>
                        <VStack spacing={5}>
                        <Heading>
                            Uh'Oh! No search results came up for "<span>{playerName}</span>".
                        </Heading>
                        <SearchBar />
                        </VStack>
                    </Center>
                    <Center w='50%'>
                        <Image src={teemo} alt='error'/>
                    </Center>
                </Flex>
            </Center>
        </Container>
    )
}

export default ErrorPage;