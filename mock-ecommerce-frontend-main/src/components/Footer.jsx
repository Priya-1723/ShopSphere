import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-black text-stone-400 text-sm  space-y-10 p-4 ">
      <div className="flex  justify-evenly pb-2 ">
        <div className="flex flex-col gap-5">
          {/* social media, website logo */}
          <h1 className="font-monospace font-bold text-blue-800 tracking-widest text-xl">
            SHOP
          </h1>
          <div className="flex gap-4 text-xl">
            <FaInstagramSquare className="hover:text-pink-600" />
            <FaFacebook className="hover:text-blue-800" />
            <FaTwitter className="hover:text-blue-500" />
          </div>
        </div>
        <div>
          <ul className="space-y-3 ">
            <li>Shop</li>
            <li>Tops</li>
            <li>Bottoms</li>
            <li>New In</li>
          </ul>
        </div>
        <div>
          <ul className="space-y-3">
            <li>Company</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div>
          <ul className="space-y-3">
            <li>About</li>
            <li>Contact - 12345</li>
          </ul>
        </div>
      </div>
      <div className="text-center border-t border-stone-700 pt-3">
        Copywrite © 2025 SHOP
      </div>
    </div>
  );
};

export default Footer;
