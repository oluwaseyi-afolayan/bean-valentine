'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

interface MusicPlayerProps {
  videoId: string;
}

export interface MusicPlayerRef {
  play: () => void;
}

const MusicPlayer = forwardRef<MusicPlayerRef, MusicPlayerProps>(({ videoId }, ref) => {
  const [isMuted, setIsMuted] = useState(false);
  const playerRef = useRef<any>(null);
  const isLoadingRef = useRef(false);
  const isReadyRef = useRef(false);

  useEffect(() => {
    // Prevent loading YouTube API multiple times
    if (isLoadingRef.current) return;
    
    // Check if API is already loaded
    if ((window as any).YT?.Player) {
      initializePlayer();
      return;
    }

    isLoadingRef.current = true;

    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    tag.async = true;
    
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Set up callback
    (window as any).onYouTubeIframeAPIReady = initializePlayer;

    return () => {
      // Cleanup player on unmount
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          // Ignore errors on cleanup
        }
      }
    };
  }, [videoId]);

  const initializePlayer = () => {
    if (playerRef.current) return; // Already initialized

    playerRef.current = new (window as any).YT.Player('youtube-player', {
      height: '0',
      width: '0',
      videoId: videoId,
      playerVars: {
        autoplay: 0, // Don't autoplay - wait for user interaction
        loop: 1,
        playlist: videoId,
        controls: 0,
      },
      events: {
        onReady: (event: any) => {
          event.target.setVolume(30);
          isReadyRef.current = true;
        },
      },
    });
  };

  // Expose play method to parent
  useImperativeHandle(ref, () => ({
    play: () => {
      if (playerRef.current && isReadyRef.current) {
        playerRef.current.playVideo();
      }
    },
  }));

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
        playerRef.current.setVolume(30);
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <div id="youtube-player" className="hidden" />
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
        {isMuted ? '🔇' : '🎵'}
      </motion.button>
    </>
  );
});

MusicPlayer.displayName = 'MusicPlayer';

export default MusicPlayer;