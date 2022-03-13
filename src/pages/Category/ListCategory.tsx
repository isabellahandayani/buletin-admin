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
import CreateModal from "../../components/Common/CreateModal";
import Card from "../../components/Common/Card";

const ListCategory = () => {
  const toast = useToast();
  const [category, setCategory] = useState("");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
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
    let { data } = await create(category, "placeholder");
    if (data) {
      createToast("Success", "Category Successfully Created");
      onClose();
      fetchList();
    } else {
      createToast("Error", "Category Creation Failed");
    }
    setCategory("");
  };

  const handleDelete = async (category_id: any) => {
    let { data } = await deleteCategory(category_id);
    if (data) {
      createToast("Success", "Category Successfully Deleted");
      onClose();
      fetchList();
    } else {
      createToast("Error", "Category Deletion Failed");
    }
  };

  const handleUpdate = async (category_id: any) => {
    let { data } = await update(category, "placeholder", category_id);
    if (data) {
      createToast("Success", "Update Successful");
      onClose();
      fetchList();
    } else {
      createToast("Error", "Update Failed");
    }
    setCategory("");
  };

  const form = [
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
                  picture={item.category_picture}
                  form={form}
                  link="#"
                  menuControl={menuControl}
                />
              ))}
          </Grid>
        )}
      <AddButton onOpen={onOpen} />
      <CreateModal
        type="Category"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        form={form}
        menuControl={menuControl}
      />
      </Center>
  );
};

export default ListCategory;
