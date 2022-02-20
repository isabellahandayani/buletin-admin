import { Heading, Box, Image, Tag, Flex, Spacer } from "@chakra-ui/react";
import PlaylistMenu from "./PlaylistMenu";

const PlaylistCard = (props: any) => {
  return (
    <Box
      maxW={300}
      w={"full"}
      _hover={{
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
      <Flex flexDirection="row">
        <Flex flexDirection="column" p={30} h="100%">
          <Heading fontSize={"2xl"} as="h2">
            {props.playlist_name}
          </Heading>
          <Tag mt={15} colorScheme="whatsapp" size="md" w={150}>
            {props.category_id}
          </Tag>
        </Flex>

        <Spacer />
        <PlaylistMenu {...props} />
      </Flex>
    </Box>
  );
};

export default PlaylistCard;
