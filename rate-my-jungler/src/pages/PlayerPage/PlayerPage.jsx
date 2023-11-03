import React, {useState, useEffect} from 'react';
import { Image, Text, Heading, Card, CardHeader, CardBody, Box, Stack, Container, Center, Button, Flex } from '@chakra-ui/react'
import {instance} from '../../utils';
import {limiter} from '../../limiter';
import {ReviewModal} from './ReviewModal'
import {AiFillStar, AiOutlineStar} from 'react-icons/ai'
import { IconContext } from "react-icons";
import SortingDropdown from '../../components/sort'
import Distribution from '../../components/ratingDistribution'
import './PlayerPage.css'

const PlayerPage = () => {
    const [player, setPlayer] = useState({});
    const [numRatings, setNumRatings] = useState(20)
    const [sort, setSort] = useState('recent')
    const [isLoading, setIsLoading] = useState(true)

    async function getSummoner() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const playerName = urlParams.get('playerName');
            let res = await limiter.schedule(() => instance.get(`summoner/${playerName}`));
            let info = await limiter.schedule(() => instance.get(`info/${res.data.id}`));
            let ratings = await limiter.schedule(() => instance.get(`ratings/${res.data.accountId}?sort=${sort}`));

            setPlayer({...res.data, info: info.data[0], ratings: ratings.data})
            setIsLoading(false)
        }
        catch (err){
          if (err instanceof Error) {
            console.log(err.message)
          }
      }
    } 

    async function updateRatings(newSort) {
      console.log('enter')
      try {
        let ratings = await limiter.schedule(() => instance.get(`ratings/${player.accountId}?sort=${newSort}`));
      setPlayer(oldState => ({...oldState, ratings:ratings.data}))
      }
      catch(err) {
        if (err instanceof Error) {
          console.log(err.message)
        }
      }
    }


      function calculateWinrate() {
        if (player.info.wins + player.info.losses === 0){
          return 0
        }
        return (player.info.wins / (player.info.wins + player.info.losses) * 100).toFixed(1)
      }

      useEffect(() => {
        getSummoner();
      }, []);

      function getAverage() {
        let total = 0.0
        player.ratings.forEach((element) => {
          total += element.stars
        })
        const average_rounded = Math.round((total / player.ratings.length) * 100) / 100
        return average_rounded
      }
      

    return (
      <>
      {!isLoading &&
      <Container maxW='100%'>
        <Container marginLeft='5%' marginTop='5%'>
          <Flex maxW='100%' maxH='100%'>
            <Stack className="profile" >
              <Image borderRadius='full' maxH='50%' maxW='50%' src={`http://ddragon.leagueoflegends.com/cdn/13.21.1/img/profileicon/${player.profileIconId}.png`} alt='profilepic' />
              <Text>Player Name: {player.name}</Text>
              <Text className='rating' as='b'>{getAverage()} / 5</Text>
              <Text>Level: {player.summonerLevel}</Text>
              <Text>Win Rate: {calculateWinrate()}%</Text>
              <Text>Rank: {player.info.tier} {player.info.rank}</Text>
            </Stack>
            <Distribution ratings={player.ratings}/>
          </Flex>
        </Container>

        <Center>
        <ReviewModal accountId={player.accountId} updateRatings={updateRatings}/>
        </Center>

        <Container maxW='90%'>
          <Stack>
          <Heading>Reviews</Heading>
          <SortingDropdown updateRatings={updateRatings} setSort={setSort}/>
          <Container maxW='100%' padding='0' mb={20}>
            <Stack spacing='4'>
            { player &&
              player.ratings.slice(0, numRatings).map(rating => {
                return (
                  <Card key={rating._id} variant='filled'>
                    <CardHeader>
                      <Flex spacing = '4'>
                        <Heading size='md'>
                          <Box display='flex'>
                          {Array(5).fill('').map((_, i) => {
                            return i < rating.stars ? <IconContext.Provider value={{ color: "#FFD700"}}><AiFillStar key={i}/></IconContext.Provider> : <AiOutlineStar key={i}/>
                          }
                            )}
                            </Box>


                        </Heading>
                        <Text>{new Date(rating.datetime).toLocaleDateString('en-us', {year: 'numeric', month:'short', day:'numeric'})}</Text>
                      </Flex>
                      </CardHeader>
                      <CardBody>
                        <Box>
                          <Text>{rating.message}</Text>
                        </Box>
                      </CardBody>
                  </Card>
                )
              })
            }
            </Stack>
            <Center mt={10}>
              {numRatings < player.ratings.length && <Button onClick={() => setNumRatings(numRatings + 20)}>Load More Ratings</Button>}
            </Center>
            </Container>
          </Stack>
        </Container>
      </Container>
}
      </>
    )
}

export default PlayerPage;