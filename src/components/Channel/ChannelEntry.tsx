import { Tr, Td, Image, Text, Flex, Center } from "@chakra-ui/react";

const ChannelEntry: React.FC<any> = (props) => {
  return (
    <Tr>
      <Td maxW={400}>
        <Flex>
          <Image
            maxW={200}
            src={props.channel_picture}
            mr={10}
            fallbackSrc="https://cdn.dribbble.com/users/17914/screenshots/4902225/video-placeholder.png"
          />
          <Center>
            <Text color="blackAlpha.800" fontWeight="bold">
              {props.channel_name}
            </Text>
          </Center>
        </Flex>
      </Td>
      <Td isNumeric>{props.created_at}</Td>
    </Tr>
  );
};

export default ChannelEntry;
