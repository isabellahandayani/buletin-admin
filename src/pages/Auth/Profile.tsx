import {
  Flex,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  Spinner,
  useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get, change } from "../../service/UserServices";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>();
  const [current, setCurrent] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchList = async () => {
      let { data } = await get();
      setProfile(data);
    };

    fetchList();
    setLoading(false);
    document.title="Buletin.id | Settings";
  }, []);

  const handleSubmit = async () => {
    let { data } = await change(profile.account_email, current, pass);

    if (data) {
      setCurrent("");
      setPass("");
      toast({
        title: "Success",
        description: "Change Password Success",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        title: "Error",
        description: "Change Password Failed",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return !loading && profile ? (
    <Flex minH={"90vh"} align={"center"} justify={"center"}>
      <Stack
        bg="white"
        spacing={4}
        w={"full"}
        maxW={"md"}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          Edit Profile
        </Heading>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={profile.account_email!!}
            readOnly
            isDisabled
          />
        </FormControl>
        <FormControl id="name">
          <FormLabel>Full Name</FormLabel>
          <Input
            type="text"
            value={profile.account_fullname}
            readOnly
            isDisabled
          />
        </FormControl>
        <FormControl id="number">
          <FormLabel>Phone Number</FormLabel>
          <Input
            type="number"
            value={profile.account_phone_number}
            readOnly
            isDisabled
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Current Password</FormLabel>
          <Input
            placeholder="********"
            _placeholder={{ color: "gray.500" }}
            type="password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>New Password</FormLabel>
          <Input
            placeholder="********"
            _placeholder={{ color: "gray.500" }}
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"red.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "red.500",
            }}
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  ) : (
    <Center mt={300}>
      <Spinner size="xl" />
    </Center>
  );
};

export default Profile;
