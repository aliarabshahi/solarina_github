"use client";

import React from "react";

/** Fullscreen overlay modal for playing the Hero video */
export default function HeroVideoModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/80 z-[2147483647] flex justify-center items-center p-4">
      <div className="relative w-full max-w-4xl rounded-xl overflow-hidden bg-black shadow-2xl flex items-center justify-center">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-[2147483647] text-white bg-black/50 hover:bg-black/80 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold transition-colors"
        >
          ✕
        </button>

        <div className="w-full h-full flex justify-center items-center">
          <video
            className="w-full max-h-[80vh] object-contain rounded-xl"
            src="/videos/introduction.mp4"
            controls
            autoPlay
            playsInline
          />
        </div>
      </div>
    </div>
  );
}
