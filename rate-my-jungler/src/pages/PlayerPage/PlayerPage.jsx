import React, {useState, useEffect} from 'react';
import { Image, Text, Heading, Card, CardHeader, CardBody, Box, Stack, Container, Center, Button, Flex } from '@chakra-ui/react'
import {instance} from '../../utils';
import {limiter} from '../../limiter';
import {ReviewModal} from './ReviewModal'
import {AiFillStar, AiOutlineStar} from 'react-icons/ai'
import { IconContext } from "react-icons";
import SortingDropdown from '../../components/sort'

const PlayerPage = () => {
    const [player, setPlayer] = useState({});
    const [info, setInfo] = useState({})
    const [ratings, setRatings] = useState([])
    const [numRatings, setNumRatings] = useState(20)
    const [sort, setSort] = useState('recent')

    async function getSummoner() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const player = urlParams.get('playerName');
            let res = await limiter.schedule(() => instance.get(`summoner/${player}`));
            setPlayer(player => ({...player, ...res.data}))
        }
        catch (err){
          if (err instanceof Error) {
            console.log(err.message)
          }
      }
    } 
    async function getRatings() {
      try {
        let res = await limiter.schedule(() => instance.get(`ratings/${player.accountId}?sort=${sort}`));
        console.log(res.data)
        setRatings(res.data)
      }
      catch (err){
        if (err instanceof Error) {
          console.log(err.message)
        }
    }
    }

        function calculateWinrate() {

          if (info.wins + info.losses === 0){
            return 0
          }
          return (info.wins / (info.wins + info.losses) * 100).toFixed(1)
        }

      useEffect(() => {
        getSummoner();
      }, []);

      useEffect(() => {
        async function getInfo() {
          try {
            let res = await limiter.schedule(() => instance.get(`info/${player.id}`));
            setInfo(info => ({...info, ...res.data[0]}))
          }
          catch (err) {
            if (err instanceof Error) {
              console.log(err.message)
            }
          }
        }
        getInfo()
      }, [player])

      useEffect(() => {
        getRatings();
      }, [player, sort])
      

    return (
      <>
      <Container maxW='100%'>
        <Center>
          <Stack>
            <Image src={`http://ddragon.leagueoflegends.com/cdn/13.21.1/img/profileicon/${player.profileIconId}.png`} alt='profilepic' />
            <Text>Player Name: {player.name}</Text>
            <Text>Level: {player.summonerLevel}</Text>
            <Text>Win Rate: {calculateWinrate()}%</Text>
            <Text>Rank: {info.tier} {info.rank}</Text>
          </Stack>
        </Center>

        <Center>
        <ReviewModal accountId={player.accountId} getRatings={getRatings}/>
        </Center>

        <Container maxW='90%'>
          <Stack>
          <Heading>Reviews</Heading>
          <SortingDropdown setSort={setSort}/>
          <Container maxW='100%' padding='0' mb={20}>
            <Stack spacing='4'>
            {
              ratings.slice(0, numRatings).map(rating => {
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
          </Container>
          <Center>
            {numRatings < ratings.length && <Button onClick={() => setNumRatings(numRatings + 20)}>Load More Ratings</Button>}
          </Center>
          </Stack>
        </Container>
      </Container>
      </>
    )
}

export default PlayerPage;