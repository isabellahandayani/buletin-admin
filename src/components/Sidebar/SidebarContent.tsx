import {
  Box,
  useColorModeValue,
  Flex,
  Spacer,
  Spinner,
  Center
} from "@chakra-ui/react";
import NavItem from "./NavItem";

import {
  MdViewList,
  MdSubscriptions,
  MdLogout,
  MdCategory,
  MdPeople,
  MdSettings,
} from "react-icons/md";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const AdminLink: any = [
  { name: "Channels", icon: MdSubscriptions, url: "channel" },
  { name: "Settings", icon: MdSettings, url: "settings" },
];

const SuperAdminLink: any = [
  { name: "Categories", icon: MdCategory, url: "category" },
  { name: "Playlist", icon: MdViewList, url: "playlist" },
  { name: "Register Admin", icon: MdPeople, url: "register" },
  { name: "Settings", icon: MdSettings, url: "settings" },
];

const SidebarContent = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      let data: any = jwt_decode(localStorage.getItem("token")!);
      setRole(data.role);
    }
  }, []);

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
          
          {role ? (
            role === "superadmin" ? (
              SuperAdminLink.map((link : any) => (
                <NavItem key={link.name} icon={link.icon} url={link.url}>
                  {link.name}
                </NavItem>
              ))
            ) : (
              AdminLink.map((link : any) => (
                <NavItem key={link.name} icon={link.icon} url={link.url}>
                  {link.name}
                </NavItem>
              ))
            )
          ) : (
            <Center>
            <Spinner />
            </Center>
          )}
        </Box>
        <Spacer />
        <NavItem key="Logout" icon={MdLogout} url="/">
          Logout
        </NavItem>
      </Flex>
    </Box>
  );
};

export default SidebarContent;
