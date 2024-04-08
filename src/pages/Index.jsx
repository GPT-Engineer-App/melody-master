import React, { useState, useRef } from "react";
import { Box, Button, Flex, Heading, IconButton, Image, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text, VStack } from "@chakra-ui/react";
import { FaPlay, FaPause, FaBackward, FaForward } from "react-icons/fa";

const tracks = [
  {
    title: "Song 1",
    artist: "Artist 1",
    audioSrc: "path/to/audio1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwY292ZXJ8ZW58MHx8fHwxNzEyNTQyMzg2fDA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    title: "Song 2",
    artist: "Artist 2",
    audioSrc: "path/to/audio2.mp3",
    imageSrc: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwYXJ0d29ya3xlbnwwfHx8fDE3MTI1OTMxOTN8MA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  // Add more tracks here
];

const Index = () => {
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const handlePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrev = () => {
    const currentIndex = tracks.findIndex((track) => track === currentTrack);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrack(tracks[prevIndex]);
    setIsPlaying(true);
  };

  const handleNext = () => {
    const currentIndex = tracks.findIndex((track) => track === currentTrack);
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentTrack(tracks[nextIndex]);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (value) => {
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  return (
    <Box maxWidth="400px" mx="auto" mt={8}>
      <VStack spacing={6}>
        <Image src={currentTrack.imageSrc} alt="Album Cover" borderRadius="md" />
        <Heading as="h2" size="lg">
          {currentTrack.title}
        </Heading>
        <Text>{currentTrack.artist}</Text>
        <Slider aria-label="seek-slider" value={currentTime} min={0} max={duration} onChange={handleSeek}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Flex>
          <IconButton aria-label="Previous" icon={<FaBackward />} onClick={handlePrev} mr={4} />
          <IconButton aria-label={isPlaying ? "Pause" : "Play"} icon={isPlaying ? <FaPause /> : <FaPlay />} onClick={handlePlay} size="lg" />
          <IconButton aria-label="Next" icon={<FaForward />} onClick={handleNext} ml={4} />
        </Flex>
      </VStack>
      <audio ref={audioRef} src={currentTrack.audioSrc} onEnded={handleNext} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleTimeUpdate} />
    </Box>
  );
};

export default Index;
