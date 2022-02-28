import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../service/UserServices";
import bcrypt from "bcryptjs";

export default function UserProfileEdit() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [uname, setUname] = useState("");
  const [number, setNumber] = useState("");
  const [hashed, setHashed] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handlePass = (pwd: any, hashedPass: any) => {
    if (pwd.length < 8) {
      setPassError(true);
    } else setPassError(false);

    setHashed(hashedPass);
    setPass(pwd);
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
    let { data } = await register(email, hashed, uname, name, number);

    if (data) {
      toast({
        title: "Registration Succesful",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      navigate("../");
    } else {
      toast({
        title: "Registration Failed",
        status: "warning",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack
        bg="white"
        spacing={4}
        w={"full"}
        maxW={"md"}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          Register Admin
        </Heading>
        <FormControl id="userName" isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            placeholder="Username"
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={uname}
            onChange={(e) => setUname(e.target.value)}
          />
        </FormControl>
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
        <FormControl id="name" isRequired>
          <FormLabel>Full Name</FormLabel>
          <Input
            placeholder="your-name"
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl id="number" isRequired>
          <FormLabel>Phone Number</FormLabel>
          <Input
            placeholder="081234567890"
            _placeholder={{ color: "gray.500" }}
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired isInvalid={passError}>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="********"
            _placeholder={{ color: "gray.500" }}
            type="password"
            value={pass}
            onChange={(e) =>
              handlePass(
                e.target.value,
                bcrypt.hashSync(e.target.value, "$2a$10$CwTycUXWue0Thq9StjUM0u")
              )
            }
          />
          {!passError ? null : (
            <FormErrorMessage>Password must be at least 8 characters</FormErrorMessage>
          )}
        </FormControl>
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"red.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "red.500",
            }}
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            isDisabled={
              email &&
              pass &&
              name &&
              uname &&
              number &&
              !emailError &&
              !passError
                ? false
                : true
            }
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
