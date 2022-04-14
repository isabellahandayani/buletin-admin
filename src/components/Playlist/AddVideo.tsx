import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  Input,
  Center,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { addVideo } from "../../service/PlaylistServices";
import { getAllExcept } from "../../service/VideoServices";
import VideoCard from "../Video/VideoCardUpload";

const AddVideo = (props: any) => {
  const [selected, setSelected] = useState<any>(null);
  const [list, setList] = useState<any[]>([]);
  const [search, setSearch] = useState<any[]>([]);
  const toast = useToast();

  const handleAdd = async () => {
    let res = await addVideo(selected, props.playlistId);

    if (res.data) {
      toast({
        title: "Success",
        description: res.data,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      props.onClose();
      props.fetchList();
      setSelected(null);
      fetchList();
    } else {
      toast({
        title: "Error",
        description: res.error,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const fetchList = async () => {
    let data = await getAllExcept(props.playlistId);
    setList(data);
    setSearch(data);
  };

  useEffect(() => {
    fetchList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.playlistId]);

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent maxH="80%" h="full">
        <ModalHeader>
          <Text as="h2">Add Video</Text>
          <Input
            placeholder="Search Video"
            mt={4}
            onChange={(e: any) =>
              setSearch(
                list.filter((item: any) =>
                  item.video_title.includes(e.target.value)
                )
              )
            }
          />
        </ModalHeader>
        <ModalBody
          sx={{
            "overflow-x": "hidden",
          }}
        >
          <FormControl>
            {search &&
              search.map((item: any) => (
                <VideoCard
                  key={item.video_id}
                  {...item}
                  setSelected={setSelected}
                  selected={selected}
                />
              ))}
            {search && search.length === 0 && (
              <Center>
                <Text as="h2">No Video Found</Text>
              </Center>
            )}
          </FormControl>
        </ModalBody>
        <ModalFooter
          mx="auto"
          w="100%"
          sx={{
            "border-top": "0.5px solid #dadee2",
          }}
        >
          <Button
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            isDisabled={!selected}
            onClick={handleAdd}
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddVideo;
