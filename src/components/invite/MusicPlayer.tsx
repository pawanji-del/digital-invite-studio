"use client";

import React, { useState, useRef, useEffect } from "react";
import { Disc3, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  audioUrl?: string;
  autoPlayTrigger?: boolean;
}

export function MusicPlayer({ audioUrl, autoPlayTrigger }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const fallbackAudio =
    "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=flute-traditional-indian-113264.mp3";
  const src = audioUrl || fallbackAudio;

  const fadeIn = (audio: HTMLAudioElement) => {
    audio.volume = 0;
    audio.play().then(() => {
      setIsPlaying(true);
      let vol = 0;
      const interval = setInterval(() => {
        if (vol < 0.85) {
          vol += 0.05;
          audio.volume = Math.min(vol, 0.85);
        } else {
          clearInterval(interval);
        }
      }, 100);
    }).catch((err) => {
      console.log("Autoplay blocked:", err);
    });
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      fadeIn(audioRef.current);
    }
  };

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      fadeIn(audioRef.current);
    }
  }, [autoPlayTrigger]);

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      <button
        onClick={toggleMusic}
        title={isPlaying ? "Mute Background Music" : "Play Background Music"}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-stone-900/95 text-amber-300 shadow-2xl border-2 border-amber-400/50 backdrop-blur-md transition-transform duration-300 hover:scale-110 active:scale-95 group"
        style={{
          boxShadow: "0 10px 25px -3px rgba(0,0,0,0.5), 0 0 15px rgba(212, 175, 55, 0.3)",
        }}
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            {/* Spinning Golden Vinyl Disc */}
            <Disc3 className="h-8 w-8 text-amber-400 animate-spin-slow drop-shadow-md" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="h-2 w-2 rounded-full bg-stone-900 border border-amber-300" />
            </div>
          </div>
        ) : (
          <VolumeX className="h-5 w-5 text-stone-400 group-hover:text-amber-200 transition" />
        )}
      </button>
    </>
  );
}
