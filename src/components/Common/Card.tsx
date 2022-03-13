import {
  Heading,
  Box,
  Image,
  Text,
  Flex,
  Spacer,
  Skeleton,
  Tag,
  Stack
} from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";

const Card = (props: any) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Skeleton isLoaded={!loading}>
      <Box
        minW={300}
        w={"full"}
        _hover={{
          boxShadow: "lg",
        }}
        bg="white"
        boxShadow={"2xl"}
        rounded={"md"}
      >
        <Link to={props.link}>
          <Image
            h={"120px"}
            w={"full"}
            src={props.picture}
            fallbackSrc="https://cdn.dribbble.com/users/17914/screenshots/4902225/video-placeholder.png"
            objectFit={"cover"}
            cursor="pointer"
          />
        </Link>

        <Flex flexDirection="row">
          <Flex flexDirection="column" p={30} h="100%">
            <Stack spacing={2}>
              <Heading fontSize={"2xl"} as="h2">
                {props.name}
              </Heading>
              {props.created_at && (
                <Text>
                  Since {moment(props.created_at).format("D MMM YYYY")}
                </Text>
              )}
              {props.category && (
                <Tag colorScheme="telegram">{props.category}</Tag>
              )}
            </Stack>
          </Flex>

          <Spacer />
          <Menu
            type={props.type}
            {...props.menuControl}
            id={props.id}
            form={props.form}
            name={props.name}
            category={props.category}
          />
        </Flex>
      </Box>
    </Skeleton>
  );
};

export default Card;