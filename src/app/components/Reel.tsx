import React, { useRef, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Heart, MessageCircle, Share2, MoreHorizontal, Play, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './ui/utils';

export interface ReelData {
  id: string;
  videoUrl: string;
  posterUrl: string;
  username: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  songName?: string;
}

interface ReelProps {
  data: ReelData;
  isActive: boolean;
}

export const Reel = ({ data, isActive }: ReelProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);

  // Play/Pause when active state changes
  useEffect(() => {
    if (isActive) {
      videoRef.current?.play().catch(e => console.log("Autoplay prevented", e));
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleDoubleTap = () => {
    if (!liked) {
      setLiked(true);
    }
    setShowHeartAnimation(true);
    setTimeout(() => setShowHeartAnimation(false), 1000);
  };

  return (
    <div className="relative w-full h-full bg-black snap-start shrink-0 flex items-center justify-center overflow-hidden">
      {/* Video */}
      <video
        ref={videoRef}
        src={data.videoUrl}
        poster={data.posterUrl}
        className="w-full h-full object-cover"
        loop
        playsInline
        muted={isMuted}
        onClick={togglePlay}
        onDoubleClick={handleDoubleTap}
      />

      {/* Play/Pause Overlay Indicator */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20">
          <Play className="w-16 h-16 text-white/80 fill-white/80" />
        </div>
      )}

      {/* Double Tap Heart Animation */}
      <AnimatePresence>
        {showHeartAnimation && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 1, rotate: [0, -10, 10, 0] }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Heart className="w-24 h-24 text-red-500 fill-red-500" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 p-2 bg-black/40 rounded-full text-white backdrop-blur-sm z-20 hover:bg-black/60 transition-colors"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* Bottom Gradient for Text Legibility */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pb-20 md:pb-4 flex flex-col justify-end z-10">
        <div className="flex flex-row items-end justify-between">
          
          {/* Left Side: Info */}
          <div className="flex-1 pr-12 text-white">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gray-600 rounded-full overflow-hidden border border-white/50">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${data.username}`} alt="avatar" />
              </div>
              <span className="font-semibold text-sm hover:underline cursor-pointer">
                @{data.username}
              </span>
              <button className="px-2 py-0.5 border border-white/40 rounded-md text-xs font-medium hover:bg-white/10 transition">
                Follow
              </button>
            </div>
            
            <p className="text-sm mb-2 line-clamp-2">
              {data.description}
            </p>
            
            {data.songName && (
              <div className="flex items-center gap-2 text-xs opacity-90 mb-4">
                <div className="w-4 h-4 rounded-full border border-white flex items-center justify-center animate-spin-slow">
                   <span className="w-1 h-1 bg-white rounded-full"></span>
                </div>
                <span className="scrolling-text-container relative overflow-hidden w-40 whitespace-nowrap">
                  {data.songName}
                </span>
              </div>
            )}
          </div>

          {/* Right Side: Actions */}
          <div className="flex flex-col items-center gap-6 absolute right-2 bottom-8 md:static md:mb-4">
            <div className="flex flex-col items-center gap-1">
              <button 
                onClick={() => setLiked(!liked)}
                className="p-2 transition-transform active:scale-90"
              >
                <Heart 
                  size={28} 
                  className={cn("transition-colors", liked ? "fill-red-500 text-red-500" : "text-white")} 
                />
              </button>
              <span className="text-xs font-medium text-white">{liked ? data.likes + 1 : data.likes}</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <button className="p-2 transition-transform active:scale-90">
                <MessageCircle size={28} className="text-white" />
              </button>
              <span className="text-xs font-medium text-white">{data.comments}</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <button className="p-2 transition-transform active:scale-90">
                <Share2 size={28} className="text-white" />
              </button>
              <span className="text-xs font-medium text-white">{data.shares}</span>
            </div>

            <button className="p-2 mt-2">
              <MoreHorizontal size={24} className="text-white" />
            </button>
            
            {/* Spinning Album Art for Audio */}
            <div className="mt-4 relative w-10 h-10 bg-gray-800 rounded-full border-4 border-gray-900 flex items-center justify-center overflow-hidden animate-spin-slow">
               <div className="w-full h-full bg-gradient-to-tr from-purple-500 to-orange-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
