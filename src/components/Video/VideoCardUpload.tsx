import {
  Box,
  Heading,
  Image,
  Center,
  Flex,
  Text,
  Skeleton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FALLBACK_IMG } from "../../const";

const VideoCardUpload = (props: any) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Skeleton isLoaded={!loading}>
      <Box
        mb={5}
        bg="white"
        rounded="md"
        boxShadow={props.selected === props.video_id ? "outline" : "md"}
        cursor="pointer"
        onClick={() => props.setSelected(props.video_id)}
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
            fallbackSrc={FALLBACK_IMG}
          />
          <Center>
            <Box ml={4} maxW={240} maxH={200}>
              <Heading as="h2" size="md">
                {props.video_title}
              </Heading>
              <Text fontSize="md">{props.channel_info.channel_name}</Text>
            </Box>
          </Center>
        </Flex>
      </Box>
    </Skeleton>
  );
};

export default VideoCardUpload;
