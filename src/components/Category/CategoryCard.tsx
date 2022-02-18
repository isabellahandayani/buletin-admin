import { Heading, Box, Center, Image } from "@chakra-ui/react";

const CategoryCard = () => {
  return (
    <Box
      maxW={300}
      w={"full"}
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "lg",
      }}
      bg="white"
      boxShadow={"2xl"}
      rounded={"md"}
      cursor="pointer"
    >
      <Image
        h={"120px"}
        w={"full"}
        fallbackSrc="https://cdn.dribbble.com/users/17914/screenshots/4902225/video-placeholder.png"
        objectFit={"cover"}
      />

      <Center p={30}>
        <Heading fontSize={"2xl"} as="h2">
          Entertainment
        </Heading>
      </Center>
    </Box>
  );
};

export default CategoryCard;
