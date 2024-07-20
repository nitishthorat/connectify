import {React, useState} from 'react'
import { VStack , FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, useToast} from '@chakra-ui/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const toast = useToast();
    const history = useHistory();

    const submitHandler = async () => {
        setLoading(true);

        if(!email || !password) {
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

        try{
            const {data} = await axios.post("/api/user/login", {email, password});

            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                postion: "bottom"
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            // history.push("/chats")
        } catch (error) {
            if(error.response.status === 401) {
                toast({
                    title:"Incorrect Credentials",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom"
                })
            } else {
                toast({
                    title:"Error Occured!",
                    description: error.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom"
                })
            }

            setLoading(false)
        }
    }

  return (
    <VStack spacing='5px'>
        <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
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
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <Button
            colorScheme="green"
            width="100%"
            style={{marginTop: 15}}
            onClick={submitHandler}
            color="white"
            isLoading={loading}
        >
            Login
        </Button>
        <Button
            colorScheme="red"
            width="100%"
            onClick={submitHandler}
            color="white"
        >
            Get Guest User Credentials
        </Button>
    </VStack>
  )
}

export default Login