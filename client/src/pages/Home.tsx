import ProductCard from "@/components/ProductCard";
import TestimonialCard from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { newDrops } from "@/lib/constants";
import SneakerCategoriesCarousel from "@/sections/SneakerCategoriesCarousel";

const Home = () => {
  return (
    <div className="montserrat-regular flex flex-col items-center justify-center">
      <h1 className="font-extrabold py-6">
        DO IT <span className="text-[#4A69E2]">RIGHT</span>
      </h1>

      {/* Hero Image */}
      <div
        className="w-[350px] min-h-[373px] bg-cover bg-center flex flex-col justify-end mb-8"
        style={{ backgroundImage: "url('/hero-1.png')" }}
      >
        <div className="self-start ml-[-71px] mb-[72px]">
          <h2 className="bg-[#232321] text-white text-xs tracking-wider -rotate-90 p-2 rounded-b-md">
            Nike product of the year
          </h2>
        </div>
        {/* Content container */}
        <div className="w-full flex justify-between items-end">
          {/* Left text block */}
          <div className="flex flex-col gap-3 m-5">
            <h2 className="text-2xl leading-4 italic text-white font-semibold">
              NIKE AIR MAX
            </h2>
            <p className="leading-4 w-[200px] text-zinc-300 font-light text-sm">
              Nike introducing the new air max for everyone's comfort
            </p>
            <Button size="sm" className="w-fit">
              SHOP NOW
            </Button>
          </div>
          {/* Right sub-images */}
          <div className="flex flex-col gap-2 m-5">
            <img src="/sub-hero-1.png" alt="sub-hero-1" className="w-14 h-14" />
            <img src="/sub-hero-2.png" alt="sub-hero-2" className="w-14 h-14" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-t from-amber-400 to-zinc-200">
        <div className="flex items-center justify-center gap-5 mx-6 pt-12">
          <h2 className="font-bold text-lg leading-5 py-8">
            Don't miss out new drops
          </h2>
          <Button className="uppercase">Shop new drops</Button>
        </div>

        {/* Product Card Grid */}
        <div className="grid grid-cols-2 gap-5 px-6 mb-10">
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
