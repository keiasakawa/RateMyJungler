import {React, useState, useEffect} from 'react';
import { Image, Text, Heading, Textarea } from '@chakra-ui/react'
import {instance} from '../../utils';
import {limiter} from '../../limiter';
import {ReviewModal} from './ReviewModal'

const PlayerPage = () => {
    const playerData = {accountId: '', profileIconId: 0, revisionDate: 0, name: '', id: '', puuid: '', summonerLevel: 0}
    const [player, setPlayer] = useState(playerData);

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
  

      useEffect(() => {
        getSummoner();
      }, []);
      

    return (
      <>
      <Image src={`http://ddragon.leagueoflegends.com/cdn/13.12.1/img/profileicon/${player.profileIconId}.png`} alt='profilepic' />
      <Text>Player Name: {player.name}</Text>
      <Text>Level: {player.summonerLevel}</Text>

      <Heading>Leave a Review</Heading>
      <ReviewModal/>

      <Heading>Reviews</Heading>
      </>
    )
}

export default PlayerPage;