import { Box, Heading, Image, Center, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const VideoCard = (props: any) => {
  return (
    <Link to={`/video/${props.video_id}`}>
      <Box
        mb={5}
        bg="white"
        rounded="md"
        boxShadow="md"
        _hover={{
          boxShadow: "lg",
        }}
      >
        <Flex>
          <Image
            borderTopLeftRadius="md"
            borderBottomLeftRadius="md"
            p="relative"
            maxW="40%"
            src={props.video_thumbnail}
            alt={props.video_title}
            objectFit="cover"
            fallbackSrc="https://cdn.dribbble.com/users/17914/screenshots/4902225/video-placeholder.png"
          />
          <Center>
            <Box ml={4} maxW={280} maxH={200}>
              <Heading as="h2" size="md">
                {props.video_title}
              </Heading>
              <Text fontSize="md">{props.channel_name}</Text>
              <Text fontSize="md">{props.video_view_count} Views</Text>
            </Box>
          </Center>
        </Flex>
      </Box>
    </Link>
  );
};

export default VideoCard;
