import {
	Box,
	Heading,
	Image,
	Center,
	Flex,
	Text
  } from "@chakra-ui/react";
  
  interface VideoProps {
	id: string;
	photo: string;
	title: string;
	channel: string;
	view: string;
  }
  
  const VideoCard: React.FC<VideoProps> = (props) => {
	return (
	  <Box mb={5} bg="white" borderRadius="md" boxShadow='lg'>
		<Flex>
		  <Image
			borderTopLeftRadius="md"
			borderBottomLeftRadius="md"
			maxW="200px"
			src="https://bit.ly/naruto-sage"
			alt="naruto"
			objectFit="cover"
		  />
		  <Center>
			<Box ml="23" maxW={200} maxH={175}>
			  <Heading as="h2" size="md">
				{props.title}
			  </Heading>
			  <Text fontSize="sm">{props.channel}</Text>
			  <Text fontSize="sm">{props.view} Views</Text>
			</Box>
		  </Center>
		</Flex>
	  </Box>
	);
  };
  
  export default VideoCard;