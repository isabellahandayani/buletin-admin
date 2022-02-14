import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
      <Stack spacing={8} mx={"auto"} py={12} px={6} maxW="30vw" mt={window.innerHeight/8}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Buletin.id</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                value={pass}
                onChange={(e) => setPass(e.target.value)}
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
