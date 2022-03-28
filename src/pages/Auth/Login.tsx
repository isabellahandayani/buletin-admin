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
  useColorModeValue,
  Image,
  InputGroup,
  IconButton,
  InputRightElement,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../service/UserServices";
import LOGIN_IMAGE from "../../assets/login_image.svg";
import { BiHide, BiShow } from "react-icons/bi";

const Login = () => {
  const [submit, setSubmit] = useState(false);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const toast = useToast();

  const handleSubmit = async () => {
    setSubmit(true);

    const getToast = () => {
      toast({
        title: "Login Failed",
        description: "Email or Password is incorrect",
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
    setSubmit(false);
  };

  useEffect(() => {
    document.title = "Buletin.id | Sign In";
  }, []);

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
        <Flex
          display={{ md: "flex", base: "none" }}
          align={"center"}
          justify={"center"}
          flex={3}
          bg="blue.200"
          roundedLeft="md"
        >
          <Image src={LOGIN_IMAGE} p={5} h="80vh" />
        </Flex>

        <Stack p={{ md: 20, base: 5 }} mx="auto" justify={"center"} spacing={6}>
          <Center>
            <Heading fontSize={"2xl"}>Buletin Admin</Heading>
          </Center>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="your-email@example.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
                onChange={(e) => setPass(e.target.value)}
              />
              <InputRightElement>
                <IconButton
                  size="md"
                  aria-label="show-password"
                  icon={show ? <BiHide /> : <BiShow />}
                  onClick={() => setShow(!show)}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={2}>
            <Link color={"blue.500"} onClick={() => navigate("/forgot")}>
              Forgot password?
            </Link>
            <Button
              isLoading={submit}
              loadingText="Signing In"
              w="full"
              bg={"blue.400"}
              variant={"solid"}
              _hover={{
                bg: "blue.500",
              }}
              color="white"
              minH="40px"
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
