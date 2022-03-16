import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useToast,
  Link,
  Flex,
  Center,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../service/UserServices";

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
    <Flex
      minH="100vh"
      direction="row"
      borderRadius={20}
      bg={useColorModeValue("gray.100", "gray.900")}
      align="center"
      justify="center"
    >
      <Flex
        bg="white"
        w={"full"}
        maxW={{ lg: "70%", base: "100%" }}
        rounded={"xl"}
        boxShadow={"lg"}
        direction="row"
        h={{ md: "80vh", base: "60vh" }}
      >
        <Box
          flex={3}
          bg="blue.200"
          roundedLeft="md"
          display={{ md: "block", base: "none" }}
        />
        <Stack
          p={{ md: 20, base: 5 }}
          mx="auto"
          justify={"center"}
          spacing={10}
        >
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
          <Stack spacing={2}>
            <Link color={"blue.500"} onClick={() => navigate("/forgot")}>
              Forgot password?
            </Link>
            <Button
              w="full"
              bg={"blue.400"}
              variant={"solid"}
              _hover={{
                bg: "blue.500",
              }}
              color="white"
              onClick={handleSubmit}
              isDisabled={!email || !pass}
            >
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Login;
