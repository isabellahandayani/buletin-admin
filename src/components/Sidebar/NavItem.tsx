import { Flex, Icon, Box } from "@chakra-ui/react";

import { Link as LinkRoute } from "react-router-dom";
import { NavItemProps } from "../../types";

const NavItem = ({ icon, children, url }: NavItemProps) => {
  const logout = () => {
    if (url === "logout") {
      localStorage.removeItem("token");
      window.location.reload();
    }
  };

  return (
    <LinkRoute to={url}>
      <Box
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
        onClick={() => logout()}
      >
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "cyan.400",
            color: "white",
          }}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="md"
              _groupHover={{
                color: "white",
              }}
              size="lg"
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    </LinkRoute>
  );
};

export default NavItem;
