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
  Select,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { create, update } from "../../service/VideoServices";

const VideoModal = (props: any) => {
  const toast = useToast();
  const { channelId } = useParams();
  const [chosen, setChosen] = useState<any[]>([]);
  const [list, setList] = useState<any[]>([]);
  const [title, setTitle] = useState<string>(props.video_title || "");
  const [desc, setDesc] = useState(props.video_desc || "");
  const [url, setUrl] = useState(props.video_url || "");

  const handleChange = (interest: any) => {
    if (interest) {
      setChosen([
        ...chosen,
        {
          interest_id: interest,
          interest_name: props.interest[interest],
        },
      ]);
      setList(list.filter((item: any) => item.interest_id !== interest));
    }
  };

  const handleDelete = (id: any) => {
    setChosen(chosen.filter((item: any) => item.interest_id !== id));
    setList([...list, { interest_id: id, interest_name: props.interest[id] }]);
  };

  const handleSubmit = async () => {
    if (props.type === "Add") {
      var { data } = await create(
        title,
        desc,
        url,
        parseInt(channelId!!),
        chosen.map((item: any) => item.interest_id)
      );
    } else {
      // eslint-disable-next-line @typescript-eslint/no-redeclare
      var { data } = await update(
        title,
        desc,
        url,
        props.video_id,
        chosen.map((item: any) => item.interest_id)
      );
    }

    if (data) {
      toast({
        title: "Success",
        description: "Video successfully created",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      props.fetchList();
      props.onClose();

      if(props.type === "Add") {
        setTitle("");
        setDesc("");
        setUrl("");
        setChosen([]);
      }
      setList(
        Object.entries(props.interest).map(([k, v]) => ({
          interest_id: k,
          interest_name: v,
        }))
      );
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
  };

  useEffect(() => {
    if (props.interest) {
      let data = Object.entries(props.interest).map(([k, v]) => ({
        interest_id: k,
        interest_name: v,
      }));

      if (props.type === "Edit") {
        setChosen(
          Object.entries(props.video_interest_info).map(([k, v]) => ({
            interest_id: k,
            interest_name: v,
          }))
        );

        data = data.filter(
          (item) => !chosen.find((row) => row.interest_id === item.interest_id)
        );
      }
      setList(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.interest]);

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.type} Video</ModalHeader>
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
                placeholder="video-description"
                onChange={(e) => setDesc(e.target.value)}
                _placeholder={{ color: "gray.500" }}
                size="md"
                resize="none"
              />
            </FormControl>
            <FormControl id="interest">
              <FormLabel>Video Interest</FormLabel>
              <Select
                placeholder="Select Interest"
                onChange={(e) => handleChange(e.target.value)}
              >
                {list &&
                  list.map((item: any) => (
                    <option key={item.interest_id} value={item.interest_id}>
                      {item.interest_name}
                    </option>
                  ))}

              </Select>

              {chosen &&
                chosen.map((item: any) => (
                  <Tag
                    key={item.interest_id}
                    colorScheme="telegram"
                    mt={2}
                    mr={2}
                  >
                    <TagLabel>{item.interest_name}</TagLabel>
                    <TagCloseButton
                      sx={{
                        width: "1.5rem",
                      }}
                      onClick={() => handleDelete(item.interest_id)}
                    />
                  </Tag>
                ))}
            </FormControl>
            <FormControl id="uploader">
              <FormLabel>Video Uploader</FormLabel>
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

export default VideoModal;
