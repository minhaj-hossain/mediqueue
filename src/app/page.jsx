import FAQ from "@/components/home/FAQ";
import FeaturedTutors from "@/components/home/FeaturedTutors";
import HeroSection from "@/components/home/HeroSection";
import TrustSection from "@/components/home/TrustSection";

export default async function Home() {

  const res = await fetch(`http://localhost:8000/top-tutors`);
  const tutors = await res.json();

  return (
    <div className="pt-44 container mx-auto ">
      <HeroSection />
      <FeaturedTutors tutors={tutors} />
      <TrustSection />
      <FAQ />
    </div>
  );
}
