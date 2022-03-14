import {
  Center,
  Spinner,
  Heading,
  Grid,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  create,
  getList,
  update,
  deleteList,
} from "../../service/PlaylistServices";
import { getList as getCategory } from "../../service/CategoryServices";
import Card from "../../components/Common/Card";
import AddButton from "../../components/Common/AddButton";
import CreateModal from "../../components/Common/CreateModal";

const ListPlaylist = () => {
  const toast = useToast();
  const [name, setName] = useState("");
  const [current, setCurrent] = useState("");
  const [list, setList] = useState<any[]>([]);
  const [category, setCategory] = useState<any[]>([]);
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

  const fetchList = async () => {
    let { data } = await getList();
    if(data.playlists) {
      setList(data.playlists);
    } else {
      setList([]);
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      let { data } = await getCategory();
      setCategory(data);
      setLoading(false);
    };

    fetchList();
    fetchCategory();
  }, []);

  const handleUpdate = async (playlist_id: any) => {
    let { data } = await update(playlist_id, name, current);

    if (data) {
      createToast("Success", "Playlist updated successfully");
      fetchList();
      onClose();
      setCurrent("");
      setName("");
    } else {
      createToast("Error", "Playlist not updated");
    }
  };

  const handleSubmit = async () => {
    let { data } = await create(current, name);
    if (data) {
      createToast("Success", "Playlist has been created");
      fetchList();
      onClose();
      setCurrent("");
      setName("");
    } else {
      createToast("Error", "Create playlist failed");
    }
  };

  const handleDelete = async (playlist_id: any) => {
    let { data } = await deleteList(playlist_id);

    if (data) {
      createToast("Success", "Playlist has been deleted");
      fetchList();
    } else {
      createToast("Error", "Delete playlist failed");
    }
  };

  const menuControl = {
    handleUpdate: handleUpdate,
    handleSubmit: handleSubmit,
    handleDelete: handleDelete,
  };

  const form = [
    {
      name: "Playlist Name",
      placeholder: "playlist-name",
      value: name,
      onChange: setName,
    },
    {
      name: "Category",
      onChange: setCurrent,
      value: current,
      selection: category,
    },
  ];

  const getName = (id: number) => {
    return category.filter((item: any) => item.category_id === id)[0]
      .category_name;
  };

  return (
    <Center mt={100}>
      {loading ? (
        <Spinner mt={200} size="xl" />
      ) : category && list && list.length === 0 ? (
        <Heading mt={200} as="h2">No Playlists Yet</Heading>
      ) : (
        <Grid templateColumns="repeat(3, 1fr)" gap={10}>
          {category && list &&
            list.map((item: any) => (
              <Card
                key={item.playlist_id}
                id={item.playlist_id}
                type="Playlist"
                menuControl={menuControl}
                name={item.playlist_name}
                category={getName(item.category_id)}
                picture={item.playlist_picture}
                link={`/playlist/${item.playlist_id}`}
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
        menuControl={menuControl}
        type="Playlist"
      />
    </Center>
  );
};

export default ListPlaylist;
