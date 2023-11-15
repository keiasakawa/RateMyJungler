// APPLY SORTING
// HIGHEST RATING
// LOWEST RATING
// OLDEST RATING
// MOST RECENT

import React from 'react'
import {Select} from '@chakra-ui/react'

const SortingDropdown = (updateRatings : Function, setSort: Function) => {
    return (
        <Select defaultValue={'recent'} id='sortDropdown' maxW={300} onChange={e => {updateRatings(e.target.value); setSort(e.target.value)}}>
            <option value='recent'>Most Recent</option>
            <option value='oldest'>Oldest Ratings</option>
            <option value='highest'>Highest Ratings</option>
            <option value='lowest'>Lowest Ratings</option>
        </Select>
    )
}

export default SortingDropdown;