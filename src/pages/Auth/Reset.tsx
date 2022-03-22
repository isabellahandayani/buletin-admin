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

const Reset = () => {
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
            <Input type="password" />
          </FormControl>
          <FormControl id="confirm-password">
            <FormLabel>Confirm Password</FormLabel>
            <Input type="password" />
          </FormControl>
          <Button
            w="full"
            color="white"
            bg={"blue.400"}
            variant={"solid"}
            _hover={{
              bg: "blue.500",
            }}
            h={{md: "6vh", base: "8vh"}}
          >
            Reset Password
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Reset;
