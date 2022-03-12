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
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  create,
  getVideoChannel as getVideo,
  update,
} from "../../service/VideoServices";
import VideoEntry from "../../components/Video/VideoEntry";
import AddButton from "../../components/Common/AddButton";
import CreateModal from "../../components/Common/CreateModal";

const ListVideo = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const { channelId } = useParams();
  const toast = useToast();

  const form = [
    {
      name: "Title",
      placeholder: "video-title",
      value: title,
      onChange: setTitle,
    },
    {
      name: "Description",
      placeholder: "video-description",
      value: desc,
      onChange: setDesc,
    },
    {
      name: "Video URL",
      placeholder: "www.youtube.com/watch?v=RKueSD3gLJQ&t=15s",
      value: url,
      onChange: setUrl,
    },
  ];

  const createToast = (status: string, message: string) => {
    toast({
      title: status,
      description: message,
      status: status === "Error" ? "error" : "success",
      duration: 9000,
      isClosable: true,
      position: "top",
    });
  };



  const handleSubmit = async () => {
    let { data } = await create(title, desc, url, parseInt(channelId!!));
    if (data) {
      createToast("Success", "Video Successfully Created");
      fetchList();
      onClose();
    } else {
      createToast("Error", "Video Creation Failed");
    }

    setTitle("");
    setDesc("");
    setUrl("");
  };

  const handleUpdate = async (video_id: any) => {
    let { data } = await update(title, desc, url, video_id);
    if (data) {
      createToast("Success", "Update Successful");
      fetchList();
      onClose();
    } else {
      createToast("Error", "Update Failed");
    }
    setTitle("");
    setDesc("");
    setUrl("");
  };

  const fetchList = async () => {
    let { data } = await getVideo(1, 6, channelId);
    setList(data.videos);
    setLoading(false);
  };

  useEffect(() => {
    fetchList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                <VideoEntry
                  key={item.video_id}
                  {...item}
                  {...channelId}
                  handleSubmit={handleUpdate}
                  fetchList={fetchList}
                  form={form}
                  id={item.video_id}
                />
              ))}
          </Tbody>
        </Table>
      ) : (
        <Heading mt={300}>There's no video yet</Heading>
      )}
      <AddButton onOpen={onOpen} />
      <CreateModal
        type="Video"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        form={form}
        handleSubmit={handleSubmit}
      />
    </Center>
  );
};

export default ListVideo;
