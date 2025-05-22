import { RiMenu2Line } from "react-icons/ri";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <div className="bg-[#FAFAFA] flex items-center justify-between gap-24 w-full p-4 mt-4 md:mt-8 rounded-xl shadow-lg">
      {/* Menu Mobile */}
      <RiMenu2Line size={24} className="md:hidden"/>
      <div className="hidden md:block">
        <ul className="flex items-center gap-4 font-semibold text-sm">
          <li>New Drops 🔥</li>
          <li>Mens</li>
          <li>Womens</li>
        </ul>
      </div>
      {/* Logo */}
      <img src="/logo.png" alt="logo" className="size-12 md:size-16" />
      {/* Search, User, Cart */}
      <div className="flex items-center justify-between gap-3 md:gap-7 relative">
        <FaSearch size={24} strokeWidth={0.1} className="hidden md:block"/>
        <FaUser size={24}/>
        <FaShoppingCart fill="#000000" size={24} strokeWidth={8}/>
        <span className="absolute -right-1 -top-2 bg-[#FFA52F]/90 rounded-full w-4 text-xs aspect-square font-semibold text-center border border-zinc-600">2</span>
      </div>
    </div>
  );
};

export default Header;
