import { IconType } from "react-icons";
import { ReactText } from "react";

import { Flex, Icon, Link } from "@chakra-ui/react";

interface NavItemProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children }: NavItemProps) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
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
    </Link>
  );
};

export default NavItem;