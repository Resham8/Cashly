import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "./Button";
import { Link } from "react-router-dom";

interface FloatingPathsProps {
  position: number;
}

const FloatingPaths: React.FC<FloatingPathsProps> = ({ position }) => {
  const pathsRef = useRef<(SVGPathElement | null)[]>([]);

  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03,
  }));

  useEffect(() => {
    pathsRef.current.forEach((path, index) => {
      if (path) {
        const pathLength = path.getTotalLength();
        
        gsap.set(path, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength * 0.7,
          opacity: 0.6,
        });

        // timeline for each path
        const tl = gsap.timeline({ repeat: -1, ease: "none" });

        tl.to(path, {
          strokeDashoffset: 0,
          duration: 20 + Math.random() * 10,
          ease: "none",
        })
          .to(
            path,
            {
              opacity: 0.3,
              duration: (20 + Math.random() * 10) / 3,
              ease: "none",
            },
            0
          )
          .to(
            path,
            {
              opacity: 0.6,
              duration: (20 + Math.random() * 10) / 3,
              ease: "none",
            },
            (20 + Math.random() * 10) / 3
          )
          .to(
            path,
            {
              opacity: 0.3,
              duration: (20 + Math.random() * 10) / 3,
              ease: "none",
            },
            ((20 + Math.random() * 10) * 2) / 3
          )
          .to(
            path,
            {
              strokeDashoffset: -pathLength,
              duration: 20 + Math.random() * 10,
              ease: "none",
            },
            0
          );
      }
    });
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-slate-950 dark:text-white"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path, index) => (
          <path
            key={path.id}
            ref={(el) => (pathsRef.current[index] = el)}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            fill="none"
          />
        ))}
      </svg>
    </div>
  );
};

interface BackgroundPathsProps {
  title?: string;
}

export const HeroSection: React.FC<BackgroundPathsProps> = ({
  title = "Background Paths",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  const words = title.split(" ");

  useEffect(() => {
    // Animate container
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2 }
      );
    }

    // letters
    words.forEach((word, wordIndex) => {
      const letters = word.split("");
      letters.forEach((letter, letterIndex) => {
        const letterElement = document.querySelector(
          `[data-letter="${wordIndex}-${letterIndex}"]`
        );
        if (letterElement) {
          gsap.fromTo(
            letterElement,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              delay: wordIndex * 0.1 + letterIndex * 0.03,
              duration: 0.8,
              ease: "back.out(1.7)",
            }
          );
        }
      });
    });
    
    if (buttonRef.current && arrowRef.current) {
      const button = buttonRef.current;
      const arrow = arrowRef.current;

      button.addEventListener("mouseenter", () => {
        gsap.to(button, { y: -2, duration: 0.3 });
        gsap.to(arrow, { x: 6, opacity: 1, duration: 0.3 });
      });

      button.addEventListener("mouseleave", () => {
        gsap.to(button, { y: 0, duration: 0.3 });
        gsap.to(arrow, { x: 0, opacity: 0.7, duration: 0.3 });
      });
    }
  }, [words]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div
        ref={containerRef}
        className="relative z-10 container mx-auto px-4 md:px-6 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <span
                    key={`${wordIndex}-${letterIndex}`}
                    data-letter={`${wordIndex}-${letterIndex}`}
                    className="inline-block text-transparent bg-clip-text 
                    bg-gradient-to-r from-neutral-900 to-neutral-700/80 
                    dark:from-white dark:to-white/80"
                  >
                    {letter}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <div
            ref={buttonRef}
            className="inline-block group relative bg-gradient-to-b from-black/10 to-white/10 
            dark:from-white/10 dark:to-black/10 p-px rounded-2xl backdrop-blur-lg 
            overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Link to="/signup">
              <Button label="Get Started" variant="gradient" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
