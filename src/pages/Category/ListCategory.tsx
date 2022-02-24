import { Grid, Center, Heading, Spinner } from "@chakra-ui/react";
import CategoryCard from "../../components/Category/CategoryCard";
import { getList } from "../../service/CategoryServices";
import { useState, useEffect } from "react";

const ListCategory = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchList = async () => {
      let { data } = await getList();
      setList(data);
      setLoading(false);
    };

    fetchList();
  }, []);

  return (
    <Center mt={100}>
      {loading ? (
        <Spinner mt={300} size="xl" />
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
  );
};

export default ListCategory;
