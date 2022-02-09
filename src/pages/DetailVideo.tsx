import {
  Heading,
  Box,
  Flex,
  Text,
  Avatar,
  AspectRatio,
  useMediaQuery,
} from "@chakra-ui/react";
import VideoCard from "../components/Video/VideoCardDetail";

const dummy = {
  id: "1",
  photo: "https://bit.ly/naruto-sage",
  title: "Naruto Sage Mode",
  channel: "OAWKOAKWo",
  view: "192",
};

interface DetailProps {

	title: string;
	view: string,
	channel: string,
	channel_video: string,
	desc: string;
	date: string
}

const DetailVideo:React.FC<DetailProps> = (props) => {
  const [largeScreen] = useMediaQuery("(min-width: 1280px)");

  return (
    <Box mt={10} ml={20}>
      <Flex direction={largeScreen ? "row" : "column"}>
        <Box w={largeScreen ? "70%" : "100%"} mr={largeScreen ? 10 : 0}>
          <VideoFrame url="https://www.youtube.com/embed/5rAKMVQm5n4" />
          <Heading as="h2" size="lg" mt={4}>
            {props.title}
          </Heading>
          <Text size="sm">
            {props.view} Views | {props.date}
          </Text>

          <Flex mt="3%">
            <Avatar src="https://bit.ly/sage-adebayo" />
            <Box ml="3">
              <Text color="blackAlpha.700" fontWeight="bold">{props.channel}</Text>
              <Text fontSize="sm">{props.channel_video} Videos</Text>
            </Box>
          </Flex>

          <Text mt="3%">
            {props.desc}
          </Text>
        </Box>

        <Box w={largeScreen ? "45%" : "100%"}>
          <Heading as="h3" size="md" mb="5%" mt={largeScreen ? 0 : 10}>
            Uploaded Videos
          </Heading>
          <VideoCard {...dummy} />
          <VideoCard {...dummy} />
          <VideoCard {...dummy} />
          <VideoCard {...dummy} />
          <VideoCard {...dummy} />
          <VideoCard {...dummy} />
          <VideoCard {...dummy} />
          <VideoCard {...dummy} />
        </Box>
      </Flex>
    </Box>
  );
};

const VideoFrame: React.FC<any> = ({ url }) => {
  return (
    <AspectRatio ratio={16 / 9}>
      <iframe
        height={window.innerHeight - 300}
        src={url}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </AspectRatio>
  );
};

export default DetailVideo;
