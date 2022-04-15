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
  Image,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { DRIVE_URL, ID, THUMBNAIL_PLACEHOLDER } from "../../const";
import { upload } from "../../service/GoogleServices";
import { create, update } from "../../service/VideoServices";

const VideoModal = (props: any) => {
  const [chosen, setChosen] = useState<any[]>([]);
  const [list, setList] = useState<any[]>([]);
  const [title, setTitle] = useState<any>("");
  const [desc, setDesc] = useState<any>("");
  const [image, setImage] = useState<any>();
  const [preview, setPreview] = useState<any>();
  const [tabIndex, setIndex] = useState(0);
  const [video, setVideo] = useState<any>();
  const [submit, setSubmit] = useState(false);

  const inputFile = useRef<HTMLInputElement | null>(null);
  const toast = useToast();
  const { channelId } = useParams();

  const { getRootProps, getInputProps } = useDropzone({
    accept: "video/*",
    multiple: false,
    onDrop: (acceptedFiles: any) => {
      setVideo(acceptedFiles[0]);
    },
  });

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
    setSubmit(true);

    let resImg: any;
    if (image) {
      resImg = await upload(image, ID.VIDEO_THUMBNAIL);
    }

    let resVideo: any = await upload(video, ID.VIDEO);

    if (props.type === "Add") {
      var { data } = await create(
        title,
        desc,
        resVideo.id,
        parseInt(channelId!!),
        chosen.map((item: any) => item.interest_id),
        resImg.id
      );
    } else {
      // eslint-disable-next-line @typescript-eslint/no-redeclare
      var { data } = await update(
        title,
        desc,
        props.video_file_id,
        props.video_id,
        chosen.map((item: any) => item.interest_id),
        resImg ? resImg.id : props.video_thumbnail
      );
    }

    if (data) {
      toast({
        title: "Success",
        description: props.type === "Add" ? "Video successfully created" : "Video successfully updated",
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

    setSubmit(false);
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
    setImage(undefined);
    setVideo(undefined);
    setPreview(undefined);
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
        setPreview(props.video_thumbnail);
        setTitle(props.video_title);
        setDesc(props.video_desc);

        data = data.filter(
          (item) => !chosen.find((row) => row.interest_id === item.interest_id)
        );
      }
      setList(data);
    }

    URL.revokeObjectURL(preview);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

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
                    <FormLabel>Video Thumbnail</FormLabel>
                    <Center>
                      <Image
                        maxH={200}
                        fallbackSrc={THUMBNAIL_PLACEHOLDER}
                        borderRadius={10}
                        src={
                          props.video_thumbnail === preview
                            ? `${DRIVE_URL}${preview}`
                            : preview
                        }
                        objectFit="cover"
                        opacity={0.5}
                        _hover={{
                          opacity: 1,
                        }}
                        cursor="pointer"
                        onClick={() => inputFile?.current?.click()}
                      />
                      <Input
                        type="file"
                        ref={inputFile}
                        display="none"
                        onChange={(e) => {
                          if (e.target.files) {
                            setPreview(URL.createObjectURL(e.target.files[0]));
                            setImage(e.target.files[0]);
                          }
                        }}
                      />
                    </Center>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Video Uploader</FormLabel>
                    <Center
                      {...getRootProps({ className: "dropzone" })}
                      minH={150}
                      h="full"
                      border={3}
                      borderColor="gray.200"
                      borderStyle="dashed"
                      backgroundColor="gray.100"
                      borderRadius={5}
                    >
                      <input type="file" {...getInputProps()} />
                      <Text>Drop the files here or click to upload video</Text>
                    </Center>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Files</FormLabel>
                    <Text color="gray.500">
                      {video
                        ? video.name
                        : props.video_title
                        ? props.video_title
                        : "There's No File Yet"}
                    </Text>
                  </FormControl>
                  <Button
                    isLoading={submit}
                    loadingText="Submitting"
                    bg={"blue.400"}
                    color={"white"}
                    w="full"
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={handleSubmit}
                    isDisabled={
                      props.type === "Add" ? !video || !preview : !preview
                    }
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
