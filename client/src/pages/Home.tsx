import ProductCard from "@/components/ProductCard";
import TestimonialCard from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { newDrops } from "@/lib/constants";
import SneakerCategoriesCarousel from "@/sections/SneakerCategoriesCarousel";

const Home = () => {
  return (
    <div className="montserrat-regular flex flex-col items-center justify-center">
      <h1 className="font-extrabold py-6 md:text-[14vw]!">
        DO IT <span className="text-[#4A69E2]">RIGHT</span>
      </h1>

      {/* Hero Image */}
      <div
        className="w-[350px] md:w-[630px] min-h-[373px] md:min-h-[673px] bg-cover bg-center flex flex-col justify-end mb-8"
        style={{ backgroundImage: "url('/hero-1.png')" }}
      >
        <div className="self-start ml-[-71px] mb-[72px] md:mb-18 md:-ml-30">
          <h2 className="bg-[#232321] text-white text-xs md:text-xl tracking-wider -rotate-90 p-2 rounded-b-md">
            Nike product of the year
          </h2>
        </div>
        {/* Content container */}
        <div className="w-full flex justify-between items-end">
          {/* Left text block */}
          <div className="flex flex-col gap-3 md:gap-6 m-5 md:m-12 ">
            <h2 className="text-2xl md:text-4xl leading-4 italic text-white font-semibold">
              NIKE AIR MAX
            </h2>
            <p className="leading-4 md:leading-5 w-[200px] md:w-[300px] text-zinc-300 font-light text-sm md:text-lg">
              Nike introducing the new air max for everyone's comfort
            </p>
            <Button size="sm" className="w-fit md:hidden">
              SHOP NOW
            </Button>
            <Button size="lg" className="hidden md:block w-fit text-lg!">
              SHOP NOW
            </Button>
          </div>
          {/* Right sub-images */}
          <div className="flex flex-col gap-2 md:gap-6 m-5 md:m-12">
            <img src="/sub-hero-1.png" alt="sub-hero-1" className="w-14 h-14 md:w-30 md:h-30" />
            <img src="/sub-hero-2.png" alt="sub-hero-2" className="w-14 h-14 md:w-30 md:h-30" />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center bg-gradient-to-t from-amber-400 to-zinc-200 w-full">
        <div className="flex items-center justify-center md:justify-between md:w-full gap-5 px-6 md:px-18 pt-12">
          <h2 className="font-bold text-lg md:text-3xl leading-5 py-8">
            Don't miss out new drops
          </h2>
          <Button className="uppercase md:hidden">Shop new drops</Button>
          <Button size="lg" className="hidden md:block uppercase md:text-lg!">Shop new drops</Button>
        </div>

        {/* Product Card Grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-[8vw] md:pl-32 mb-12 md:mb-18">
          {newDrops.map((item, index) => {
            return (
              <ProductCard
                image={item.image}
                name={item.name}
                price={item.price}
                key={index}
              />
            );
          })}
        </div>
      </div>

      {/* Categories */}
      <SneakerCategoriesCarousel />

      {/* Reviews */}
      <div className="w-full py-6">
        <div className="flex items-center justify-between p-4">
          <h2 className="uppercase text-3xl font-semibold">Reviews</h2>
          <Button>SEE ALL</Button>
        </div>
        <div className="flex flex-col">
          {[1, 2].map((_, idx) => (
            <TestimonialCard key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

// 🧬 By Material:
// Leather Sneakers – Nike Air Force 1 Low
// Canvas Sneakers – Vans Old Skool
// Mesh Sneakers – Adidas Ultraboost 22
// Suede Sneakers – Puma Suede Classic
// Knit Sneakers – Nike Flyknit Racer
