import {
  Grid,
  Center,
  Heading,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  create,
  deleteCategory,
  getList,
  update,
} from "../../service/CategoryServices";
import { useState, useEffect } from "react";
import AddButton from "../../components/Common/AddButton";
import Modal from "../../components/Common/Modal";
import Card from "../../components/Common/Card";
import { ID, DRIVE_URL } from "../../const";
import { upload } from "../../service/GoogleServices";
import { getId } from "../../utils";

const ListCategory = () => {
  const toast = useToast();
  const [submit, setSubmit] = useState(false);
  const [category, setCategory] = useState<any>();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<any>();
  const [preview, setPreview] = useState<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchList = async () => {
    let { data } = await getList();
    setList(data);
    setLoading(false);
  };

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
    setSubmit(true);
    let res: any = await upload(image, ID.CATEGORY);
    let { data } = await create(category, res ? res.id : "placeholder");
    if (data) {
      createToast("Success", "Category Successfully Created");
      fetchList();
    } else {
      createToast("Error", "Category Creation Failed");
    }
    setSubmit(false);
  };

  const handleDelete = async (category_id: any) => {
    let { data } = await deleteCategory(category_id);
    if (data) {
      createToast("Success", "Category Successfully Deleted");
      fetchList();
    } else {
      createToast("Error", "Category Deletion Failed");
    }
  };

  const handleUpdate = async (id: any, picture: any, name: any) => {
    setSubmit(true);
    let res: any;

    if (image) {
      res = await upload(image, ID.CATEGORY);
    }

    let { data } = await update(
      category ? category : name,
      res ? res.id : getId(picture),
      id
    );
    if (data) {
      createToast("Success", "Update Successful");
      fetchList();
    } else {
      createToast("Error", "Update Failed");
    }
    setSubmit(false);
  };

  const form = [
    {
      type: "Avatar",
      value: preview,
      placeholder: "thumbnail",
      image: image,
      onChange: setImage,
      setPreview: setPreview,
    },
    {
      name: "Category Name",
      placeholder: "category-name",
      value: category,
      onChange: setCategory,
    },
  ];

  const menuControl = {
    handleDelete: handleDelete,
    handleUpdate: handleUpdate,
    handleSubmit: handleSubmit,
  };

  useEffect(() => {
    fetchList();
    document.title = "Buletin.id | Category";
  }, []);

  return (
    <Center mt={100}>
      {loading ? (
        <Spinner mt={200} size="xl" />
      ) : list && list.length === 0 ? (
        <Heading as="h2">No Category Yet</Heading>
      ) : (
        <Grid templateColumns="repeat(3, 1fr)" gap={10}>
          {list &&
            list.map((item: any) => (
              <Card
                key={item.category_id}
                id={item.category_id}
                type="Category"
                name={item.category_name}
                picture={`${DRIVE_URL}${item.category_picture}`}
                form={form}
                link="#"
                menuControl={menuControl}
              />
            ))}
        </Grid>
      )}
      <AddButton onOpen={onOpen} />
      <Modal
        type="Category"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        form={form}
        submit={submit}
        {...menuControl}
      />
    </Center>
  );
};

export default ListCategory;
