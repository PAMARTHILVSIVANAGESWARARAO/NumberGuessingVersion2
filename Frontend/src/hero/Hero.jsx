import { Link } from "react-router-dom";
import L from "./l.png";
import Light from "./light.png";
import About from "./About";
export default function Hero() {
  return (

    <div className="">

    <div className="h-screen w-full overflow-hidden relative flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">

      {/* Left Bottom Image (hidden on mobile) */}
      <div className="absolute left-0 bottom-0 hidden md:block">
        <img
          src={Light}
          alt=""
          className="w-56 lg:w-72 xl:w-96 drop-shadow-[0_30px_70px_rgba(99,102,241,0.35)]"
        />
      </div>

      {/* Middle Content */}
      <div className="z-10 text-center max-w-3xl px-6 md:px-16 lg:px-24">
        <h1 className="font-extrabold leading-tight mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            Can you outthink
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600">
            the system?
          </span>
        </h1>

        <p className="mx-auto text-gray-700 text-base sm:text-lg md:text-xl mb-12 leading-relaxed max-w-2xl">
  Step into a battle of logic and intuition where every guess matters.
  Analyze clues, predict outcomes, and prove your intelligence in a game
  designed to challenge how you think.
</p>


        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link
            to="/login"
            className="btn d-flex align-items-center gap-2 px-6 py-3 text-white fw-semibold  shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)",
            }}
          >
            <i className="bi bi-play-fill fs-5"></i>
            Start Game
          </Link>

          <Link
            to="/register"
            className="btn d-flex align-items-center gap-2 px-6 py-3 fw-semibold  shadow-lg border-0"
            style={{
              background:
                "linear-gradient(135deg, #f9fafb, #e5e7eb)",
            }}
          >
            <i className="bi bi-person-plus fs-5 text-indigo-600"></i>
            Create Account
          </Link>
        </div>
      </div>

      {/* Right Center Image (hidden on mobile) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block">
        <img
          src={L}
          alt="L"
          className="w-56 lg:w-72 xl:w-96 animate-spin-slow drop-shadow-[0_40px_90px_rgba(236,72,153,0.35)] "
          
        />
      </div>

    </div>

    <About/>
    </div>


  );
}
