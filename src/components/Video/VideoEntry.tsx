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
import { Link } from "react-router-dom";
import moment from "moment";
import { MdDelete, MdEdit } from "react-icons/md";
import { deleteVideo } from "../../service/VideoServices";
import EditModal from "./EditModal";

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
      <EditModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} {...props} />
    <Tr
      _hover={{
        boxShadow: "lg",
      }}
    >
      <Td maxW={500}>
        <Link to={`/channel/${props.channelId}/${props.video_id}`}>
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
        </Link>
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
