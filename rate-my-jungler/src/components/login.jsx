import {useState} from 'react'
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Stack,
    Input,
    Text,
    useDisclosure
  } from '@chakra-ui/react'
import {instance} from '../utils'

  const LoginButton = (setToken) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = async () => {
        const loginInfo = {email: email, password: password}
        await instance.post('user/login', loginInfo)
        .then((res) => {console.log(res)})
        .catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            <Button onClick={onOpen}>
                Log In To Leave a Review
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Login</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack>
                            <Input onChange={e=>setEmail(e.target.value)} placeholder='email'/>
                            <Input onChange={e=>setPassword(e.target.value)} placeholder='password'/>
                            <Button onClick={login}>Login</Button>
                            <Text>Not Registered?</Text>
                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
  }

export default LoginButton;