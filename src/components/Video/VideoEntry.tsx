import {
  Tr,
  Td,
  Image,
  Text,
  Flex,
  Center,
  IconButton,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import { MdDelete, MdEdit } from "react-icons/md";
import { deleteVideo } from "../../service/VideoServices";
import EditModal from "../Common/EditModal";

const VideoEntry: React.FC<any> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleDelete = async () => {
    let { data } = await deleteVideo(props.video_id);

    if (data) {
      toast({
        title: "Success",
        description: "Video deletion succeeded",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      props.fetchList();
    } else {
      toast({
        title: "Error",
        description: "Video deletion failed",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      <EditModal
        id={props.id}
        form={props.form}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        type="Video"
        handleSubmit={props.handleSubmit}
      />
      <Tr
        _hover={{
          boxShadow: "lg",
        }}
      >
        <Td maxW={500}>
          <Flex>
            <Image
              maxW={200}
              src={props.video_thumbnail}
              mr={10}
              boxShadow="sm"
              fallbackSrc="https://cdn.dribbble.com/users/17914/screenshots/4902225/video-placeholder.png"
            />
            <Center>
              <Flex direction="column">
                <Text color="blackAlpha.800" fontWeight="bold">
                  {props.video_title}
                </Text>
                <Text fontWeight="thin">{props.video_desc}</Text>
              </Flex>
            </Center>
          </Flex>
        </Td>
        <Td>{moment(props.date_posted).format("D MMM YYYY")}</Td>
        <Td isNumeric>{props.video_view_count}</Td>
        <Td isNumeric>
          <IconButton
            mr={2}
            aria-label="delete"
            icon={<MdDelete />}
            onClick={handleDelete}
            bg={"red.500"}
            color="white"
          />
          <IconButton
            aria-label="edit"
            icon={<MdEdit />}
            bg={"blue.500"}
            color="white"
            onClick={onOpen}
          />
        </Td>
      </Tr>
    </>
  );
};

export default VideoEntry;
