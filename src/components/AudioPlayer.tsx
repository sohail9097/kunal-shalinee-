import React, { useState, useEffect, RefObject } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  audioRef: RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioRef,
  isPlaying,
  onTogglePlay,
}) => {
  const [isMuted, setIsMuted] = useState(false);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlaying || audio.paused) {
      // If audio isn't playing yet, start it and unmute
      audio.muted = false;
      setIsMuted(false);
      onTogglePlay();
    } else {
      // Toggle mute / unmute
      if (isMuted || audio.muted) {
        audio.muted = false;
        setIsMuted(false);
      } else {
        audio.muted = true;
        setIsMuted(true);
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      setIsMuted(audioRef.current.muted);
    }
  }, [audioRef]);

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center">
      {/* Clean, minimal circular volume icon for mute/unmute only */}
      <button
        type="button"
        onClick={toggleSound}
        aria-label={isMuted ? "Unmute music" : "Mute music"}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c9a227]/50 bg-[#4d0d16]/85 text-[#e7c86b] shadow-md backdrop-blur-md transition-all hover:scale-105 hover:border-[#e7c86b] hover:bg-[#4d0d16] active:scale-95"
      >
        {isMuted ? (
          <VolumeX className="h-4 w-4 text-[#e7c86b]/75" />
        ) : (
          <Volume2 className="h-4 w-4 text-[#e7c86b]" />
        )}
      </button>
    </div>
  );
};
