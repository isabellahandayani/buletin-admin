import { Box, useColorModeValue, Flex, Spacer } from "@chakra-ui/react";
import NavItem from "./NavItem";

import {
  MdVideoLibrary,
  MdViewList,
  MdSubscriptions,
  MdLogout,
  MdCategory,
  MdPeople,
  MdSettings,
} from "react-icons/md";
import { LinkItemProps } from "../../types";

const AdminLink: Array<LinkItemProps> = [
  { name: "Content", icon: MdVideoLibrary, url: "video" },
  { name: "Channels", icon: MdSubscriptions, url: "channel" },
  { name: "Settings", icon: MdSettings, url: "settings" },
];

const SuperAdminLink: Array<LinkItemProps> = [
  { name: "Categories", icon: MdCategory, url: "category" },
  { name: "Register Admin", icon: MdPeople, url: "register" },
  { name: "Playlist", icon: MdViewList, url: "playlist" },
  { name: "Settings", icon: MdSettings, url: "settings" },
];

const SidebarContent = (props: any) => {
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
          {props.role === "superadmin"
            ? SuperAdminLink.map((link) => (
                <NavItem key={link.name} icon={link.icon} url={link.url}>
                  {link.name}
                </NavItem>
              ))
            : AdminLink.map((link) => (
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
