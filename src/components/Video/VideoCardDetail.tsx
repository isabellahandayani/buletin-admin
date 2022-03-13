import {
  Box,
  Heading,
  Image,
  Center,
  Flex,
  Text,
  Stack,
  IconButton,
  Skeleton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { FALLBACK_IMG } from "../../const";

const VideoCardDetail = (props: any) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [loading]);

  const handleClick = () => {
    setLoading(true);
    props.handleChange();
  }

  return (
    <Skeleton isLoaded={!loading}>
      <Link to={`/video/${props.video_id}`}>
        <Box
          mb={5}
          bg="white"
          rounded="md"
          boxShadow="md"
          _hover={{
            cursor: "pointer",
            boxShadow: "lg",
          }}
          onClick={handleClick}
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
            <Center ml={4} maxW="100%" maxH={200}>
              <Flex direction="row">
                <Stack spacing={4} w="100%">
                  <Heading as="h2" size="md">
                    {props.video_title}
                  </Heading>
                  <Text fontSize="md">{props.channel_info.channel_name}</Text>
                </Stack>
                {props.type === "detail" && (
                  <IconButton
                    variant="solid"
                    aria-label="Md"
                    bg={"red.500"}
                    icon={<MdDelete />}
                    m={10}
                    size="sm"
                    color="white"
                  />
                )}
              </Flex>
            </Center>
          </Flex>
        </Box>
      </Link>
    </Skeleton>
  );
};

export default VideoCardDetail;
