import { Table, Thead, Tbody, Tr, Th, Center } from "@chakra-ui/react";
import VideoEntry from "../components/Video/VideoEntry";

const ListVideo = () => {
  return (
    <Center>
      <Table variant="striped" colorScheme="telegram" size="md" maxW="95%">
        <Thead>
          <Tr fontSize="lg">
            <Th>Video</Th>
            <Th>Channel</Th>
            <Th>Date</Th>
            <Th isNumeric>Views</Th>
          </Tr>
        </Thead>
        <Tbody>
        </Tbody>
      </Table>
    </Center>
  );
};

export default ListVideo;
