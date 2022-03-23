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
  Image,
  Center,
} from "@chakra-ui/react";
import { FALLBACK_IMG } from "../../const";

const ComonModal = (props: any) => {
  const handleClose = () => {
    props.form.filter((item: any) => item.onChange(""));
    props.onClose();
  };

  const renderInput = (item: any) => {
    switch (item.type) {
      case "Avatar":
        return (
          <Center>
            <Image
              maxH={200}
              fallbackSrc={FALLBACK_IMG}
              borderRadius={10}
              objectFit="cover"
              src={item.value}
              opacity={0.5}
              _hover={{
                opacity: 1,
              }}
            />
          </Center>
        );
      case "Select":
        return (
          <Select
            placeholder="Select Category"
            onChange={(e) => item.onChange(parseInt(e.target.value))}
          >
            {item.selection.map((item: any) => (
              <option key={item.category_id} value={item.category_id}>
                {item.category_name}
              </option>
            ))}
          </Select>
        );
      default:
        return (
          <Input
            placeholder={item.placeholder}
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={item.value}
            onChange={(e) => item.onChange(e.target.value)}
          />
        );
    }
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      isCentered
      onOverlayClick={handleClose}
      onEsc={handleClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.type}</ModalHeader>
        <ModalBody>
          <Stack spacing={2}>
            {props &&
              props.form.map((item: any) => {
                return (
                  <FormControl
                    key={item.placeholder ? item.placeholder : item.name}
                    id={item.placeholder}
                  >
                    <FormLabel>{item.name}</FormLabel>
                    {renderInput(item)}
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
              onClick={props.handleSubmit}
            >
              Save
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ComonModal;
