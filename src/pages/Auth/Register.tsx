import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Stack,
  useToast,
  Center,
  InputGroup,
  InputRightElement,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import { generatePass } from "../../utils";
import { register } from "../../service/UserServices";

const Register = () => {
  const [email, setEmail] = useState("");
  const [pass] = useState(generatePass());
  const [name, setName] = useState("");
  const [uname, setUname] = useState("");
  const [number, setNumber] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleEmail = (newEmail: any) => {
    setEmail(newEmail);

    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;

    if (regex.test(email)) {
      setEmailError(false);
    } else setEmailError(true);
  };

  const handleSubmit = async () => {
    setSubmit(true);
    let { data } = await register(email, pass, uname, name, number);

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
    setSubmit(false);
  };

  useEffect(() => {
    document.title = "Buletin.id | Register";
    setLoading(false);
  }, [loading]);

  return !loading ? (
    <Flex minH={"90vh"} align={"center"} justify={"center"}>
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
        <FormControl id="userName">
          <FormLabel>Username</FormLabel>
          <Input
            placeholder="Username"
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={uname}
            onChange={(e) => setUname(e.target.value)}
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            value={email}
            onChange={(e) => handleEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="name">
          <FormLabel>Full Name</FormLabel>
          <Input
            placeholder="your-name"
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl id="number">
          <FormLabel>Phone Number</FormLabel>
          <Input
            placeholder="081234567890"
            _placeholder={{ color: "gray.500" }}
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              placeholder="********"
              _placeholder={{ color: "gray.500" }}
              type={show ? "text" : "password"}
              value={pass}
              isDisabled
            />
            <InputRightElement>
              <Tooltip label="Show Password" size="md">
                <IconButton
                  size="md"
                  aria-label="show-password"
                  icon={show ? <BiHide /> : <BiShow />}
                  onClick={() => setShow(!show)}
                  style={{ textDecoration: "None" }}
                />
              </Tooltip>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Stack>
          <Button
            loadingText="Submitting"
            isLoading={submit}
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            isDisabled={
              !email || !pass || !name || !uname || !number || emailError
            }
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  ) : (
    <Center mt={300}>
      <Spinner size="xl" />
    </Center>
  );
};

export default Register;
