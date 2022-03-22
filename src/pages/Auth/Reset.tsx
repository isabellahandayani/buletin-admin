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
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useSearchParams, useNavigate } from "react-router-dom";
import { reset, validate } from "../../service/UserServices";

const Reset = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState<any>();
  const [pass, setPass] = useState<any>();
  const [confirmPass, setConfirm] = useState<any>();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async () => {
    let { data } = await reset(searchParams.get("token"), pass, email);
    console.log(data);
    if (data) {
      toast({
        title: "Success",
        description: "Password Reset Successful",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      navigate("/login");
    } else {
      toast({
        title: "Error",
        description: "Password Reset Failed",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    const check = async () => {
      let { data } = await validate(searchParams.get("token"));
      if (data) {
        setEmail(data.email);
      } else {
        navigate("../");
      }
    };
    check();
  }, [navigate, searchParams]);

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
          spacing={5}
        >
          <Center>
            <Heading fontSize={"2xl"}>Reset Password</Heading>
          </Center>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" onChange={(e) => setPass(e.target.value)} />
          </FormControl>
          <FormControl id="confirm-password">
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              onChange={(e) => setConfirm(e.target.value)}
            />
          </FormControl>
          <Button
            w="full"
            color="white"
            bg={"blue.400"}
            variant={"solid"}
            _hover={{
              bg: "blue.500",
            }}
            h={{ md: "6vh", base: "8vh" }}
            isDisabled={!pass || !confirmPass || pass !== confirmPass}
            onClick={handleSubmit}
          >
            Reset Password
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Reset;
