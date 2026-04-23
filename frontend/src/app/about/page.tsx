import AboutIntro from "./components/AboutIntro";
import AboutProjectSection from "./components/AboutProjectSection";
import AboutFeatures from "./components/AboutFeatures";
import AboutCTA from "./components/AboutCTA";

/**
 * General About Page — combines introduction, project info, features, and CTA
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f9f9fb] py-10 px-6 sm:py-12 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto space-y-20">
        <AboutIntro />
        <AboutProjectSection />
        <AboutFeatures />
        <AboutCTA />
      </div>
    </div>
  );
}
