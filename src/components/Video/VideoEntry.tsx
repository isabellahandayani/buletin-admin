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
  ButtonGroup,
  Tooltip
} from "@chakra-ui/react";
import moment from "moment";
import { MdDelete, MdEdit } from "react-icons/md";
import { deleteVideo } from "../../service/VideoServices";
import { Link } from "react-router-dom";
import { DRIVE_URL, FALLBACK_IMG } from "../../const";
import VideoModal from "../../components/Video/VideoModal";

const VideoEntry = (props: any) => {
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
      <VideoModal
        type="Edit"
        onOpen={onOpen}
        onClose={onClose}
        isOpen={isOpen}
        {...props}
      />
      <Tr
        _hover={{
          boxShadow: "lg",
        }}
      >
        <Td maxW={500}>
          <Link to={`/video/${props.video_id}`}>
            <Flex>
              <Image
                maxW={200}
                w="full"
                src={`${DRIVE_URL}${props.video_thumbnail}`}
                mr={10}
                boxShadow="sm"
                fallbackSrc={FALLBACK_IMG}
                height={150}
                objectFit="cover"
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
          <ButtonGroup>
            <Tooltip label="Delete Video" size="md">
              <IconButton
                mr={2}
                aria-label="delete"
                icon={<MdDelete />}
                onClick={handleDelete}
                bg={"red.400"}
                _hover={{
                  bg: "red.500",
                }}
                color="white"
              />
            </Tooltip>
            <Tooltip label="Edit Video" size="md">
              <IconButton
                aria-label="edit"
                icon={<MdEdit />}
                bg={"blue.400"}
                _hover={{
                  bg: "blue.500",
                }}
                color="white"
                onClick={onOpen}
              />
            </Tooltip>
          </ButtonGroup>
        </Td>
      </Tr>
    </>
  );
};

export default VideoEntry;
