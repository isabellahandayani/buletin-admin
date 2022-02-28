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
import { useState } from "react";
import { create } from "../../service/CategoryServices";

const CreateModal = (props: any) => {
  const [category, setCategory] = useState<string>("");
  const toast = useToast();

  const handleSubmit = async () => {
    let { data } = await create(category, "placeholder");
    if (data) {
      toast({
        title: "Success",
        description: "Category created successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      props.onClose();
    } else {
      toast({
        title: "Error",
        description: "Category creation failed",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
    setCategory("");
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Category</ModalHeader>
        <ModalBody>
          <FormControl id="category" isRequired>
            <FormLabel>Category Name</FormLabel>
            <Input
              placeholder="category-name"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
              isDisabled={!category}
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
