import {
  Box,
  Skeleton,
  Spinner,
  Center,
  Heading,
  Grid,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getVideoPlaylist as getVideo } from "../../service/VideoServices";
import { get } from "../../service/PlaylistServices";
import { useParams } from "react-router-dom";
import VideoCard from "../../components/Video/VideoCardDetail";
import AddButton from "../../components/Common/AddButton";
import AddVideo from "../../components/Playlist/AddVideo";

const DetailPlaylist = () => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const { playlistId } = useParams();
  const {isOpen, onOpen, onClose} = useDisclosure();

  useEffect(() => {
    const fetchList = async () => {
      let { data } = await getVideo(playlistId);
      setList(data.videos);
    };

    const fetchPlaylist = async () => {
      let { data } = await get(playlistId);
      setName(data.playlist_name);
    };

    fetchList();
    fetchPlaylist();
    setLoading(false);
  }, [playlistId]);

  return (
    <Box maxW={"95%"} mx="auto">
      <Box bg="white" borderRadius={20} p={4} boxShadow="md" mt={4}>
        <Skeleton borderRadius={10} w="-moz-fit-content" isLoaded={!loading}>
          <Heading as="h2">{name}</Heading>
        </Skeleton>
      </Box>
      {loading ? (
        <Center>
          <Spinner mt={300} size="xl" />
        </Center>
      ) : list && list.length > 0 ? (
        <Grid templateColumns="repeat(2, 1fr)" gap={10} mt={10}>
          {list &&
            list.map((item: any) => (
              <VideoCard key={item.video_id} {...item} type="detail" />
            ))}
        </Grid>
      ) : (
        <Center mt={200}>
          <Heading>No Video Yet</Heading>
        </Center>
      )}
      <AddButton onOpen={onOpen}/>
      <AddVideo isOpen={isOpen} onOpen={onOpen} onClose={onClose} list={list}/>
    </Box>
  );
};

export default DetailPlaylist;
