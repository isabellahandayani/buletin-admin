import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useToast,
  Link,
  Image,
  Flex,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { login } from "../../service/UserServices";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import LoginImage from "../../assets/login_image.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const toast = useToast();

  const handleSubmit = async () => {
    const getToast = () => {
      toast({
        title: "Login Failed",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    };


        try {
          let { data } = await login(email, pass);
          localStorage.setItem("token", data.token);
          navigate("/");
          window.location.reload();
        } catch (e) {
          getToast();
        }
  };

  return (
    <Stack minH="100vh" direction="row" borderRadius={20}>
      <Flex flex={2} bg="blue.400">
        <Image
          mx="auto"
          alt={"Login Image"}
          maxW="70%"
          objectFit={"scale-down"}
          src={LoginImage}
        />
      </Flex>
      <Flex p={10} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Center>
            <Heading fontSize={"2xl"}>Buletin Admin</Heading>
          </Center>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
          </FormControl>
          <Stack spacing={6}>
            <Link color={"blue.500"}>Forgot password?</Link>
            <Button
              colorScheme={"blue"}
              variant={"solid"}
              onClick={handleSubmit}
              isDisabled={!email || !pass}
            >
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default Login;
