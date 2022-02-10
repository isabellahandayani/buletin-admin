import { Tr, Td, Image, Text, Flex, Center } from "@chakra-ui/react";

interface EntryProps {
  thumbnail: string;
  view: string;
  title: string;
  date: string;
  desc: string;
  channel: string;
}
const VideoEntry: React.FC<EntryProps> = (props) => {
  return (
    <>
      <Tr>
        <Td>
          <Flex>
            <Image maxW={200} src={props.thumbnail} mr={10} />
            <Center>
              <Flex direction="column">
                <Text color="blackAlpha.800" fontWeight="bold">{props.title}</Text>
                <Text>{props.desc}</Text>
              </Flex>
            </Center>
          </Flex>
        </Td>
        <Td>{props.channel}</Td>
        <Td>{props.date}</Td>
        <Td textAlign="right">{props.view}</Td>
      </Tr>
    </>
  );
};

export default VideoEntry;
