import { Center, Spinner, Heading, Grid } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ChannelCard from "../../components/Channel/ChannelCard";
import { getList } from "../../service/ChannelServices";

const ListChannel = () => {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchList = async () => {
      let { data } = await getList(1, 6);
      setList(data.channels);
      setLoading(false);
    };

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
            list.map((item: any) => <ChannelCard key={item.id} {...item} />)}
        </Grid>
      )}
    </Center>
  );
};

export default ListChannel;
