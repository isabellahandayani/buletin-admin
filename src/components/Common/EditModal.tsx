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
  Stack,
  Select,
} from "@chakra-ui/react";

const EditModal = (props: any) => {
  const handleSubmit = () => {
    props.onClose();
    props.handleSubmit(props.id);
  };

  const handleClose = () => {
    props.form.filter((item: any) => item.onChange(""));
    props.onClose();
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered onOverlayClick={handleClose} onEsc={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit {props.type}</ModalHeader>
        <ModalBody>
          <Stack spacing={2}>
            {props &&
              props.form.map((item: any) => {
                return (
                  <FormControl
                    key={item.id}
                    id={item.placeholder}
                  >
                    <FormLabel>{item.name}</FormLabel>
                    {item.selection ? (
                      <Select
                        placeholder="Select Category"
                        onChange={(e) =>
                          item.onChange(parseInt(e.target.value))
                        }
                      >
                        {item.selection.map((category: any) => (
                          <option key={category.category_id} value={category.category_id}>
                            {category.category_name}
                          </option>
                        ))}
                      </Select>
                    ) : (
                      <Input
                        placeholder={props.name ? props.name : item.placeholder}
                        _placeholder={{ color: "gray.500" }}
                        type="text"
                        value={item.value}
                        onChange={(e) => item.onChange(e.target.value)}
                      />
                    )}
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
              onClick={handleClose}
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

export default EditModal;
