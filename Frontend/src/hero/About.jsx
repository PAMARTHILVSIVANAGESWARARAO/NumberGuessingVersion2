import React from "react";
import Footer from "./Footer.jsx";
export default function About() {
  return (
    <div className="">

    <section className="about-section bt-2 border-black mb-3">
      {/* Dynamic Background Elements */}
      <div className="about-bg-element-top" />
      <div className="about-bg-element-bottom" />

      <div className="about-content">
        {/* Modern Heading with subtle letter spacing */}
        <h2 className="about-heading">
          About the Game
        </h2>

        <div>
          {/* Hero Paragraph - Bold and Impactful */}
          <p className="about-hero-text">
            The{" "}
            <span className="about-highlight">
              Number Guessing Game
            </span>{" "}
            is a fast-paced, brain-teasing experience where logic meets intuition.
            <span className="about-subtitle">
              Every guess reveals smarter clues, helping you outthink the system.
            </span>
          </p>

          {/* Divider Line */}
          <div className="about-divider about-space-y" />

          {/* Feature Details */}
          <div className="about-features about-space-y">
            <div className="about-feature-card">
              <p className="about-feature-text">
                Create an account, track your progress, analyze your scores, and
                compete globally through a <span style={{fontWeight:"bolder"}}>live leaderboard</span> that updates in
                real time.
              </p>
            </div>
            <div className="about-feature-card">
              <p className="about-feature-text">
                Built for speed and simplicity, the game delivers <span style={{fontWeight:"bolder"}}>instant feedback</span>, clean visuals, and a smooth dashboard experience for
                every device.
              </p>
            </div>
          </div>
        </div>
      </div>

      
    </section>

    <Footer />
    </div>
  );
}
