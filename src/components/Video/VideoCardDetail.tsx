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
  Tooltip,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { DRIVE_URL, FALLBACK_IMG } from "../../const";
import { ellipsis } from "../../utils";

const VideoCardDetail = (props: any) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
  }, [loading]);

  const handleClick = () => {
    setLoading(true);
    navigate(`/video/${props.video_id}`);
    if (props.handleChange) {
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
        minH={150}
      >
        <Flex justify="space-between">
          <Image
            borderTopLeftRadius="md"
            borderBottomLeftRadius="md"
            maxW="40%"
            src={`${DRIVE_URL}${props.video_thumbnail}`}
            alt={props.video_title}
            objectFit="cover"
            fallbackSrc={FALLBACK_IMG}
          />

          <Center ml={4} minH={150} w="full" flexGrow={2}>
            <Flex flexDirection="row" align="center" flexGrow={2}>
              <Stack spacing={4} flexGrow={2}>
                <Heading as="h2" size="md">
                  {ellipsis(props.video_title, 40)}
                </Heading>
                <Text fontSize="md">{ellipsis(props.channel_info.channel_name, 30)}</Text>
              </Stack>
              {props.type === "detail" && (
                <Box m={10}>
                  <Tooltip label="Remove Video" size="md">
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
                  </Tooltip>
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
