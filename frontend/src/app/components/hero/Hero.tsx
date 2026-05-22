"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import HeroVideoModal from "./HeroVideoModal";
import HeroTopDecoration from "./HeroTopDecoration";
import HeroBottomDecoration from "./HeroBottomDecoration";
import HeroMainContent from "./HeroMainContent";

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showVideo ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showVideo]);

  return (
    <div className="bg-white relative z-0" dir="rtl">
      
      {/* FIXED WIDTH + PROPER PADDING */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative isolate">
        <HeroTopDecoration />
        <HeroMainContent onVideoOpen={() => setShowVideo(true)} />
        <HeroBottomDecoration />
      </div>

      {/* Video modal */}
      {showVideo &&
        createPortal(
          <HeroVideoModal onClose={() => setShowVideo(false)} />,
          document.body
        )}
    </div>
  );
}
