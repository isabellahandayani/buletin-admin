import { Skeleton, AspectRatio } from "@chakra-ui/react";
import { getCode } from "../../utils";

const VideoFrame = (props: any) => {
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

export default VideoFrame;