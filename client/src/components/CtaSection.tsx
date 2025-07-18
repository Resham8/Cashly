import { useState } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";

const CTASection = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="min-h-screen bg-surfaced flex flex-col justify-end relative overflow-hidden"
      style={{ backgroundColor: "#0f172a" }}
    >      
      <div
        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-800 ease-out ${
          isHovered ? "w-[1200px] h-[600px]" : "w-[800px] h-[400px]"
        }`}
        style={{
          background: isHovered
            ? "radial-gradient(ellipse at center bottom, #00b9f140 0%, #22d3ee30 20%, #00b9f120 40%, #94a3b810 60%, transparent 100%)"
            : "radial-gradient(ellipse at center bottom, #00b9f120 0%, #22d3ee15 30%, #94a3b808 60%, transparent 100%)",
          borderRadius: "50% 50% 50% 50% / 100% 100% 0% 0%",
          filter: "blur(8px)",
        }}
      ></div>
      
      <div
        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-600 ease-out ${
          isHovered
            ? "w-[1000px] h-[500px] opacity-100"
            : "w-[600px] h-[300px] opacity-80"
        }`}
        style={{
          background: isHovered
            ? "radial-gradient(ellipse at center bottom, #22d3ee35 0%, #00b9f125 25%, #94a3b815 50%, transparent 100%)"
            : "radial-gradient(ellipse at center bottom, #22d3ee20 0%, #00b9f115 35%, #94a3b808 60%, transparent 100%)",
          borderRadius: "50% 50% 50% 50% / 100% 100% 0% 0%",
          filter: "blur(12px)",
        }}
      ></div>
      
      <div
        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-out ${
          isHovered
            ? "w-[800px] h-[400px] opacity-100"
            : "w-[400px] h-[200px] opacity-60"
        }`}
        style={{
          background: isHovered
            ? "radial-gradient(ellipse at center bottom, #22d3ee50 0%, #00b9f135 20%, #94a3b825 40%, transparent 100%)"
            : "radial-gradient(ellipse at center bottom, #22d3ee25 0%, #00b9f120 30%, #94a3b810 50%, transparent 100%)",
          borderRadius: "50% 50% 50% 50% / 100% 100% 0% 0%",
          filter: "blur(6px)",
        }}
      ></div>
      
      <section
        className="relative z-10 py-28 mb-6 px-4 text-center transition-all duration-500 ease-out"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="max-w-2xl mx-auto">
          <h2
            className={`text-4xl font-bold mb-4 transition-all duration-300 ${
              isHovered ? "transform -translate-y-1" : ""
            }`}
            style={{
              color: isHovered ? "#f1f5f9" : "#f1f5f9",
            }}
          >
            Experience it yourself.
          </h2>
          <p
            className={`text-lg mb-6 transition-all duration-300`}
            style={{
              color: isHovered ? "#f1f5f9" : "#94a3b8",
            }}
          >
            Explore a full-stack wallet app clone inspired by Paytm. Sign up,
            check your balance, and simulate transfers — all in a secure, mock
            environment built with React and Node.js.
          </p>
          <Link to="/signup">
            <Button label="Get Started" variant="gradient" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`relative z-10 backdrop-blur-sm py-8 px-4 text-center transition-all duration-500`}
        style={{
          backgroundColor: isHovered ? "#0f172a95" : "#0f172a95",
          color: isHovered ? "#f1f5f9" : "#94a3b8",
        }}
      >
        <p className="text-sm">Made with ❤️ by Resham</p>
        <div className="mt-4">
          <a
            href="https://github.com/Resham8"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 transition-colors duration-200"
            style={{ color: "#94a3b8" }}
            onMouseEnter={(e) => (e.target.style.color = "#22d3ee")}
            onMouseLeave={(e) => (e.target.style.color = "#94a3b8")}
          >
            GitHub
          </a>
          <a
            href="https://x.com/RylieOnTheRise"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 transition-colors duration-200"
            style={{ color: "#94a3b8" }}
            onMouseEnter={(e) => (e.target.style.color = "#22d3ee")}
            onMouseLeave={(e) => (e.target.style.color = "#94a3b8")}
          >
            X
          </a>
        </div>
      </footer>
    </div>
  );
};

export default CTASection;
