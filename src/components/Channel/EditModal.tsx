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
  Select
} from "@chakra-ui/react";

const EditModal = (props: any) => {
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
                placeholder={props.channel_name}
                _placeholder={{ color: "gray.500" }}
                type="text"
              />
            </FormControl>
            <FormControl id="category">
              <FormLabel>Category</FormLabel>
              <Select placeholder="Select option">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
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
