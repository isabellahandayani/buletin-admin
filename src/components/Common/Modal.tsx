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
  Center,
  Image,
} from "@chakra-ui/react";
import { FALLBACK_IMG } from "../../const";
import { useRef } from "react";

const ComonModal = (props: any) => {
  const inputFile = useRef<HTMLInputElement | null>(null);

  const renderInput = (item: any) => {
    switch (item.type) {
      case "Avatar":
        return (
          <Center>
            <Image
              maxH={200}
              fallbackSrc={FALLBACK_IMG}
              borderRadius={10}
              src={item.value}
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
              id="file-input"
              style={{ display: "none" }}
              ref={inputFile}
              onChange={(e) => {
                if (e.target.files) {
                  item.setPreview(URL.createObjectURL(e.target.files[0]));
                  item.onChange(e.target.files[0]);
                }
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
      onOverlayClick={props.handleclose}
      onEsc={props.handleclose}
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
              onClick={props.handleclose}
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
