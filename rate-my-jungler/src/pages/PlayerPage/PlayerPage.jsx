import React, {useState, useEffect} from 'react';
import { Image, Text, Heading, Card, CardHeader, CardBody, Box, Stack, Container, Center, Button } from '@chakra-ui/react'
import {instance} from '../../utils';
import {limiter} from '../../limiter';
import {ReviewModal} from './ReviewModal'
import {AiFillStar, AiOutlineStar} from 'react-icons/ai'
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md'
import {RxDoubleArrowLeft, RxDoubleArrowRight} from 'react-icons/rx'
import { IconContext } from "react-icons";

const PlayerPage = () => {
    const playerData = {accountId: '', profileIconId: 0, revisionDate: 0, name: '', id: '', puuid: '', summonerLevel: 0}
    const [player, setPlayer] = useState(playerData);
    const [ratings, setRatings] = useState([])

    async function getSummoner() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const player = urlParams.get('playerName');
            let res = await limiter.schedule(() => instance.get(`summoner/${player}`));
            setPlayer(res.data)
        }
        catch (err){
          if (err instanceof Error) {
            console.log(err.message)
          }
      }
      }

        async function getRatings() {
          try {
            let res = await limiter.schedule(() => instance.get(`ratings/${player.accountId}`));
            setRatings(res.data)
          }
          catch (err){
            if (err instanceof Error) {
              console.log(err.message)
            }
        }
        }
  

      useEffect(() => {
        getSummoner();
      }, []);

      useEffect(() => {
        getRatings();
      }, [player])
      

    return (
      <>
      <Container maxW='100%'>
        <Center>
          <Stack>
            <Image src={`http://ddragon.leagueoflegends.com/cdn/13.12.1/img/profileicon/${player.profileIconId}.png`} alt='profilepic' />
            <Text>Player Name: {player.name}</Text>
            <Text>Level: {player.summonerLevel}</Text>
          </Stack>
        </Center>

        <Center>
        <ReviewModal accountId={player.accountId} getRatings={getRatings}/>
        </Center>

        <Heading>Reviews</Heading>
        <Container maxW='container.m' mb={20}>
          <Stack spacing='4'>
          {
            ratings.map(rating => {
              return (
                <Card key={rating._id} variant='filled'>
                  <CardHeader>
                    <Heading size='md'>
                      <Box display='flex'>
                      {Array(5).fill('').map((_, i) => {
                        return i < rating.stars ? <IconContext.Provider value={{ color: "#FFD700"}}><AiFillStar key={i}/></IconContext.Provider> : <AiOutlineStar key={i}/>
                      }
                        )}
                        </Box>
                    </Heading>
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
          <Button>
            <RxDoubleArrowLeft />
          </Button>
          <Button>
            <MdKeyboardArrowLeft />
          </Button>
          <Button>
            <MdKeyboardArrowRight />
          </Button>
          <Button>
            <RxDoubleArrowRight />
          </Button>
        </Container>
      </Container>
      </>
    )
}

export default PlayerPage;