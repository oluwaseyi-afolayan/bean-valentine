'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

interface MusicPlayerProps {
  audioUrl: string; // Use direct audio file URL instead of YouTube
}

export interface MusicPlayerRef {
  play: () => void;
}

const MusicPlayer = forwardRef<MusicPlayerRef, MusicPlayerProps>(({ audioUrl }, ref) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set volume
    audio.volume = 0.3;
    audio.loop = true;

    // Handle play state changes
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  // Expose play method to parent
  useImperativeHandle(ref, () => ({
    play: () => {
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.log('Audio play failed:', error);
        });
      }
    },
  }));

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false;
      } else {
        audioRef.current.muted = true;
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={audioUrl} preload="auto" />
      <motion.button
        className="music-toggle"
        onClick={toggleMute}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
      >
        {isMuted ? '🔇' : isPlaying ? '🎵' : '🎵'}
      </motion.button>
    </>
  );
});

MusicPlayer.displayName = 'MusicPlayer';

export default MusicPlayer;