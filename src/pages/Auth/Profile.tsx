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
  useToast,
  IconButton,
  InputGroup,
  InputRightElement
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { get, change } from "../../service/UserServices";

const Profile = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>();
  const [submit, setSubmit] = useState(false);
  const [current, setCurrent] = useState("");
  const [pass, setPass] = useState("");
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
    setSubmit(true);
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
    setSubmit(false);
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
          <InputGroup size="md">
            <Input
              placeholder="********"
              _placeholder={{ color: "gray.500" }}
              type={showCurrent ? "text" : "password"}
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                size="md"
                aria-label="show-password"
                icon={showCurrent ? <BiHide /> : <BiShow />}
                onClick={() => setShowCurrent(!showCurrent)}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="password">
          <FormLabel>New Password</FormLabel>
          <InputGroup size="md">
            <Input
              placeholder="********"
              _placeholder={{ color: "gray.500" }}
              type={showNew ? "text" : "password"}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                size="md"
                aria-label="show-password"
                icon={showNew ? <BiHide /> : <BiShow />}
                onClick={() => setShowNew(!showNew)}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Stack>
          <Button
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            onClick={handleSubmit}
            isDisabled={!current || !pass}
            isLoading={submit}
            loadingText={"Submiting"}
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
