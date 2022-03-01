import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Center,
  Spinner,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getVideoChannel as getVideo } from "../../service/VideoServices";
import VideoEntry from "../../components/Video/VideoEntry";
import AddButton from "../../components/AddButton";
import CreateModal from "../../components/Video/CreateModal";

const ListVideo = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { channelId } = useParams();

  useEffect(() => {
    const fetchList = async () => {
      let { data } = await getVideo(1, 6, channelId);
      setList(data.videos);
      setLoading(false);
    };

    fetchList();
  }, [channelId, list]);

  return (
    <Center>
      {loading ? (
        <Spinner mt={300} size="xl" />
      ) : list && list.length > 0 ? (
        <Table
          bg={"#f1f1f1"}
          variant="striped"
          colorScheme="telegram"
          size="md"
          maxW="95%"
          boxShadow="lg"
        >
          <Thead>
            <Tr fontSize="lg">
              <Th>Video</Th>
              <Th>Date</Th>
              <Th isNumeric>Views</Th>
              <Th isNumeric>Controls</Th>
            </Tr>
          </Thead>
          <Tbody>
            {list &&
              list.map((item: any) => (
                <VideoEntry key={item.video_id} {...item} {...channelId} />
              ))}
          </Tbody>
        </Table>
      ) : (
        <Heading mt={300}>There's no video yet</Heading>
      )}
      <AddButton onOpen={onOpen} />
      <CreateModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </Center>
  );
};

export default ListVideo;
