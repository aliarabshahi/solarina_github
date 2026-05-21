import AboutIntro from "./components/AboutIntro";
import AboutProjectSection from "./components/AboutProjectSection";
import AboutFeatures from "./components/AboutFeatures";
import AboutCTA from "./components/AboutCTA";

export default function AboutPage() {
  return (
    <div className="relative z-0 min-h-screen bg-white py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        <AboutIntro />
        <AboutProjectSection />
        {/* <AboutFeatures /> */}
        <AboutCTA />
      </div>
    </div>
  );
}
