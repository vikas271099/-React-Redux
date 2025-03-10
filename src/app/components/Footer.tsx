import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-2">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold">Next.js App</h2>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} All rights reserved.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-white transition">About</a>
          <a href="#" className="text-gray-400 hover:text-white transition">Privacy</a>
          <a href="#" className="text-gray-400 hover:text-white transition">Contact</a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-white transition"> Twitter</a>
          <a href="#" className="text-gray-400 hover:text-white transition"> Facebook</a>
          <a href="#" className="text-gray-400 hover:text-white transition">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
