import {
  Box,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Button,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { forget } from "../../service/UserServices";

const Forget = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const toast = useToast();

  const handleEmail = (newEmail: any) => {
    setEmail(newEmail);

    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regex.test(email)) {
      setEmailError(false);
    } else setEmailError(true);
  };

  const handleSubmit = async () => {
    let { data } = await forget(email);

    if (data) {
      toast({
        title: "Password reset link sent to your email",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        title: "Email not found",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    document.title = "Buletin.id | Forget Password"
  }, [])
  

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <Flex
        bg="white"
        w={"full"}
        maxW={{ lg: "70%", base: "100%" }}
        rounded={"xl"}
        boxShadow={"lg"}
        direction="row"
        h="80vh"
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
          align={"center"}
          justify={"center"}
          spacing={10}
        >
          <Center>
            <Heading fontSize={"2xl"}>Forget Password</Heading>
          </Center>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              onChange={(e) => handleEmail(e.target.value)}
              value={email}
            />
            {emailError && <FormErrorMessage>Invalid Email</FormErrorMessage>}
          </FormControl>
          <Button
            w="full"
            color="white"
            bg={"blue.400"}
            variant={"solid"}
            _hover={{
              bg: "blue.500",
            }}
            minH={"40px"}
            h="6vh"
            onClick={handleSubmit}
            isDisabled={!email}
          >
            Forget Password
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Forget;
