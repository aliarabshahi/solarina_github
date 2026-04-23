"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import HeroVideoModal from "./HeroVideoModal";
import HeroTopDecoration from "./HeroTopDecoration";
import HeroBottomDecoration from "./HeroBottomDecoration";
import HeroMainContent from "./HeroMainContent";

/** Top-level Hero section container with decorative elements and video modal */
export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);

  // Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showVideo ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showVideo]);

  return (
    <div className="bg-white relative z-0" dir="rtl">
      <div className="relative isolate px-6 lg:px-8">
        <HeroTopDecoration />
        <HeroMainContent onVideoOpen={() => setShowVideo(true)} />
        <HeroBottomDecoration />
      </div>

      {showVideo &&
        createPortal(
          <HeroVideoModal onClose={() => setShowVideo(false)} />,
          document.body
        )}
    </div>
  );
}
