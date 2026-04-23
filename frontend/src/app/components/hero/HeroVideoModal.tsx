import React from "react";

/** Fullscreen overlay modal for playing the Hero video */
export default function HeroVideoModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-[2147483647] flex justify-center items-center p-4">
      <div className="relative w-full max-w-4xl rounded-xl overflow-hidden bg-gray-900">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-[2147483647] text-gray-300 hover:text-white text-2xl font-bold transition-colors"
        >
          ✕
        </button>

        <div className="aspect-w-16 aspect-h-9 w-full">
          <iframe
            className="w-full h-[400px] sm:h-[500px]"
            src="https://www.youtube.com/embed/your-video-id"
            title="ویدیوی عملکرد و تست سرعت شارژر خورشیدی"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
