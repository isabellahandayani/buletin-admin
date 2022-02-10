import { IconType } from "react-icons";
import { ReactText } from "react";

import { Flex, Icon, Link } from "@chakra-ui/react";

import { Link as LinkRoute } from "react-router-dom";

interface NavItemProps {
  icon: IconType;
  children: ReactText;
  url: string;
}
const NavItem = ({ icon, children, url }: NavItemProps) => {
  return (
    <LinkRoute to={url}>
      <Link style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
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
      </Link>
    </LinkRoute>
  );
};

export default NavItem;
