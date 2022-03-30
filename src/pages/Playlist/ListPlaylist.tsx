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
import Modal from "../../components/Common/Modal";
import { upload } from "../../service/GoogleServices";
import { DRIVE_URL, ID } from "../../const";

const ListPlaylist = () => {
  const toast = useToast();
  const [name, setName] = useState("");
  const [current, setCurrent] = useState("");
  const [list, setList] = useState<any[]>([]);
  const [category, setCategory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<any>();
  const [preview, setPreview] = useState<any>();
  const [submit, setSubmit] = useState(false);
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
    if (data.playlists) {
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
    document.title = "Buletin.id | Playlist";
  }, []);

  const handleUpdate = async (id: any, picture: any, pName: any) => {
    let res: any;

    setSubmit(true);
    if (image) {
      res = await upload(image, ID.CATEGORY);
    }
    let { data } = await update(
      id,
      name ? name : pName,
      current,
      res ? res.id : picture
    );

    if (data) {
      createToast("Success", "Playlist updated successfully");
      fetchList();
    } else {
      createToast("Error", "Playlist not updated");
    }
    
    setSubmit(false);
  };

  const handleSubmit = async () => {
    setSubmit(true);
    let res: any = await upload(image, ID.PLAYLIST);
    let { data } = await create(current, name, res ? res.id : "placeholder");

    if (data) {
      createToast("Success", "Playlist has been created");
      fetchList();
    } else {
      createToast("Error", "Create playlist failed");
    }
    setSubmit(false);
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
      type: "Avatar",
      value: preview,
      placeholder: "playlist-thumbnail",
      image: image,
      onChange: setImage,
      setPreview: setPreview,
    },
    {
      name: "Playlist Name",
      type: "Input",
      placeholder: "playlist-name",
      value: name,
      onChange: setName,
    },
    {
      name: "Category",
      type: "Select",
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
        <Heading mt={200} as="h2">
          No Playlists Yet
        </Heading>
      ) : (
        <Grid templateColumns="repeat(3, 1fr)" gap={10}>
          {category &&
            list &&
            list.map((item: any) => (
              <Card
                key={item.playlist_id}
                id={item.playlist_id}
                type="Playlist"
                menuControl={menuControl}
                name={item.playlist_name}
                category={getName(item.category_id)}
                picture={`${DRIVE_URL}${item.playlist_picture}`}
                link={`/playlist/${item.playlist_id}`}
                form={form}
                submit={submit}
              />
            ))}
        </Grid>
      )}
      <AddButton onOpen={onOpen} type="Playlist" />
      <Modal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        form={form}
        {...menuControl}
        type="Playlist"
        submit={submit}
      />
    </Center>
  );
};

export default ListPlaylist;
