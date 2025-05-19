import { IoMdStar } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const TestimonialCard = () => {
  return (
    <div className="bg-white m-4 rounded-3xl neomorphism">
      <div className="flex p-4">
        <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-xl">Good Quality</h2>
            <p className="text-sm text-zinc-600 font-medium">I highly reccomend shopping from sneakersland</p>
            <div className="flex items-center">
                {[1,2,3,4,5].map((_,idx)=>(
                    <IoMdStar key={idx} fill="#FFA52F"/>
                ))}
                <span className="ml-3 font-bold text-sm">5.0</span>
            </div>
        </div>
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png"/>
            <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
      <img src="/testimonials.png" alt="testimonials" className="rounded-b-3xl"/>
    </div>
  )
}

export default TestimonialCard
