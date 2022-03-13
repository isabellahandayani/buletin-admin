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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAll } from "../../service/VideoServices";
import VideoCard from "../Video/VideoCard";

const AddVideo = (props: any) => {
  const [list, setList] = useState<any[]>([]);
  const [search, setSearch] = useState<any[]>([]);

  useEffect(() => {
    const fetchList = async () => {
      var { data } = await getAll();
      let filtered = data.videos.filter(
        (item: any) => !props.list.includes(item)
      );
      setList(filtered);
      setSearch(filtered);
    };

    fetchList();
  }, [props.list]);

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
          overflow="scroll"
          sx={{
            "overflow-x": "hidden",
          }}
        >
          <FormControl>
            {search &&
              search.map((item: any) => (
                <VideoCard key={item.video_id} {...item} />
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
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddVideo;
