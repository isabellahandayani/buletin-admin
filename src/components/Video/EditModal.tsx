import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
  ModalHeader,
  Textarea
} from "@chakra-ui/react";
import { useState } from "react";
import { update } from "../../service/VideoServices";

const EditModal = (props: any) => {
  const toast = useToast();
  const [title, setTitle] = useState(props.video_title);
  const [desc, setDesc] = useState(props.video_desc);
  const [url, setUrl] = useState(props.video_url);

  const handleUpdate = async () => {
    let { data } = await update(title, desc, url, props.video_id);

    if (data) {
      toast({
        title: "Success",
        description: "Video updated successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      props.fetchList();
      props.onClose();
    } else {
      toast({
        title: "Error",
        description: "Video update failed",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Video</ModalHeader>
        <ModalBody>
          <Stack spacing={4}>
            <FormControl id="title">
              <FormLabel>Video Title</FormLabel>
              <Input
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl id="desc">
              <FormLabel>Video Description</FormLabel>
              <Textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                _placeholder={{ color: "gray.500" }}
                size="md"
				resize="none"
              />
            </FormControl>
            <FormControl id="url">
              <FormLabel>Video URL</FormLabel>
              <Input
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter mx="auto">
          <ButtonGroup>
            <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
              onClick={props.onClose}
            >
              Cancel
            </Button>
            <Button
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
              isDisabled={!url || !title || !desc}
              onClick={handleUpdate}
            >
              Save
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
