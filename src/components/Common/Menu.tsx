import {
  Box,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import { HiDotsVertical } from "react-icons/hi";
import EditModal from "./EditModal";

const ChannelMenu = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
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
          <MenuItem onClick={onOpen}>Edit Channel</MenuItem>
          <MenuItem>Delete Channel</MenuItem>
        </MenuList>
      </Menu>

      <EditModal isOpen={isOpen} onClose={onClose} {...props} />
    </Box>
  );
};

export default ChannelMenu;
