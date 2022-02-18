import { Grid, Center } from "@chakra-ui/react";
import CategoryCard from "../../components/Category/CategoryCard";

const ListCategory = () => {
  return (
    <Center mt={100}>
      <Grid templateColumns="repeat(3, 1fr)" gap={10}>
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </Grid>
    </Center>
  );
};

export default ListCategory;
