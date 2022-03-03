import {
  Box,
  Center,
  Image,
  Editable,
  EditableInput,
  EditablePreview,
  ButtonGroup,
  Flex,
  IconButton,
  useEditableControls,
  Skeleton,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

import { MdMode, MdCheck, MdClose, MdDelete } from "react-icons/md";
import { deleteCategory, update } from "../../service/CategoryServices";

const CategoryCard = (props: any) => {
  const name = props.category_name;
  const toast = useToast();
  const [current, setCurrent] = useState(props.category_name);

  const handleSubmit = async () => {
    await update(current, "placeholder", props.category_id);
    props.fetchList();
    setCurrent("");
  };

  const handleDelete = async () => {
    let { data } = await deleteCategory(props.category_id);

    if (data) {
      toast({
        title: "Success",
        description: "Category deleted successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      props.fetchList()
    } else {
      toast({
        title: "Error",
        description: "Category deletion failed",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const Control = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          variant="solid"
          aria-label="Md"
          icon={<MdCheck />}
          isDisabled={name === "" || name === current}
          {...getSubmitButtonProps}
          onClick={handleSubmit}
        />
        <IconButton
          variant="solid"
          aria-label="Md"
          icon={<MdClose />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          variant="solid"
          aria-label="Md"
          size="sm"
          icon={<MdMode />}
          {...getEditButtonProps()}
        />
        <IconButton
          onClick={handleDelete}
          size="sm"
          ml={2}
          aria-label="delete"
          icon={<MdDelete />}
        />
      </Flex>
    );
  };

  return (
    <Skeleton isLoaded={props}>
      <Box
        w={300}
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "lg",
        }}
        bg="white"
        boxShadow={"2xl"}
        rounded={"md"}
        cursor="pointer"
      >
        <Image
          h={"120px"}
          w={"full"}
          fallbackSrc="https://cdn.dribbble.com/users/17914/screenshots/4902225/video-placeholder.png"
          objectFit={"cover"}
        />

        <Center p={30}>
          <Editable
            textAlign="center"
            defaultValue={props.category_name}
            fontSize="2xl"
          >
            <EditablePreview as="h2" />
            <EditableInput onChange={(e) => setCurrent(e.target.value)} />
            <Control />
          </Editable>
        </Center>
      </Box>
    </Skeleton>
  );
};

export default CategoryCard;
