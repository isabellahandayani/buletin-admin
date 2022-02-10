import { Box, Heading, Image, Center, Flex, Text } from "@chakra-ui/react";
import { VideoProps } from "../../types";
import { Link } from "react-router-dom";

const VideoCard: React.FC<VideoProps> = (props) => {
  return (
    <Link to={`/video/${props.video_id}`}>
      <Box mb={5} bg="white" borderRadius="md" boxShadow="lg">
        <Flex>
          <Image
            borderTopLeftRadius="md"
            borderBottomLeftRadius="md"
            maxW="200px"
            src={props.video_thumbnail}
            alt={props.video_title}
            objectFit="cover"
            fallbackSrc="https://via.placeholder.com/150"
          />
          <Center>
            <Box ml="23" maxW={200} maxH={200}>
              <Heading as="h2" size="md">
                {props.video_title}
              </Heading>
              <Text fontSize="sm">{props.channel_name}</Text>
              <Text fontSize="sm">{props.video_view_count} Views</Text>
            </Box>
          </Center>
        </Flex>
      </Box>
    </Link>
  );
};

export default VideoCard;
