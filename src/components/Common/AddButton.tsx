import { IconButton } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";

const AddButton = (props: any) => {
  return (
    <IconButton
      bg="blue.400"
      borderRadius={90}
      color="white"
      variant="solid"
      aria-label="Md"
      icon={<MdAdd />}
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
      }}
      m={10}
      size="lg"
      onClick={props.onOpen}
      _hover={{
        bg: "blue.500"
      }}
    />
  );
};

export default AddButton;
