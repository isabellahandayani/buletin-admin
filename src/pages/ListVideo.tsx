import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Center,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import VideoEntry from "../components/Video/VideoEntry";
import { getList } from "../service/VideoServices";

const ListVideo = () => {
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    const fetchList = async () => {
      let { data } = await getList();
      setList(data);
    };

    fetchList();
  }, []);

  return (
    <Center>
      <Table variant="striped" colorScheme="telegram" size="md" maxW="95%">
        <Thead>
          <Tr fontSize="lg">
            <Th onClick={() => console.table(list)}>Video</Th>
            <Th>Date</Th>
            <Th isNumeric>Views</Th>
          </Tr>
        </Thead>
        <Tbody>
          {list.length > 0
            ? list.map((item: any) => (
                <VideoEntry key={item.video_id} {...item} />
              ))
            : null}
        </Tbody>
      </Table>
    </Center>
  );
};

export default ListVideo;
