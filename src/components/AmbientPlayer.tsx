
import { useState, useRef, useEffect } from 'react';
import { Volume2, Play, Pause } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';

// Forest ambience is the only track we'll use
const FOREST_AMBIENCE = "/forest_ambience.mp3";

export default function AmbientPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio(FOREST_AMBIENCE);
    audioRef.current.loop = true;
    audioRef.current.volume = volume / 100;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Toggle play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center space-x-4 bg-white/5 rounded-full py-2 px-4 backdrop-blur-lg"
    >
      <button 
        onClick={togglePlay}
        className="text-cosmic-teal hover:text-cosmic-teal/80 transition-colors"
        aria-label={isPlaying ? "Pause forest ambience" : "Play forest ambience"}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
      
      <div className="flex items-center gap-2">
        <Volume2 size={16} className="text-white/70" />
        <div className="w-20">
          <Slider
            value={[volume]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => setVolume(value[0])}
            className="cursor-pointer"
          />
        </div>
      </div>
      
      <div className="text-sm text-white/80">
        Forest Ambience
      </div>
    </motion.div>
  );
}
