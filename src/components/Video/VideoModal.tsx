import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Textarea,
  Stack,
  Select,
  Tag,
  TagLabel,
  TagCloseButton,
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ID } from "../../const";
import { upload } from "../../service/GoogleServices";
import { create, update } from "../../service/VideoServices";

const VideoModal = (props: any) => {
  const toast = useToast();
  const { channelId } = useParams();
  const [chosen, setChosen] = useState<any[]>([]);
  const [list, setList] = useState<any[]>([]);
  const [title, setTitle] = useState<string>(props.video_title || "");
  const [desc, setDesc] = useState(props.video_desc || "");
  const [tabIndex, setIndex] = useState(0);
  const [video, setVideo] = useState<any>();

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
    let resVideo: any = await upload(video, ID.VIDEO);

    if (props.type === "Add") {
      var { data } = await create(
        title,
        desc,
        resVideo ? resVideo.id : "placeholder",
        parseInt(channelId!!),
        chosen.map((item: any) => item.interest_id)
      );
    } else {
      // eslint-disable-next-line @typescript-eslint/no-redeclare
      var { data } = await update(
        title,
        desc,
        resVideo ? resVideo.id : "placeholder",
        props.video_id,
        chosen.map((item: any) => item.interest_id)
      );
    }

    if (data && resVideo) {
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

      if (props.type === "Add") {
        handleClose();
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

  const handleClose = () => {
    setList(
      Object.entries(props.interest).map(([k, v]) => ({
        interest_id: k,
        interest_name: v,
      }))
    );
    setChosen([]);
    setTitle("");
    setDesc("");
    setVideo(undefined);
    setIndex(0);
    props.onClose();
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
    <Modal
      isOpen={props.isOpen}
      onClose={handleClose}
      isCentered
      size="lg"
      onOverlayClick={handleClose}
      onEsc={handleClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Tabs isFitted variant="line" size="md" index={tabIndex}>
            <TabList>
              <Tab _focus={{ boxShadow: "none" }} />
              <Tab _focus={{ boxShadow: "none" }} />
            </TabList>
            <TabPanels>
              <TabPanel>
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
                          <option
                            key={item.interest_id}
                            value={item.interest_id}
                          >
                            {item.interest_name}
                          </option>
                        ))}
                    </Select>

                    {chosen &&
                      chosen.map((item: any) => (
                        <Tag
                          key={`${item.interest_id}-chosen`}
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
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    w="full"
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={() => setIndex(1)}
                    isDisabled={!title || !desc || chosen.length === 0}
                  >
                    Next
                  </Button>
                </Stack>
              </TabPanel>
              <TabPanel>
                <Stack spacing={2}>
                  <FormControl>
                    <FormLabel>Video Uploader</FormLabel>
                    <Center>
                      <Input
                        type="file"
                        onChange={(e) => {
                          if (e.target.files) {
                            setVideo(e.target.files[0]);
                          }
                        }}
                      />
                    </Center>
                  </FormControl>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    w="full"
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={handleSubmit}
                    isDisabled={!video}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    w="full"
                    onClick={() => setIndex(0)}
                  >
                    Back
                  </Button>
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default VideoModal;
