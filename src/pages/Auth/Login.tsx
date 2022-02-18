import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { login } from "../../service/UserServices"
import bcrypt from 'bcryptjs'

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [hashed, setHashed] = useState("");
  const toast = useToast()
  
  const handlePass = (pwd: any, hashedPas: any) => {
    setPass(pwd)
    setHashed(hashedPas)
  }

  const handleSubmit = async () => {
    let { data } = await login(email, hashed)

    if (data) {
      localStorage.setItem("token", data.token)
      toast({
        title: 'Login Succesful',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top'
      })

      window.location.reload()
    } else {
      toast({
        title: 'Login Failed',
        description: "Account is not recognized",
        status: 'warning',
        duration: 9000,
        isClosable: true,
        position: 'top'

      })
    }
  }

  return (
    <Stack
      spacing={8}
      mx={"auto"}
      py={12}
      px={6}
      maxW="30vw"
      mt={window.innerHeight / 8}
    >
      <Stack align={"center"}>
        <Heading fontSize={"4xl"}>Buletin.id</Heading>
      </Stack>
      <Box rounded={"lg"} bg="white" boxShadow={"lg"} p={8}>
        <Stack spacing={4} bg="white">
          <FormControl bg="white">
            <FormLabel bg="white">Email address</FormLabel>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </FormControl>
          <FormControl bg="white">
            <FormLabel bg="white">Password</FormLabel>
            <Input
              value={pass}
              onChange={(e) => handlePass(e.target.value, bcrypt.hashSync(e.target.value, '$2a$10$CwTycUXWue0Thq9StjUM0u'))}
              type="password"
            />
          </FormControl>
          <Stack spacing={10}>
            <Button
              isDisabled={email && pass ? false : true}
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={handleSubmit}
            >
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Login;
