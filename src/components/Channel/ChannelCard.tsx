import {
  Heading,
  Box,
  Image,
  Text,
  Flex,
  Spacer,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import moment from "moment";

import { HiDotsVertical } from "react-icons/hi";

const ChannelCard = (props: any) => {
  return (
    <Box
      maxW={300}
      w={"full"}
      _hover={{
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

      <Flex flexDirection="row">
        <Flex flexDirection="column" p={30} h="100%">
          <Heading fontSize={"2xl"} as="h2">
            {props.channel_name}
          </Heading>
          <Text>Since {moment(props.created_at).format("D MMM YYYY")}</Text>
        </Flex>

        <Spacer />
        <Box mt={25}>
          <Menu direction="rtl">
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HiDotsVertical />}
              variant="link"
              _focus={{ boxShadow: "none" }}
            />
            <MenuList>
              <MenuItem>Edit Channel</MenuItem>
              <MenuItem>Delete Channel</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default ChannelCard;
