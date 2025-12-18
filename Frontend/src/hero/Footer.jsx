import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple to-pink py-14 px-6 mt-16 justify-center align-center display-block  ">
      <div className="max-w-6xl mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10 items-start">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-extrabold text-white mb-4 tracking-wide">
              Number Guessing Game
            </h3>
            <p className="text-gray-100 leading-relaxed text-sm">
              Challenge your mind with an exciting number guessing adventure.
              Test your logic and intuition in a fast-paced experience.
            </p>
          </div>

          <div className="hidden md:block"></div>

          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold text-white mb-4 tracking-wide">
              Follow Us
            </h4>
            <div className="flex justify-center md:justify-end gap-5">
              {[
                "facebook",
                "twitter",
                "instagram",
                "linkedin",
              ].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  aria-label={icon}
                  className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center 
                             hover:bg-white/30 transition-all duration-300 hover:-translate-y-1 shadow-md"
                >
                  <i className={`bi bi-${icon} text-white text-lg`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/30 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-100 text-xs tracking-wide">
              © {new Date().getFullYear()} Number Guessing Game. All rights reserved.
            </p>

            <div className="flex gap-6 text-xs" >
              {["Privacy Policy", "Terms of Service", "Contact Us"].map(
                (item) => (
                  <a
                  style={{
              color:"white",
              textDecoration:"none",
              
            }}
                    key={item}
                    href="#"
                    className=" hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
