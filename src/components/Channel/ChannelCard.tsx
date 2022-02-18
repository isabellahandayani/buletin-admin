import { Heading, Box, Image, Text, Flex } from "@chakra-ui/react";
import moment from "moment";

const ChannelCard = (props: any) => {
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
        src={props.channel_picture}
        fallbackSrc="https://cdn.dribbble.com/users/17914/screenshots/4902225/video-placeholder.png"
        objectFit={"cover"}
      />

      <Flex flexDirection="column" p={30}>
        <Heading fontSize={"2xl"} as="h2">
          {props.channel_name}
        </Heading>
        <Text>{moment(props.created_at).format("D MMM YYYY")}</Text>
      </Flex>
    </Box>
  );
};

export default ChannelCard;
