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
import { useNavigate } from "react-router-dom";
import { FALLBACK_IMG } from "../../const";

const VideoCardDetail = (props: any) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
  }, [loading]);

  const handleClick = () => {
    setLoading(true);
    navigate(`/video/${props.video_id}`);
    if(props.handleChange) {
      props.handleChange();
    }
  };

  return (
    <Skeleton isLoaded={!loading} fadeDuration={2}>
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
        <Flex justify="space-between">
          <Image
            borderTopLeftRadius="md"
            borderBottomLeftRadius="md"
            maxW="40%"
            src={props.video_thumbnail}
            alt={props.video_title}
            objectFit="cover"
            fallbackSrc={FALLBACK_IMG}
          />

          <Center ml={4} maxH={200} w="full" flexGrow={2}>
            <Flex flexDirection="row" align="center" flexGrow={2}>
              <Stack spacing={4} flexGrow={2}>
                <Heading as="h2" size="md">
                  {props.video_title}
                </Heading>
                <Text fontSize="md">{props.channel_info.channel_name}</Text>
              </Stack>
              {props.type === "detail" && (
                <Box m={10}>
                  <IconButton
                    variant="solid"
                    aria-label="Md"
                    bg={"red.400"}
                    icon={<MdDelete />}
                    size="sm"
                    color="white"
                    _hover={{
                      bg: "red.500",
                    }}
                    onClick={(e) => props.handleDelete(e, props.video_id)}
                  />
                </Box>
              )}
            </Flex>
          </Center>
        </Flex>
      </Box>
    </Skeleton>
  );
};

export default VideoCardDetail;
