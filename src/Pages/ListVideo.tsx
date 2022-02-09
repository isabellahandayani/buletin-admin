import { Table, Thead, Tbody, Tr, Th, Center, Box } from "@chakra-ui/react";
import VideoEntry from "../components/Video/VideoEntry";

const dummy = {
  thumbnail: "https://bit.ly/naruto-sage",
  title: "Naruto Sage Mode",
  date: "19 Dec 2021",
  view: "192",
  desc: "Test",
  channel: "Naruto",
};

const ListVideo = () => {
  return (
    <Center>
      <Table variant='striped' size="md" maxW="95%">
        <Thead>
          <Tr fontSize="lg">
            <Th>Video</Th>
            <Th>Channel</Th>
            <Th>Date</Th>
            <Th isNumeric>Views</Th>
          </Tr>
        </Thead>
        <Tbody>
          <VideoEntry {...dummy} />
          <VideoEntry {...dummy} />
          <VideoEntry {...dummy} />
          <VideoEntry {...dummy} />
          <VideoEntry {...dummy} />
          <VideoEntry {...dummy} />
          <VideoEntry {...dummy} />
          <VideoEntry {...dummy} />
        </Tbody>
      </Table>
    </Center>
  );
};

export default ListVideo;
