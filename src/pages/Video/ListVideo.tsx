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
import AddButton from "../../components/Common/AddButton";
import VideoModal from "../../components/Video/VideoModal";
import { get } from "../../service/InterestServices";

const ListVideo = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [interest, setInterest] = useState<any>();
  const { channelId } = useParams();

  const fetchInterest = async () => {
    let { data } = await get();
    setInterest(data.interests);
  };

  const fetchList = async () => {
    let { data } = await getVideo(channelId);
    setList(data.videos);
    setLoading(false);
  };

  useEffect(() => {
    fetchList();
    fetchInterest();
    document.title = "Buletin.id | Video";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Center>
      {loading ? (
        <Spinner mt={300} size="xl" />
      ) : list && list.length > 0 ? (
        <Table
          bg={"#ffffff"}
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
                <VideoEntry
                  key={item.video_id}
                  {...item}
                  {...channelId}
                  fetchList={fetchList}
                  interest={interest}
                />
              ))}
          </Tbody>
        </Table>
      ) : (
        <Heading mt={300}>There's no video yet</Heading>
      )}
      <AddButton onOpen={onOpen} />
      {interest && (
        <VideoModal
          type="Add"
          onOpen={onOpen}
          isOpen={isOpen}
          onClose={onClose}
          interest={interest}
          fetchList={fetchList}
        />
      )}
    </Center>
  );
};

export default ListVideo;
