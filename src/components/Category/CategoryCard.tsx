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
} from "@chakra-ui/react";

import { MdMode, MdCheck, MdClose } from "react-icons/md";

const CategoryCard = () => {
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
          {...getSubmitButtonProps()}
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
      </Flex>
    );
  }

  return (
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
          defaultValue="Entertainment"
          fontSize="2xl"
          isPreviewFocusable={false}
        >
          <EditablePreview fontFamily={"ubuntu"}/>
          <EditableInput />
          <Control />
        </Editable>
      </Center>
    </Box>
  );
};

export default CategoryCard;
