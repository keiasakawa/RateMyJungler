import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button} from '@chakra-ui/react'
import {AiFillStar, AiOutlineStar} from 'react-icons/ai'
import {IconContext} from 'react-icons'

const StarRater = (setStarred: Function, setRating : Function) => {
    const starsList = []
    for (let i = 1; i < 6; i++){
        starsList.push({selected: false, enabled: false, level: i})
    }
    const [stars, setStars] = useState(starsList)

    const highlightStars = (numStars, highlight) => {
        let newStarsList = [...stars]
        if (highlight){
            for (let i = 0; i < numStars; i++){
                newStarsList[i].enabled = true;
            }
        }
        else {
            for (let i = 0; i < numStars; i++){
                newStarsList[i].enabled = false;
            }
        }
        setStars(newStarsList)
    }

    const selectStars = (numStars) => {
        let newStarsList = [...stars]
        for (let i = 0; i < 5; i++){
            if (i < numStars) {
                newStarsList[i].selected = true
            }
            else {
                newStarsList[i].selected = false
            }
        }
        setRating(numStars)
        setStars(newStarsList)
        setStarred(false)
    }

    return (
        (
            stars.map(star => {
                return(
                    <Button key={star.level} onClick={() => selectStars(star.level)} variant='ghost' onMouseOver={() => highlightStars(star.level, true)} onMouseLeave={() => highlightStars(star.level, false)}>
                        {star.enabled || star.selected ? <IconContext.Provider value={{ color: "#FFD700"}}><AiFillStar/></IconContext.Provider> : <AiOutlineStar/>}
                    </Button>
                )
            }))
        
    )
}

StarRater.propTypes = {
    setStarred: PropTypes.func,
    setRating: PropTypes.func
};

export { StarRater };