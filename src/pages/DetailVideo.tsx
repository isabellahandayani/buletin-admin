import {
  Heading,
  Box,
  Flex,
  Text,
  Avatar,
  AspectRatio,
  Center,
} from "@chakra-ui/react";
import VideoCard from "../components/Video/VideoCardDetail";
import moment from "moment";
import { useParams } from "react-router-dom";
import { get, getList } from "../service/VideoServices";
import { useEffect, useState } from "react";

const DetailVideo = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState<any>();
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    const fetchVideo = async () => {
      let { data } = await get(videoId);
      setVideo(data);
    };

    const fetchList = async () => {
      let { data } = await getList();
      let filteredData = data.filter((item: any) => item.video_id !== videoId);
      setList(filteredData);
    };

    fetchVideo();
    fetchList();
  }, [videoId]);

  return video ? (
    <Box mt={10} ml={20}>
      <Flex>
        <Box w="70%" mr={10}>
          <VideoFrame url={video.video_url} />
          <Heading as="h2" size="lg" mt={4}>
            {video.video_title}
          </Heading>
          <Text size="sm">
            {video.video_view_count} Views |{" "}
            {moment(video.date_posted).format("DD-MM-YYYY")}
          </Text>

          <Flex mt="3%">
            <Avatar src={video.ChannelInfo.channel_picture} />
            <Center ml="3">
              <Text color="blackAlpha.700" fontWeight="bold">
                {video.ChannelInfo.channel_name}
              </Text>
            </Center>
          </Flex>

          <Text mt="3%">{video.video_desc}</Text>
        </Box>

        <Box w={"45%"}>
          <Heading as="h3" size="md" mb="5%">
            Uploaded Videos
          </Heading>
          {list ? (
            list.map((video) => {
              return (
                  <VideoCard key={video.video_id} {...video} />
              );
            })
          ) : (
            <></>
          )}
        </Box>
      </Flex>
    </Box>
  ) : (
    <>Empty</>
  );
};

const VideoFrame: React.FC<any> = ({ url }) => {
  const getCode = (url: string) => {
    return url.split("=")[1];
  };

  return (
    <AspectRatio ratio={16 / 9}>
      <iframe
        height={window.innerHeight - 300}
        src={`https://www.youtube.com/embed/${getCode(url)}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </AspectRatio>
  );
};

export default DetailVideo;
