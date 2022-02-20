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
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { update } from "../../service/PlaylistServices";

const EditModal = (props: any) => {
  const [pname, setPname] = useState("");
  const toast = useToast();

  const handleUpdate = async (
    category_id: any,
    playlist_id: any,
  ) => {
    try {
      await update(category_id, playlist_id, pname);
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
                <Avatar size="2xl" name={props.playlist_name} />
              </Center>
            </FormControl>
            <FormControl id="pname">
              <FormLabel>Playlist Name</FormLabel>
              <Input
			  	placeholder = {props.playlist_name}
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={pname}
                onChange={(e) => setPname(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </Select>
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
                handleUpdate(props.category_id, props.playlist_id)
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
