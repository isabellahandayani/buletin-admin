import {
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
  Image,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { forget } from "../../service/UserServices";
import LOGIN_IMAGE from "../../assets/login_image.svg";

const Forget = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [timer, setTimer] = useState<any>(null);
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
    setTimer(60);
    let { data } = await forget(email);

    if (data) {
      toast({
        title: "Success",
        status: "success",
        duration: 9000,
        description: "Password reset link sent to your email",
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        title: "Error",
        description: "Email not found",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    document.title = "Buletin.id | Forget Password";

    if (timer) {
      if (timer === 0) {
        setTimer(null);
        return;
      }

      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

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
        <Stack
          p={{ md: 20, base: 10 }}
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
              placeholder="your-email@example.com"
              type="email"
              onChange={(e) => handleEmail(e.target.value)}
              value={email}
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
            minH={"40px"}
            h="6vh"
            onClick={handleSubmit}
            loadingText={`Resend in ${timer} seconds`}
            isLoading={timer ? true : false}
            isDisabled={!email || emailError}
          >
            Forget Password
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Forget;
