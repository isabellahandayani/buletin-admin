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
} from "@chakra-ui/react";

const Forget = () => {
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
          align={"center"}
          justify={"center"}
          spacing={10}
        >
          <Center>
            <Heading fontSize={"2xl"}>Forget Password</Heading>
          </Center>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input type="email" />
          </FormControl>
          <Button
            w="full"
            color="white"
            bg={"blue.400"}
            variant={"solid"}
            _hover={{
              bg: "blue.500",
            }}
            h="6vh"
          >
            Forget Password
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Forget;
