import {React, useState} from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Textarea,
  } from '@chakra-ui/react'
import {StarRater} from './StarRater'
import {instance} from '../../utils';

const ReviewModal = ({accountId, getRatings}) => {
    const { isOpen, onOpen, onClose} = useDisclosure()
    const [review, setReview] = useState('');
    const [starred, setStarred] = useState(true);
    const [rating, setRating] = useState(0)

    let reviewHandleChange = (e) => {
        let inputValue = e.target.value
        setReview(inputValue)
      }

    const postReview = async () => {
        try {
            await instance.post('ratings',
            {
                accountId: accountId,
                stars: rating,
                message: review
            })
        }
        catch(err) {
            console.log(err)
        }
        setStarred(true);
        setRating(0);
        setReview('');
        getRatings();
        onClose();
    }

    const closeReview = () => {
        setStarred(true);
        setRating(0);
        setReview('');
        onClose();
    }

    return (
        <>
        <Button onClick={onOpen}>Rate This Player</Button>
        <Modal isOpen={isOpen} onClose={closeReview}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Leave a Review</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <StarRater setStarred={setStarred} setRating={setRating} />
                <Textarea 
                    value={review} 
                    onChange={reviewHandleChange} 
                    />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => postReview()} isDisabled={starred} colorScheme='blue' mr={3}>
                        Post
                    </Button>
                </ModalFooter>
            </ModalContent>

        </Modal>
        </>

    )
}

ReviewModal.propTypes = {
    accountId: PropTypes.string,
    getRatings: PropTypes.func
};

export {ReviewModal};