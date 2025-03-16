import React from "react";
import { Facebook, Twitter, Instagram, Github, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* ✅ Brand & Socials */}
          <div>
            <h2 className="text-3xl font-bold tracking-wide text-white">AgriꞰart🌿</h2>
            <p className="text-gray-400 mt-4 leading-relaxed">
              Delivering pure, organic, and eco-friendly farming products for a sustainable future.
            </p>
            <div className="flex space-x-4 mt-6">
              {[Twitter, Facebook, Instagram, Github].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-blue-500 transition duration-300"
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* ✅ Company Info */}
          <div>
            <h3 className="text-lg font-semibold uppercase text-gray-300">Company</h3>
            <ul className="mt-4 space-y-3">
              {[
                { name: "About", link: "/about-us" },
                { name: "Features", link: "/features" },
                { name: "Works", link: "/works" },
                { name: "Career", link: "/career" },
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.link} className="text-gray-400 hover:text-white transition duration-300">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ✅ Support Links */}
          <div>
            <h3 className="text-lg font-semibold uppercase text-gray-300">Support</h3>
            <ul className="mt-4 space-y-3">
              {[
                "Customer Support",
                "Delivery Details",
                "Terms & Conditions",
                "Privacy Policy",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ✅ Newsletter Subscription */}
          <div>
            <h3 className="text-lg font-semibold uppercase text-gray-300">Newsletter</h3>
            <p className="text-gray-400 mt-4">Subscribe to our newsletter for the latest updates.</p>
            <form className="mt-4 relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 pr-12 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>

        {/* ✅ Footer Bottom */}
        <hr className="border-gray-700 my-10" />
        <p className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} AgriꞰart🌿. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
