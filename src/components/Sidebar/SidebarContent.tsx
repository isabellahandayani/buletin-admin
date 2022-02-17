import { Box, useColorModeValue, Flex, Spacer } from "@chakra-ui/react";
import NavItem from "./NavItem";

import {
  MdVideoLibrary,
  MdViewList,
  MdSubscriptions,
  MdLogout,
  MdCategory,
  MdPeople,
} from "react-icons/md";
import { LinkItemProps } from "../../types";

const LinkItems: Array<LinkItemProps> = [
  { name: "Content", icon: MdVideoLibrary, url: "video" },
  { name: "Playlist", icon: MdViewList, url: "playlist" },
  { name: "Channels", icon: MdSubscriptions, url: "channel" },
  { name: "Categories", icon: MdCategory, url: "category" },
  { name: "Register Admin", icon: MdPeople, url: "register" },
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
            <NavItem key={link.name} icon={link.icon} url={link.url}>
              {link.name}
            </NavItem>
          ))}
        </Box>
        <Spacer />
        <NavItem key="Logout" icon={MdLogout} url="logout">
          Logout
        </NavItem>
      </Flex>
    </Box>
  );
};

export default SidebarContent;
