import React, {useEffect, useState} from 'react';
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

    const returnBar = (numRatings) => {
        const getPercent = numRatings / ratings.length
        return (
            <>
            <Flex>
            <Box bg='tomato' h='10px' w={`${200*getPercent}px`}/><Box h='10px' bg='grey' w={`${200*(1 - getPercent)}px`}/>
            </Flex>
            </>
        )
    }

    // useEffect(() => {
    //     let newMap = new Map()
    //     ratings.forEach((element) => {
    //         if (newMap.has(element.stars)) {
    //             newMap.set(element.stars, newMap.get(element.stars) + 1)
    //         }
    //         else {
    //             newMap.set(element.stars, 1)
    //         }
    //     })
    //     setDistribution(newMap)
    // }, [ratings]) 

    return (
        <>
        <Stack>
        {Array(5).fill('').map((_, i) => {
            return distribution.get(5 - i) ? <><Text>{5 - i}</Text> {returnBar(distribution.get(5-i))}</> : <><Text>{i}</Text><Box h='10px' bg='grey' w='50px'/></>
          })}
          </Stack>
          </>
    )
}

export default Distribution;