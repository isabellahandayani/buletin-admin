import {
  Heading,
  Box,
  Flex,
  Text,
  Avatar,
  AspectRatio,
  Center,
  Spinner,
} from "@chakra-ui/react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { get } from "../../service/VideoServices";
import { useEffect, useState } from "react";

const DetailVideo = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState<any>();

  useEffect(() => {
    const fetchVideo = async () => {
      let { data } = await get(videoId);
      setVideo(data);
    };

    fetchVideo();
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
      </Flex>
    </Box>
  ) : (
    <Center mt={300}>
      <Spinner size="xl" />
    </Center>
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
