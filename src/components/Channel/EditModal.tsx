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
  Avatar,
  Center,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { update } from "../../service/ChannelServices";

const EditModal = (props: any) => {
  const [cname, setCname] = useState("");
  const toast = useToast();

  const handleUpdate = async (
    owner_id: any,
    channel_name: any,
    channel_picture: any,
    channel_id: any
  ) => {
    try {
      await update(owner_id, channel_name, channel_picture, channel_id);
      toast({
        title: "Update Succesful",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } catch (e) {
      console.log(e);
      toast({
        title: "Update Failed",
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
        <ModalBody>
          <Stack spacing={4}>
            <FormControl id="picture" mt={10}>
              <Center>
                <Avatar
                  size="2xl"
                  name={props.channel_name}
                  src={props.channel_picture}
                />
              </Center>
            </FormControl>
            <FormControl id="cname">
              <FormLabel>Channel Name</FormLabel>
              <Input
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={cname}
                onChange={(e) => setCname(e.target.value)}
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
              onClick={() =>
                handleUpdate(
                  props.owner_id,
                  cname,
                  props.channel_picture,
                  props.channel_id
                )
              }
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
