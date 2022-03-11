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
} from "@chakra-ui/react";
import jwt_decode from "jwt-decode"
import { useState } from "react";
import { create } from "../../service/ChannelServices";

const CreateModal = (props: any) => {
  const [channel, setChannel] = useState<string>("");
  const toast = useToast();

  const handleSubmit = async () => {
    let decoded: any = jwt_decode(localStorage.getItem("token")!!);

    let { data } = await create(decoded.account_id, channel, "placeholder");
    if (data) {
      toast({
        title: "Success",
        description: "Channel created successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      props.onClose();
    } else {
      toast({
        title: "Error",
        description: "Channel creation failed",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
    setChannel("");
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Channel</ModalHeader>
        <ModalBody>
          <FormControl id="category" isRequired>
            <FormLabel>Channel Name</FormLabel>
            <Input
              placeholder="channel-name"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
            />
          </FormControl>
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
              isDisabled={!channel}
              onClick={handleSubmit}
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

