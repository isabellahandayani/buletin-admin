import {
  Center,
  Spinner,
  Heading,
  Grid,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

import AddButton from "../../components/AddButton";
import CreateModal from "../../components/Channel/CreateModal";
import ChannelCard from "../../components/Channel/ChannelCard";
import { getList } from "../../service/ChannelServices";

const ListChannel = () => {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchList = async () => {
      let decoded: any = jwt_decode(localStorage.getItem("token")!!);
      let { data } = await getList(1, 6, decoded.account_id);
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
      <AddButton onOpen={onOpen} />
      <CreateModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </Center>
  );
};

export default ListChannel;
