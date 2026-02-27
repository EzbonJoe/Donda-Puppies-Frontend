import {Link} from "react-router-dom"

export default function HeroSection() {  
  return (
    <section className="hero-section">
      <span> Find Your Perfect Furry Friend Today!</span>
      <div className="relative z-10 text-center px-4 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
         Your New Best friend is just a click away
        </h1>
        <p className="text-lg md:text-xl mb-6">
           At Donda Puppies, every wagging tail has a story. From playful pups to loyal companions, we bring you healthy, happy, and well-cared-for puppies ready to join your family. Explore our carefully bred collection, find your match, and start a lifelong friendship today
        </p>
        <Link
          to="/puppies"
          className="inline-block bg-white text-[#A97449] font-semibold py-3 px-6 rounded-2xl shadow-md hover:bg-[#f0e6df] transition"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}