import React from 'react';
import {Text, Stack, Box, Flex} from '@chakra-ui/react';

const Distribution = ({ratings}) => {
    let distribution = new Map()
    ratings.forEach((element) => {
        if (distribution.has(element.stars)) {
            distribution.set(element.stars, distribution.get(element.stars) + 1)
        }
        else {
            distribution.set(element.stars, 1)
        }
    })

    // Return the bar colored up to the percent of stars
    const returnBar = (numRatings) => {
        const getPercent = numRatings / ratings.length
        return (
            <>
            <Flex alignItems='center'>
            <Box bg='tomato' h='10px' w={`${200*getPercent}px`}/><Box h='10px' bg='grey' w={`${200*(1 - getPercent)}px`}/>
            </Flex>
            </>
        )
    }

    return (
        <>
        <Stack alignSelf='end'>
        {Array(5).fill('').map((_, i) => {
            return distribution.get(5 - i) ? <><Text>{5 - i}</Text> <Flex gap={2}>{returnBar(distribution.get(5-i))} <Text> {distribution.get(5-i)} </Text></Flex></> : <><Text>{5-i}</Text><Box h='10px' bg='grey' w='200px'/></>
          })}
          </Stack>
          </>
    )
}

export default Distribution;