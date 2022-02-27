import { Grid, Center, Heading, Spinner, useDisclosure } from "@chakra-ui/react";
import { getList } from "../../service/CategoryServices";
import { useState, useEffect } from "react";
import AddButton from "../../components/AddButton";
import CreateModal from "../../components/Category/CreateModal";
import CategoryCard from "../../components/Category/CategoryCard";

const ListCategory = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();


  useEffect(() => {
    const fetchList = async () => {
      let { data } = await getList();
      setList(data);
      setLoading(false);
    };

    fetchList();
  }, []);

  return (
    <>
      <Center mt={100}>
        {loading ? (
          <Spinner mt={200} size="xl" />
        ) : list && list.length === 0 ? (
          <Heading as="h2">No Category Yet</Heading>
        ) : (
          <Grid templateColumns="repeat(3, 1fr)" gap={10}>
            {list &&
              list.map((item: any) => (
                <CategoryCard key={item.category_id} {...item} />
              ))}
          </Grid>
        )}
      </Center>
      <AddButton onOpen={onOpen} />
      <CreateModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
};

export default ListCategory;
