import {
	Heading,
	Box,
	Flex,
	Text,
	Avatar,
	AspectRatio,
  } from "@chakra-ui/react";
  import VideoCard from "../Components/VideoCard";
  
  const dummy = {
	id: "1",
	photo: "https://bit.ly/naruto-sage",
	title: "Naruto Sage Mode",
	channel: "OAWKOAKWo",
	view: "192",
  };
  
  const DetailVideo = () => {
	return (
	  <Box mt="5%" ml="10%">
		<Flex>
		  <Box w="70%" mr={20}>
			<VideoFrame url="https://www.youtube.com/embed/5rAKMVQm5n4" />
			<Heading as="h2" size="lg" mt="2%">
			  Boleh Percaya Ramalan? Ini Kata Abi Quraish Shihab
			</Heading>
			<Heading as="h3" size="sm" mt="2%">
			  955 Views | 7 Feb 2022
			</Heading>
  
			<Flex mt="3%">
			  <Flex>
				<Avatar src="https://bit.ly/sage-adebayo" />
				<Box ml="3">
				  <Text fontWeight="bold">
					Segun Adebayo
				  </Text>
				  <Text fontSize="sm">12 Videos</Text>
				</Box>
			  </Flex>
			</Flex>
  
			<Text mt="3%">
			  Krisis Ukraina versus Rusia semakin meruncing. Masing-masing pihak
			  dan sekutunya, mulai menyiagakan militernya. Untuk meredakan tensi
			  panas, Presiden Perancis datang ke Moskow bertemu Vladimir Putin.
			  Apa yang diobrolin? Pencegahan perang kah? Yuk, ikuti informasinya,
			  dan simak kabar menarik lainnya di Narasi Pagi.
			</Text>
		  </Box>
  
		  <Box w="45%">
			<Heading as="h3" size="md" mb="5%">
			  Uploaded Videos
			</Heading>
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