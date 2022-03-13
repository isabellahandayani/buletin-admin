import {
  Heading,
  Box,
  Flex,
  Text,
  Avatar,
  AspectRatio,
  Center,
  Spinner,
  Skeleton,
} from "@chakra-ui/react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { get, getAll } from "../../service/VideoServices";
import { useEffect, useState } from "react";
import VideoCard from "../../components/Video/VideoCardDetail";

const DetailVideo = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState<any>();
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      let { data } = await get(videoId);
      setVideo(data);
    };

    const fetchList = async () => {
      let { data } = await getAll();
      var filteredData = data["videos"].filter(
        (item: any) => item.video_id !== videoId
      );
      setList(filteredData.slice(0, 5));
    };

    fetchVideo();
    fetchList();
    setLoading(false);
  }, [videoId, loading]);

  const handleChange = () => {
    setLoading(true);
    setVideo(null);
    setList([]);
  }

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
              return <VideoCard key={video.video_id} {...video} handleChange={handleChange} />;
            })}
        </Box>
      </Flex>
    </Box>
  ) : (
    <Center mt={300}>
      <Spinner size="xl" />
    </Center>
  );
};

const VideoFrame = (props: any) => {
  const getCode = (url: string) => {
    return url.split("=")[1];
  };

  return (
    <Skeleton isLoaded>
      <AspectRatio ratio={16 / 9}>
        <iframe
          height={window.innerHeight - 300}
          src={`https://www.youtube.com/embed/${getCode(props.url)}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </AspectRatio>
    </Skeleton>
  );
};

export default DetailVideo;
