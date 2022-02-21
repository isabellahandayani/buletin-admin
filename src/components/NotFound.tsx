import { Center, Heading, Text, Flex } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Center mt={300}>
      <Flex flexDirection="column">
        <Center>
          <Heading size="4xl">404</Heading>
        </Center>
        <Text size="lg">Page Not Found</Text>
      </Flex>
    </Center>
  );
};

export default NotFound;
