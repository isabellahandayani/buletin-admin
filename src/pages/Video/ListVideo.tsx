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
import VideoEntry from "../../components/Video/VideoEntry";
import { getList } from "../../service/VideoServices";

const ListVideo = () => {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchList = async () => {
      let { data } = await getList();
      setList(data.videos);
      setLoading(false);
    };

    fetchList();
  }, []);

  return loading ? (
    <Center mt={300}>
      <Spinner size="xl" />
    </Center>
  ) : list.length === 0 ? (
    <Center mt={300}>
      <Heading  as="h2">There's No Video Yet</Heading>
    </Center>
  ) : (
    <Center>
      <Table variant="striped" colorScheme="telegram" size="md" maxW="95%">
        <Thead>
          <Tr fontSize="lg">
            <Th>Video</Th>
            <Th>Date</Th>
            <Th isNumeric>Views</Th>
          </Tr>
        </Thead>
        <Tbody>
          {list.map((item: any) => (
            <VideoEntry key={item.video_id} {...item} />
          ))}
        </Tbody>
      </Table>
    </Center>
  );
};

export default ListVideo;
