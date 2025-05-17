import { RiMenu2Line } from "react-icons/ri";
import { FaShoppingCart, FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <div className="bg-[#FAFAFA] flex items-center justify-between gap-24 w-fit p-4 mt-4 rounded-xl shadow-lg">
      <RiMenu2Line size={24}/>
      <img src="/logo.png" alt="logo" className="size-12" />
      <div className="flex items-center justify-between gap-3 relative">
        <FaUser size={24}/>
        <FaShoppingCart fill="#FFA52F" size={24} strokeWidth={8}/>
        <span className="absolute -right-1 -top-2 bg-[#FFA52F]/80 rounded-full w-4 text-xs aspect-square font-semibold text-center border border-zinc-600">2</span>
      </div>
    </div>
  );
};

export default Header;
