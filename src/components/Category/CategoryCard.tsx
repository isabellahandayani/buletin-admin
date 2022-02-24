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
} from "@chakra-ui/react";
import { useState } from "react";

import { MdMode, MdCheck, MdClose } from "react-icons/md";
import { update } from "../../service/CategoryServices";

const CategoryCard = (props: any) => {
  const name = props.category_name;
  const [current, setCurrent] = useState(props.category_name);

  const handleSubmit = async () => {
    await update(name, "placeholder", props.category_id)
  }


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
          onClick={handleSubmit}
          isDisabled={name === "" || name === current}
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
            isPreviewFocusable={false}
          >
            <EditablePreview as="h2" />
            <EditableInput onChange={(e) => setCurrent(e.target.value)}/>
            <Control />
          </Editable>
        </Center>
      </Box>
    </Skeleton>
  );
};

export default CategoryCard;
