import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { login } from "../../service/UserServices";
import bcrypt from "bcryptjs";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [hashed, setHashed] = useState("");
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();

  const toast = useToast();

  const handlePass = (pwd: any, hashedPas: any) => {
    setPass(pwd);
    setHashed(hashedPas);
  };

  const handleEmail = (newEmail: any) => {
    setEmail(newEmail);

    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regex.test(email)) {
      setEmailError(false);
    } else setEmailError(true);
  };

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
      let { data } = await login(email, hashed);

      let decoded: any = jwt_decode(data.token);
      if (decoded.role === "superadmin" || decoded.role === "admin") {
        localStorage.setItem("token", data.token);
        navigate("/")
        window.location.reload();
      } else {
        getToast();
      }
    } catch (e) {
      console.log(e);
      getToast();
    }
  };

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
          <FormControl id="email" isRequired isInvalid={emailError}>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
              value={email}
              onChange={(e) => handleEmail(e.target.value)}
            />
            {!emailError ? null : (
              <FormErrorMessage>Invalid Email</FormErrorMessage>
            )}
          </FormControl>
          <FormControl bg="white">
            <FormLabel bg="white">Password</FormLabel>
            <Input
              placeholder="*******"
              value={pass}
              onChange={(e) =>
                handlePass(
                  e.target.value,
                  bcrypt.hashSync(
                    e.target.value,
                    "$2a$10$CwTycUXWue0Thq9StjUM0u"
                  )
                )
              }
              type="password"
            />
          </FormControl>
          <Stack spacing={10}>
            <Button
              isDisabled={email && pass && !emailError ? false : true}
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
