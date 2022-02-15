import {
  Box,
  Flex,
  Avatar,
  Heading,
  Text,
  Image,
  Center,
  Icon,
} from "@chakra-ui/react";

import { BsShare } from "react-icons/bs";
import { VideoProps } from "../../types";

const VideoCardLarge = () => {
  return (
    <Flex direction="column" maxW="500px" mr={10}>
      <Image
        borderRadius="xl"
        src="https://bit.ly/naruto-sage"
        alt="naruto"
        objectFit="cover"
        mb={5}
      />
      <Flex>
        <Avatar size="lg" src="https://bit.ly/sage-adebayo" />
        <Center>
          <Box ml="3">
            <Heading as="h3" fontSize="2xl">
              {/* {props.video_title} */}AAAAA
            </Heading>
            <Text fontSize="sm">AAA</Text>
          </Box>
          <Icon ml={2} as={BsShare}  />
        </Center>
      </Flex>
    </Flex>
  );
};

export default VideoCardLarge;
