import { Box, useColorModeValue, Flex, Spacer } from "@chakra-ui/react";
import NavItem from "./NavItem";

import {
  MdVideoLibrary,
  MdViewList,
  MdSubscriptions,
  MdLogout,
} from "react-icons/md";
import { IconType } from "react-icons";

interface LinkItemProps {
  name: string;
  icon: IconType;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Content", icon: MdVideoLibrary },
  { name: "Playlist", icon: MdViewList },
  { name: "Channels", icon: MdSubscriptions },
];

const SidebarContent = () => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={60}
      pos="fixed"
      h="full"
    >
      <Flex direction="column" height="100%">
        <Box>
          {LinkItems.map((link) => (
            <NavItem key={link.name} icon={link.icon}>
              {link.name}
            </NavItem>
          ))}
        </Box>
        <Spacer />
        <NavItem key="Logout" icon={MdLogout}>
          Logout
        </NavItem>
      </Flex>
    </Box>
  );
};

export default SidebarContent;
