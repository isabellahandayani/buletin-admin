import { Tr, Td, Image, Text, Flex, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment";

const VideoEntry: React.FC<any> = (props) => {
  return (
    <Tr>
      <Td maxW={400}>
        <Link to={`/video/${props.video_id}`}>
          <Flex>
            <Image maxW={200} src={props.video_thumbnail} mr={10} fallbackSrc="https://cdn.dribbble.com/users/17914/screenshots/4902225/video-placeholder.png" />
            <Center>
              <Flex direction="column">
                <Text color="blackAlpha.800" fontWeight="bold">
                  {props.video_title}
                </Text>
                <Text>{props.video_desc}</Text>
              </Flex>
            </Center>
          </Flex>
        </Link>
      </Td>
      {/* <Td>{props.ChannelInfo.channel_name}</Td> */}
      <Td>{moment(props.date_posted).format("D MMM YYYY")}</Td>
      <Td textAlign="right">{props.video_view_count}</Td>
    </Tr>
  );
};

export default VideoEntry;
