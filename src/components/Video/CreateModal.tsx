import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  ButtonGroup,
  useToast,
  Textarea,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { create } from "../../service/VideoServices";

const CreateModal = (props: any) => {
  const toast = useToast();
  const { channelId } = useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async () => {
    let { data } = await create(title, desc, url, parseInt(channelId!!));
    if (data) {
      toast({
        title: "Success",
        description: "Video successfully created",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      props.onClose();
    } else {
      toast({
        title: "Error",
        description: "Video creation failed",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }

    setTitle("");
    setDesc("");
    setUrl("");
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Video</ModalHeader>
        <ModalBody>
          <Stack spacing={4}>
            <FormControl id="title">
              <FormLabel>Video Title</FormLabel>
              <Input
                placeholder="video-title"
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
                placeholder="video-descripton"
                onChange={(e) => setDesc(e.target.value)}
                _placeholder={{ color: "gray.500" }}
                size="md"
                resize="none"
              />
            </FormControl>
            <FormControl id="url">
              <FormLabel>Video URL</FormLabel>
              <Input
                placeholder="www.youtube.com/watch?v=RKueSD3gLJQ&t=15s"
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
              onClick={handleSubmit}
              isDisabled={!url || !title || !desc || desc.length > 200}
            >
              Save
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateModal;
