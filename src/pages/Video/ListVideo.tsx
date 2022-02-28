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
import { useParams } from "react-router-dom";
import { getVideoChannel as getVideo } from "../../service/VideoServices";
import VideoEntry from "../../components/Video/VideoEntry";

const ListVideo = () => {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { channelId } = useParams()

  useEffect(() => {
    const fetchList = async () => {
      let { data } = await getVideo(1, 6, channelId);
      setList(data.videos);
      setLoading(false);
    };

    fetchList();
  }, [channelId]);

  return loading ? (
    <Center mt={300}>
      <Spinner size="xl" />
    </Center>
  ) : list && list.length === 0 ? (
    <Center mt={300}>
      <Heading  as="h2">There's No Video Yet</Heading>
    </Center>
  ) : (
    <Center>
      <Table bg={"#f1f1f1"} variant="striped" colorScheme="telegram" size="md" maxW="95%" boxShadow="lg">
        <Thead>
          <Tr fontSize="lg">
            <Th>Video</Th>
            <Th>Date</Th>
            <Th isNumeric>Views</Th>
            <Th isNumeric>Controls</Th>
          </Tr>
        </Thead>
        <Tbody>
          {list && list.map((item: any) => (
            <VideoEntry key={item.video_id} {...item} {...channelId} />
          ))}
        </Tbody>
      </Table>
    </Center>
  );
};

export default ListVideo;
