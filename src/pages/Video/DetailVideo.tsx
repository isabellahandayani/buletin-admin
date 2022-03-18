import {
  Heading,
  Box,
  Flex,
  Text,
  Avatar,
  Center,
  Spinner,
} from "@chakra-ui/react";
import moment from "moment";
import { useParams } from "react-router-dom";
import {
  get,
  getVideoAdmin as getVideo,
  getAll,
} from "../../service/VideoServices";
import { useEffect, useState } from "react";
import VideoCard from "../../components/Video/VideoCardDetail";
import jwtDecode from "jwt-decode";
import VideoFrame from "../../components/Video/VideoFrame";

const DetailVideo = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState<any>();
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      let { data } = await get(videoId);
      document.title = `Buletin.id | ${data.video_title}`      
      setVideo(data);
    };

    const fetchList = async () => {
      let decoded: any = jwtDecode(localStorage.getItem("token")!!);
      let { data } =
        decoded.role === "admin"
          ? await getVideo(decoded.account_id)
          : await getAll();

      let filteredData = data.videos.filter(
        (item: any) => parseInt(item.video_id) !== parseInt(videoId!!)
      );
      setList(filteredData.splice(0, 5));
    };

    fetchVideo();
    fetchList();
    setLoading(false);
  }, [videoId, loading]);

  const handleChange = () => {
    setLoading(true);
    setVideo(null);
    setList([]);
  };

  return video && !loading ? (
    <Box mt={10} ml={20}>
      <Flex>
        <Box w="70%" mr={10}>
          <VideoFrame url={video.video_url} />
          <Heading as="h2" size="lg" mt={4}>
            {video.video_title}
          </Heading>
          <Text size="sm">
            {video.video_view_count} Views |{" "}
            {moment(video.date_posted).format("D MMM YYYY")}
          </Text>

          <Flex mt="3%">
            <Avatar
              src={video.channel_info.channel_picture}
              name={video.channel_info.channel_name}
            />
            <Center ml="3">
              <Text color="blackAlpha.700" fontWeight="bold">
                {video.channel_info.channel_name}
              </Text>
            </Center>
          </Flex>

          <Text mt="3%">{video.video_desc}</Text>
        </Box>
        <Box w={"45%"}>
          <Heading as="h3" size="md" mb="5%">
            Uploaded Videos
          </Heading>
          {list &&
            list.map((video) => {
              return (
                <VideoCard
                  key={video.video_id}
                  {...video}
                  handleChange={handleChange}
                />
              );
            })}
          {list && list.length === 0 && (
            <Center>
              <Text>Upload more videos</Text>
            </Center>
          )}
        </Box>
      </Flex>
    </Box>
  ) : (
    <Center mt={300}>
      <Spinner size="xl" />
    </Center>
  );
};

export default DetailVideo;
