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
import { deleteList } from "../../service/PlaylistServices";
import EditModal from "./EditModal";

const PlaylistMenu = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async (id: number) => {
    return await deleteList(id);
  };

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
          <MenuItem onClick={onOpen}>Edit Playlist</MenuItem>
          <MenuItem onClick={() => handleDelete(props.playlist_id)}>Delete Playlist</MenuItem>
        </MenuList>
      </Menu>
      <EditModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} {...props} />
    </Box>
  );
};

export default PlaylistMenu;
