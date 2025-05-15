import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="montserrat-regular flex flex-col items-center justify-center">
      <h1 className="font-extrabold py-6">
        DO IT <span className="text-[#4A69E2]">RIGHT</span>
      </h1>
      
      {/* Hero Image */}
      <div className="relative flex items-center justify-center">
        <img src="/hero-1.png" alt="hero-1" className="w-8/9" />
        <h2 className="bg-[#232321] text-white absolute -left-12 top-26 text-xs tracking-wider -rotate-90 p-2 rounded-b-md">
          Nike product of the year{" "}
        </h2>
        <div className="absolute bottom-4 left-10 flex flex-col gap-3">
          <h2 className="text-2xl leading-4 italic text-white font-semibold">
            NIKE AIR MAX
          </h2>
          <p className="leading-4 w-[55%] text-zinc-300 font-light text-sm">
            Nike introducing the new air max for everyone's comfort
          </p>
          <Button size="sm" className="w-fit">
            SHOP NOW
          </Button>
        </div>
        <div className="absolute flex flex-col gap-2 right-10 bottom-4">
          <img src="/sub-hero-1.png" alt="sub-hero-1" className="size-14"/>
          <img src="/sub-hero-2.png" alt="sub-hero-2" className="size-14"/>
        </div>
      </div>

      <div className="flex items-center justify-center gap-5 mx-6">
        <h2 className="font-bold text-lg leading-5 py-8">Don't miss out new drops</h2>
        <Button className="uppercase">Shop new drops</Button>
      </div>

      {/* Product Card Grid */}
      <div>

      </div>
    </div>
  );
};

export default Home;
