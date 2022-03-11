import {
  Center,
  Spinner,
  Heading,
  Grid,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

import AddButton from "../../components/AddButton";
import Card from "../../components/Common/Card";
import CreateModal from "../../components/Common/CreateModal";

import {
  create,
  deleteChannel,
  getList,
  update,
} from "../../service/ChannelServices";

const ListChannel = () => {
  const toast = useToast();
  const [list, setList] = useState<any[]>([]);
  const [channel, setChannel] = useState("");
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const createToast = (status: string, message: string) => {
    toast({
      title: status,
      description: message,
      status: status === "Error" ? "error" : "success",
      duration: 9000,
      isClosable: true,
      position: "top",
    });
  };

  const handleSubmit = async () => {
    let decoded: any = jwt_decode(localStorage.getItem("token")!!);

    let { data } = await create(decoded.account_id, channel, "placeholder");
    if (data) {
      createToast("Success", "Channel Successfully Created");
      fetchList();
      onClose();
      setChannel("");
    } else {
      createToast("Error", "Channel Creation Failed");
    }
  };

  const handleUpdate = async (channel_id: any) => {
    let decoded: any = jwt_decode(localStorage.getItem("token")!!);
    let { data } = await update(
      decoded.account_id,
      channel,
      "placeholder",
      channel_id
    );

    if (data) {
      createToast("Success", "Update Successful");
      fetchList();
      setChannel("");
    } else {
      createToast("Error", "Update Failed");
    }
  };

  const handleDelete = async (channel_id: any) => {
    let { data } = await deleteChannel(channel_id);
    if (data) {
      fetchList();
      createToast("Success", "Delete Successful");
    } else {
      createToast("Error", "Deletion Failed");
    }
  };

  const form = [
    {
      name: "Channel Name",
      placeholder: "channel-name",
      onChange: setChannel,
      value: channel,
    },
  ];

  const menuControl = {
    handleDelete: handleDelete,
    handleUpdate: handleUpdate,
  };

  const fetchList = async () => {
    let decoded: any = jwt_decode(localStorage.getItem("token")!!);
    let { data } = await getList(1, 6, decoded.account_id);
    setList(data.channels);
    setLoading(false);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <Center mt={100}>
      {loading ? (
        <Spinner mt={200} size="xl" />
      ) : list && list.length === 0 ? (
        <Heading as="h2">No Channel Yet</Heading>
      ) : (
        <Grid templateColumns="repeat(3, 1fr)" gap={10}>
          {list &&
            list.map((item: any) => (
              <Card
                key={item.channel_id}
                {...item}
                type="Channel"
                menuControl={menuControl}
                handleUpdate={handleUpdate}
                form={form}
              />
            ))}
        </Grid>
      )}
      <AddButton onOpen={onOpen} />
      <CreateModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        form={form}
        handleSubmit={handleSubmit}
        type="Channel"
      />
    </Center>
  );
};

export default ListChannel;
