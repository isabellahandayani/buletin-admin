import {
  Box,
  Heading,
  Image,
  Flex,
  Text,
  Skeleton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { DRIVE_URL, FALLBACK_IMG } from "../../const";
import { ellipsis } from "../../utils";

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
        maxH={100}
      >
        <Flex>
          <Image
            borderTopLeftRadius="md"
            borderBottomLeftRadius="md"
            p="relative"
            maxW="40%"
            src={`${DRIVE_URL}${props.video_thumbnail}`}
            alt={props.video_title}
            objectFit="cover"
            fallbackSrc={FALLBACK_IMG}
            maxH={100}
            w="full"
          />
            <Flex ml={4} maxH={100} align="baseline" justify="center" direction="column">
              <Heading as="h2" size="md">
                {ellipsis(props.video_title, 40)}
              </Heading>
              <Text fontSize="md">{ellipsis(props.channel_info.channel_name, 30)}</Text>
            </Flex>
        </Flex>
      </Box>
    </Skeleton>
  );
};

export default VideoCardUpload;
