import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Footer = () => {
  return (
    <>
      <div className="bg-[#4A69E2] flex flex-col gap-6 pt-6 rounded-4xl mx-4">
        {/* Newsletter Section */}
        <h2 className="text-4xl text-white montserrat-semibold px-6">
          Join our SneakersLand Club & get 15% off
        </h2>
        <p className="text-white montserrat-regular px-6">
          Sign up for free! Join the community.
        </p>
        <div className="flex items-center gap-2 px-6">
          <Input placeholder="Enter Your Email Address" />
          <Button variant="destructive">SUBMIT</Button>
        </div>
        <img src="/logo.png" alt="logo" className="size-24 ml-6" />

        {/* Footer */}
        <div className="bg-[#232321] w-full rounded-4xl px-8 py-6 flex flex-col gap-6">
          {/* About Us */}
          <div>
            <h2 className="text-amber-500 text-xl montserrat-semibold">
              About Us
            </h2>
            <p className="text-md py-2 leading-5 text-white montserrat-regular">
              We are the biggest hyperstore in the universe. We got you all
              cover with our exclusive collections and latest drops.
            </p>
          </div>
          {/* Categories */}
          <div>
            <h2 className="text-amber-500 text-xl montserrat-semibold">
              Categories
            </h2>
            <ul className="text-md py-2 leading-5 text-white montserrat-regular">
              {[
                "Runners",
                "Sneakers",
                "Basketball",
                "Outdoor",
                "Golf",
                "Hiking",
              ].map((item, idx) => {
                return (
                  <li key={idx} className="py-1">
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Company */}
          <div>
            <h2 className="text-amber-500 text-xl montserrat-semibold">
              Company
            </h2>
            <ul className="text-md py-2 leading-5 text-white montserrat-regular">
              {[
                "About",
                "Contact",
                "Blogs",
              ].map((item, idx) => {
                return (
                  <li key={idx} className="py-1">
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Follow Us */}
          <div>
            <h2 className="text-amber-500 text-xl montserrat-semibold">
              Follow Us
            </h2>
            <div className="text-md py-2 flex gap-3 leading-5 text-white montserrat-regular">
              <FaFacebookSquare size={24} />
              <FaInstagramSquare size={24} />
              <FaXTwitter size={24} />
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-center my-6 montserrat-semibold">
        © All rights reserved | Made with ❤️ by
        <br /> Rishiraj Bhattacharjee
      </h2>
    </>
  );
};

export default Footer;
