import { Center, Spinner, Heading, Grid } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import PlaylistCard from "../../components/Playlist/PlaylistCard";
import { getList } from "../../service/PlaylistServices";
import { getList as getCategory } from "../../service/CategoryServices";

const ListPlaylist = () => {
  const [list, setList] = useState<any[]>([]);
  const [category, setCategory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchList = async () => {
      let { data } = await getList();
      setList(data.playlists);
    };

    const fetchCategory = async () => {
      let { data } = await getCategory();
      setCategory(data);
      setLoading(false);
    };
    fetchList();
    fetchCategory()
  }, []);

  return (
    <Center mt={100}>
      {loading ? (
        <Spinner mt={200} size="xl" />
      ) : category && list.length === 0 ? (
        <Heading as="h2">No Playlists Yet</Heading>
      ) : (
        <Grid templateColumns="repeat(3, 1fr)" gap={10}>
          {category &&
            list.map((item: any) => (
              <PlaylistCard key={item.playlist_id} {...item} name={category[item.category_id - 1].category_name} categories={category} />
            ))}
        </Grid>
      )}
    </Center>
  );
};

export default ListPlaylist;
