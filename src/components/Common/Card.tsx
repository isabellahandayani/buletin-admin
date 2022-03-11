import {
  Heading,
  Box,
  Image,
  Text,
  Flex,
  Spacer,
  Skeleton,
} from "@chakra-ui/react";
import moment from "moment";
import { Link } from "react-router-dom";
import Menu from "./Menu";

const Card = (props: any) => {
  return (
    <Skeleton isLoaded={props}>
      <Box
        maxW={300}
        w={"full"}
        _hover={{
          boxShadow: "lg",
        }}
        bg="white"
        boxShadow={"2xl"}
        rounded={"md"}
      >
        <Link to={`/channel/${props.channel_id}`}>
          <Image
            h={"120px"}
            w={"full"}
            src={props.channel_picture}
            fallbackSrc="https://cdn.dribbble.com/users/17914/screenshots/4902225/video-placeholder.png"
            objectFit={"cover"}
            cursor="pointer"
          />
        </Link>

        <Flex flexDirection="row">
          <Flex flexDirection="column" p={30} h="100%">
            <Heading fontSize={"2xl"} as="h2">
              {props.channel_name}
            </Heading>
            <Text>Since {moment(props.created_at).format("D MMM YYYY")}</Text>
          </Flex>

          <Spacer />
          <Menu
            type={props.type}
            {...props.menuControl}
            channel_id={props.channel_id}
            form={props.form}
            handleUpdate={props.handleUpdate}
          />
        </Flex>
      </Box>
    </Skeleton>
  );
};

export default Card;
