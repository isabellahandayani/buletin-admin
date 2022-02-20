import { ReactNode } from "react";
import {
  Box,
  useColorModeValue,
  Drawer,
  useDisclosure,
} from "@chakra-ui/react";
import SidebarContent from "./SidebarContent";

const Sidebar = ({ children, role }: { children: ReactNode; role: any }) => {
  const { isOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      {role && <SidebarContent {...role} />}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        size="full"
        children={undefined}
      ></Drawer>
      <Box ml={60} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
