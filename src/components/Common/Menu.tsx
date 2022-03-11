import {
  Box,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Skeleton,
} from "@chakra-ui/react";
import { HiDotsVertical } from "react-icons/hi";
import EditModal from "./EditModal";

const CardMenu = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Skeleton isLoaded={props}>
      <Box mt={25}>
        <Menu direction="rtl">
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HiDotsVertical />}
            variant="link"
            _focus={{ boxShadow: "none" }}
          />
          <MenuList>
            <MenuItem onClick={onOpen}>Edit {props.type}</MenuItem>
            <MenuItem onClick={() => props.handleDelete(props.channel_id)}>
              Delete {props.type}
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <EditModal
        id={props.channel_id}
        form={props.form}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        handleSubmit={props.handleUpdate}
        type={props.type}
      />
    </Skeleton>
  );
};

export default CardMenu;
