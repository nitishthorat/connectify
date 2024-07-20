import { FormControl, VStack, FormLabel, Input, InputGroup, InputRightElement, Button, useToast } from '@chakra-ui/react'
import {React, useState} from 'react'
import axios from 'axios';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // const [pic, setPic] = useState();
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const toast = useToast()

    // const postDetails = (pics) => {}
    const submitHandler = async() => {
        setLoading(true);

        if(!name || !email || !password || !confirmPassword) {
            toast({
                title: 'Please Fill All The Fields',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom"
              });

            setLoading(false);
            return;
        }

        if(password !== confirmPassword) {
            toast({
                title: 'Passwords Do Not Match',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
            setLoading(false)
            return;
        }

        try {
            const {data} = await axios.post("/api/user", {name, email, password})

            toast ({
                title: 'Registration Successful',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })

            resetSignUpForm();
            setLoading(false)
        } catch(error) {
            toast ({
                title: 'Registration Failed',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })

            setLoading(false)
        }
    }

    const resetSignUpForm = () => {
        setName('');
        setEmail('');
        setConfirmPassword('')
        setPassword('');
    }

  return (
    <VStack spacing='5px'>
        <FormControl id="first-name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
                placeholder="Enter Your Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
        </FormControl>
        <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
        </FormControl>
        <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id="confirm-password" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Enter password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        {/* <FormControl id="pic">
            <FormLabel>Upload your Picture</FormLabel>
            <Input
                type="file"
                p={1.5}
                accept="image/*"
                onChange={(e) => postDetails(e.target.files[0])}
            />
        </FormControl> */}

        <Button
            colorScheme="green"
            width="100%"
            style={{marginTop: 15}}
            onClick={submitHandler}
            color="white"
            isLoading={loading}
        >
            Sign Up
        </Button>
    </VStack>
  )
}

export default Signup