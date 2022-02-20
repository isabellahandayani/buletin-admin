import { Center, Spinner, Heading, Grid } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import PlaylistCard from "../../components/Playlist/PlaylistCard";
import { getList } from "../../service/PlaylistServices";

const ListPlaylist = () => {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchList = async () => {
      let { data } = await getList();
      setList(data.playlists);
      setLoading(false);
    };

    fetchList();
  }, []);

  return (
    <Center mt={100}>
      {loading ? (
        <Spinner mt={300} size="xl" />
      ) : list && list.length === 0 ? (
        <Heading as="h2">No Playlists Yet</Heading>
      ) : (
        <Grid templateColumns="repeat(3, 1fr)" gap={10}>
          {list &&
            list.map((item: any) => (
              <PlaylistCard key={item.playlist_id} {...item} />
            ))}
        </Grid>
      )}
    </Center>
  );
};

export default ListPlaylist;
