


import { Play } from "lucide-react";
import { useRef, useState } from "react";

const VideoPlayer = ({ lesson }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!lesson || !lesson.contentUrl) {
    return (
      <div className="bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="h-8 w-8 ml-1" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Select a lesson</h3>
          <p className="text-gray-300">Choose a lesson from the curriculum to start learning</p>
        </div>
      </div>
    );
  }

  const handlePlay = () => {
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className="bg-black rounded-lg overflow-hidden aspect-video relative">
      <video
        ref={videoRef}
        src={lesson.contentUrl}
        controls
        className="w-full h-full"
      />
      {!isPlaying && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/50"
        >
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <Play className="h-8 w-8 text-white ml-1" />
          </div>
        </button>
      )}
    </div>
  );
};

export default VideoPlayer;
