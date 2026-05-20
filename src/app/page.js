import FeaturedTutors from "@/components/home/FeaturedTutors";

export default async function Home() {

  const res = await fetch(`http://localhost:8000/top-tutors`);

  const tutors = await res.json();

  return (
    <div className="pt-44 container mx-auto ">
      <FeaturedTutors tutors={tutors} />
    </div>
  );
}
