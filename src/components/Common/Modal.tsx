import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Select,
  Center,
  Image,
  ModalFooter,
} from "@chakra-ui/react";
import { THUMBNAIL_PLACEHOLDER } from "../../const";
import { useRef } from "react";

const ComonModal = (props: any) => {
  const inputFile = useRef<HTMLInputElement | null>(null);

  const handleClose = () => {
    props.onClose();
    props.form[0].setPreview(undefined);
    props.form.filter((item: any) => item.onChange(undefined));
  };

  const renderInput = (item: any) => {
    switch (item.type) {
      case "Avatar":
        return (
          <Center>
            <Image
              maxH={200}
              fallbackSrc={THUMBNAIL_PLACEHOLDER}
              borderRadius={10}
              src={item.value ? item.value : props.picture}
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
              <option
                key={`category-${item.category_id}`}
                value={item.category_id}
              >
                {item.category_name}
              </option>
            ))}
          </Select>
        );
      default:
        return (
          <Input
            placeholder={props.name ? props.name : item.placeholder}
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={item.value ? item.value : ""}
            onChange={(e) => item.onChange(e.target.value)}
          />
        );
    }
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={handleClose}
      isCentered
      onOverlayClick={handleClose}
      onEsc={handleClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.type}</ModalHeader>
        <ModalBody>
          <Stack spacing={4}>
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
        <ModalFooter>
          <Button
            isLoading={props.submit}
            loadingText="Submitting"
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            isDisabled={props.form.some(
              (item: any) =>
                (item.value === undefined && item.type !== "Avatar") ||
                (item.type === "Avatar" &&
                  item.value === undefined &&
                  item.image === undefined &&
                  !props.picture)
            )}
            onClick={async () => {
              await props.handleSubmit(props.id, props.picture, props.name);
              handleClose();
            }}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ComonModal;
