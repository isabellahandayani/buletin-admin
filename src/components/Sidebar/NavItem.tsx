import { Flex, Icon, Box, Skeleton } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

const NavItem = ({ icon, children, url }: any) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const logout = () => {
    if (url === "/") {
      localStorage.removeItem("token");
      navigate("../");
      window.location.reload();
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [])
  

  return (
    <Link to={loading? "#" : url}>
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
            bg: "blue.400",
            color: "white",
          }}
        >
          <Skeleton isLoaded={!loading} w="full">
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
          </Skeleton>
        </Flex>
      </Box>
    </Link>
  );
};

export default NavItem;
