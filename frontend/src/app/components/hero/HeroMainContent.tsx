"use client";

import HeroBanner from "./HeroBanner";
import HeroFeatures from "./HeroFeatures";
import HeroCTA from "./HeroCTA";

export default function HeroMainContent({
  onVideoOpen,
}: {
  onVideoOpen: () => void;
}) {
  return (
    // <div className="mx-auto max-w-6xl  pt-12 sm:pt-20 pb-10 px-6 sm:px-">
    <div className="mx-auto max-w-6xl  pt-12 sm:pt-20 pb-24 px-6 sm:px-10">
      <HeroBanner onVideoOpen={onVideoOpen} />
      <HeroFeatures />
      <HeroCTA />
    </div>
  );
}
