import {
  Box,
  Skeleton,
  Spinner,
  Center,
  Heading,
  Grid,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getVideoPlaylist as getVideo } from "../../service/VideoServices";
import { deleteVideo, get } from "../../service/PlaylistServices";
import VideoCard from "../../components/Video/VideoCardDetail";
import AddButton from "../../components/Common/AddButton";
import AddVideo from "../../components/Playlist/AddVideo";

const DetailPlaylist = () => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const { playlistId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const fetchList = async () => {
    let { data } = await getVideo(playlistId);
    setList(data.videos);
  };

  const handleDelete = async (e: React.MouseEvent<HTMLElement>, video_id: any) => {
    e.stopPropagation();
    
    let res = await deleteVideo(video_id, playlistId);

    if(res.data) {
      toast({
        title: "Success",
        description: res.data,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      fetchList();
    } else {
      toast({
        title: "Error",
        description: res.error,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  }

  useEffect(() => {
    const fetchPlaylist = async () => {
      let { data } = await get(playlistId);
      setName(data.playlist_name);
      document.title = `Buletin.id | ${data.playlist_name}`;
    };

    fetchList();
    fetchPlaylist();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistId]);

  return (
    <Box maxW={"95%"} mx="auto">
      <Box bg="white" borderRadius={20} p={4} boxShadow="md" mt={4}>
        <Skeleton
          borderRadius={10}
          w="-moz-fit-content"
          isLoaded={!loading && name.length > 0}
          fadeDuration={2}
        >
          <Heading as="h2">{name ? name : "==========.=========="}</Heading>
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
              <VideoCard key={item.video_id} {...item} type="detail" handleDelete={handleDelete} />
            ))}
        </Grid>
      ) : (
        <Center mt={200}>
          <Heading>No Video Yet</Heading>
        </Center>
      )}
      <AddButton onOpen={onOpen} />
      <AddVideo
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        fetchList={fetchList}
        playlistId={playlistId}
      />
    </Box>
  );
};

export default DetailPlaylist;
