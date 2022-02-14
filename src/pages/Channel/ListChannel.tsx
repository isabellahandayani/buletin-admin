import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Center,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ChannelEntry from "../../components/Channel/ChannelEntry";

const ListVideo = () => {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchList = async () => {
  //     setLoading(false);
  //   };

  //   fetchList();
  // }, []);

  const dummy = {
    channel_name: "Narasi.tv",
    channel_picture: "placeholder",
    created_at: "10 Feb 2021"
  }

  return <>
    <Center>
      <Table variant="striped" colorScheme="telegram" size="md" maxW="95%">
        <Thead>
          <Tr fontSize="lg">
            <Th>Channel</Th>
            <Th isNumeric>Created At</Th>
          </Tr>
        </Thead>
        <Tbody>
          <ChannelEntry {...dummy} />
          <ChannelEntry {...dummy} />
          <ChannelEntry {...dummy} />
        </Tbody>
      </Table>
    </Center></>
  ;
};

export default ListVideo;
