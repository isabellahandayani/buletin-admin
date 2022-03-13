import {
  Box,
  Heading,
  Image,
  Center,
  Flex,
  Text,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const VideoCardDetail = (props: any) => {
  return (
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
          <Center ml={4} maxW="100%" maxH={200}>
            <Flex direction="row">
              <Stack spacing={4} w="100%">
                <Heading as="h2" size="md">
                  {props.video_title}
                </Heading>
                <Text fontSize="md">{props.channel_info.channel_name}</Text>
              </Stack>
              {props.type === "detail" ? (
                <IconButton
                  variant="solid"
                  aria-label="Md"
                  bg={"red.500"}
                  icon={<MdDelete />}
                  m={10}
                  size="sm"
                  color="white"
                />
              ) : null}
            </Flex>
          </Center>
        </Flex>
      </Box>
    </Link>
  );
};

export default VideoCardDetail;
