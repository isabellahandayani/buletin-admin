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
  Stack
} from "@chakra-ui/react";

const CreateModal = (props: any) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add {props.type}</ModalHeader>
        <ModalBody>
          <Stack spacing={2}>
            {props &&
              props.form.map((item: any) => {
                return (
                  <FormControl
                    key={item.placeholder}
                    id={item.placeholder}
                    isRequired
                  >
                    <FormLabel>{item.name}</FormLabel>
                    <Input
                      placeholder={item.placeholder}
                      _placeholder={{ color: "gray.500" }}
                      type="text"
                      value={item.value}
                      onChange={(e) => item.onChange(e.target.value)}
                    />
                  </FormControl>
                );
              })}
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
              isDisabled={props.form.some((item: any) => item.value === "")}
              onClick={props.menuControl.handleSubmit}
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
