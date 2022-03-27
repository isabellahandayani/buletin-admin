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

import AddButton from "../../components/Common/AddButton";
import Card from "../../components/Common/Card";
import Modal from "../../components/Common/Modal";

import {
  create,
  deleteChannel,
  getList,
  update,
} from "../../service/ChannelServices";
import { DRIVE_URL, ID } from "../../const";
import { upload } from "../../service/GoogleServices";

const ListChannel = () => {
  const toast = useToast();
  const [list, setList] = useState<any[]>([]);
  const [image, setImage] = useState<any>();
  const [preview, setPreview] = useState<any>();
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

  const handleClose = () => {
    onClose();
    setPreview(undefined);
    form.filter((item: any) => item.onChange(""));
  };

  const handleSubmit = async () => {
    let res: any = await upload(image, ID.CHANNEL);
    let decoded: any = jwt_decode(localStorage.getItem("token")!!);

    let { data } = await create(
      decoded.account_id,
      channel,
      res ? res.id : "placeholder"
    );
    if (data) {
      createToast("Success", "Channel Successfully Created");
      fetchList();
    } else {
      createToast("Error", "Channel Creation Failed");
    }
    handleClose();
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
    } else {
      createToast("Error", "Update Failed");
    }
    handleClose();
  };

  const handleDelete = async (channel_id: any) => {
    let { data } = await deleteChannel(channel_id);
    if (data) {
      fetchList();
      createToast("Success", "Delete Successful");
    } else {
      createToast("Error", "Deletion Failed");
    }
    onClose();
  };

  const form = [
    {
      type: "Avatar",
      value: preview,
      image: image,
      onChange: setImage,
      setPreview: setPreview,
    },
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
    handleSubmit: handleSubmit,
    handleClose: handleClose,
  };

  const fetchList = async () => {
    let decoded: any = jwt_decode(localStorage.getItem("token")!!);
    let { data } = await getList(decoded.account_id);
    setList(data.channels);
    setLoading(false);
  };

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    document.title = "Buletin.id | Channel";
  }, []);

  return (
    <Center mt={100}>
      {loading ? (
        <Spinner mt={200} size="xl" />
      ) : list && list.length > 0 ? (
        <Grid templateColumns="repeat(3, 1fr)" gap={10}>
          {list &&
            list.map((item: any) => (
              <Card
                key={item.channel_id}
                id={item.channel_id}
                type="Edit Channel"
                menuControl={menuControl}
                name={item.channel_name}
                picture={`${DRIVE_URL}${item.channel_picture}`}
                created_at={item.created_at}
                link={`/channel/${item.channel_id}`}
                form={form}
              />
            ))}
        </Grid>
      ) : (
        <Heading as="h2">No Channel Yet</Heading>
      )}
      <AddButton onOpen={onOpen} />
      <Modal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        form={form}
        {...menuControl}
        type="Add Channel"
      />
    </Center>
  );
};

export default ListChannel;
