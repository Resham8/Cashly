import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

export const GradientCard = ({title, subtitle}:{title:string, subtitle:string}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const purpleGlowRef = useRef<HTMLDivElement>(null);
  const centralGlowRef = useRef<HTMLDivElement>(null);
  const bottomBorderRef = useRef<HTMLDivElement>(null);
  const leftBorderRef = useRef<HTMLDivElement>(null);
  const leftCornerRef = useRef<HTMLDivElement>(null);
  const rightBorderRef = useRef<HTMLDivElement>(null);
  const rightCornerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const learnMoreRef = useRef<HTMLAnchorElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    // initial states
    gsap.set([titleRef.current, descriptionRef.current, learnMoreRef.current], {
      filter: "blur(3px)",
      opacity: 0.7,
    });

    gsap.set(iconRef.current, {
      filter: "blur(3px)",
      opacity: 0.7,
    });

    // Animate content in
    gsap.to(titleRef.current, {
      filter: "blur(0px)",
      opacity: 1,
      duration: 1.2,
      delay: 0.2,
      ease: "power2.out",
    });

    gsap.to(descriptionRef.current, {
      filter: "blur(0px)",
      opacity: 0.85,
      duration: 1.2,
      delay: 0.4,
      ease: "power2.out",
    });

    gsap.to(learnMoreRef.current, {
      filter: "blur(0px)",
      opacity: 0.9,
      duration: 1.2,
      delay: 0.6,
      ease: "power2.out",
    });

    gsap.to(iconRef.current, {
      filter: "blur(0px)",
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });

    return () => {
      tl.kill();
    };
  }, []);


  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();

      // mouse position calculation relative to card center
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      setMousePosition({ x, y });

      // Calculate rotation (limited range for subtle effect)
      const rotateX = -(y / rect.height) * 5; 
      const rotateY = (x / rect.width) * 5; 

      setRotation({ x: rotateX, y: rotateY });

  
      gsap.to(cardRef.current, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.3,
        ease: "power2.out",
      });

     
      gsap.to(glassRef.current, {
        rotateX: -rotateX * 0.2,
        rotateY: -rotateY * 0.2,
        duration: 0.4,
        ease: "power2.out",
      });

     
      gsap.to(purpleGlowRef.current, {
        y: rotateX * 0.5,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(centralGlowRef.current, {
        y: `calc(10% + ${rotateX * 0.3}px)`,
        duration: 0.4,
        ease: "power2.out",
      });

  
      gsap.to(iconRef.current, {
        rotateX: -rotateX * 0.5,
        rotateY: -rotateY * 0.5,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(contentRef.current, {
        rotateX: -rotateX * 0.3,
        rotateY: -rotateY * 0.3,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);

    gsap.to(cardRef.current, {
      y: -5,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(glassRef.current, {
      opacity: 0.7,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(purpleGlowRef.current, {
      opacity: 0.9,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(centralGlowRef.current, {
      opacity: 0.85,
      duration: 0.4,
      ease: "power2.out",
    });

    const borderElements = [
      bottomBorderRef.current,
      leftBorderRef.current,
      leftCornerRef.current,
      rightBorderRef.current,
      rightCornerRef.current,
    ];
    borderElements.forEach((el) => {
      gsap.to(el, {
        boxShadow:
          "0 0 20px 4px rgba(172, 92, 255, 0.9), 0 0 30px 6px rgba(138, 58, 185, 0.7), 0 0 40px 8px rgba(56, 189, 248, 0.5)",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    });

    gsap.to(iconRef.current, {
      boxShadow:
        "0 8px 16px -2px rgba(0, 0, 0, 0.3), 0 4px 8px -1px rgba(0, 0, 0, 0.2), inset 2px 2px 5px rgba(255, 255, 255, 0.15), inset -2px -2px 5px rgba(0, 0, 0, 0.7)",
      y: -2,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(titleRef.current, {
      textShadow: "0 2px 4px rgba(0,0,0,0.2)",
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(descriptionRef.current, {
      textShadow: "0 1px 2px rgba(0,0,0,0.1)",
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(arrowRef.current, {
      x: 4,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
    
    gsap.to(cardRef.current, {
      y: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 0.3,
      ease: "power2.out",
    });
    
    gsap.to(glassRef.current, {
      opacity: 0.5,
      rotateX: 0,
      rotateY: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    
    gsap.to(purpleGlowRef.current, {
      opacity: 0.8,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(centralGlowRef.current, {
      opacity: 0.75,
      y: "10%",
      duration: 0.4,
      ease: "power2.out",
    });
    
    const borderElements = [
      bottomBorderRef.current,
      leftBorderRef.current,
      leftCornerRef.current,
      rightBorderRef.current,
      rightCornerRef.current,
    ];
    borderElements.forEach((el) => {
      gsap.to(el, {
        boxShadow:
          "0 0 15px 3px rgba(172, 92, 255, 0.8), 0 0 25px 5px rgba(138, 58, 185, 0.6), 0 0 35px 7px rgba(56, 189, 248, 0.4)",
        opacity: 0.9,
        duration: 0.4,
        ease: "power2.out",
      });
    });
    
    gsap.to(iconRef.current, {
      boxShadow:
        "0 6px 12px -2px rgba(0, 0, 0, 0.25), 0 3px 6px -1px rgba(0, 0, 0, 0.15), inset 1px 1px 3px rgba(255, 255, 255, 0.12), inset -2px -2px 4px rgba(0, 0, 0, 0.5)",
      y: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    
    gsap.to(contentRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    
    gsap.to(titleRef.current, {
      textShadow: "none",
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(descriptionRef.current, {
      textShadow: "none",
      duration: 0.4,
      ease: "power2.out",
    });
    
    gsap.to(arrowRef.current, {
      x: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  };


  return (
    <div className="w-full flex items-center justify-center ">      
      <div
        ref={cardRef}
        className="relative rounded-[32px] overflow-hidden"
        style={{
          width: "300px",
          height: "300px",  
          transformStyle: "preserve-3d",
          backgroundColor: "#0a0d14",
          boxShadow:
            "0 -10px 100px 10px rgba(78, 99, 255, 0.25), 0 0 10px 0 rgba(0, 0, 0, 0.5)",
          perspective: "1000px",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >        
        <div
          ref={glassRef}
          className="absolute inset-0 z-35 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.05) 100%)",
            backdropFilter: "blur(2px)",
            opacity: 0.5,
          }}
        />
        
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "linear-gradient(180deg, #000000 0%, #000000 70%)",
          }}
        />
        
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        
        <div
          className="absolute inset-0 opacity-10 mix-blend-soft-light z-11 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='smudge'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.01' numOctaves='3' seed='5' stitchTiles='stitch'/%3E%3CfeGaussianBlur stdDeviation='10'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23smudge)'/%3E%3C/svg%3E")`,
            backdropFilter: "blur(1px)",
          }}
        />
        
        <div
          ref={purpleGlowRef}
          className="absolute bottom-0 left-0 right-0 h-2/3 z-20"
          style={{
            background: `
              radial-gradient(ellipse at bottom right, rgba(172, 92, 255, 0.7) -10%, rgba(79, 70, 229, 0) 70%),
              radial-gradient(ellipse at bottom left, rgba(56, 189, 248, 0.7) -10%, rgba(79, 70, 229, 0) 70%)
            `,
            filter: "blur(40px)",
            opacity: 0.8,
          }}
        />
        
        <div
          ref={centralGlowRef}
          className="absolute bottom-0 left-0 right-0 h-2/3 z-21"
          style={{
            background: `
              radial-gradient(circle at bottom center, rgba(161, 58, 229, 0.7) -20%, rgba(79, 70, 229, 0) 60%)
            `,
            filter: "blur(45px)",
            opacity: 0.75,
            transform: "translateY(10%)",
          }}
        />
        
        <div
          ref={bottomBorderRef}
          className="absolute bottom-0 left-0 right-0 h-[2px] z-25"
          style={{
            background:
              "linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.05) 100%)",
            boxShadow:
              "0 0 15px 3px rgba(172, 92, 255, 0.8), 0 0 25px 5px rgba(138, 58, 185, 0.6), 0 0 35px 7px rgba(56, 189, 248, 0.4)",
            opacity: 0.9,
          }}
        />

        <div
          ref={leftBorderRef}
          className="absolute bottom-0 left-0 h-1/4 w-[1px] z-25 rounded-full"
          style={{
            background:
              "linear-gradient(to top, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 20%, rgba(255, 255, 255, 0.3) 40%, rgba(255, 255, 255, 0.1) 60%, rgba(255, 255, 255, 0) 80%)",
            boxShadow:
              "0 0 15px 3px rgba(172, 92, 255, 0.8), 0 0 25px 5px rgba(138, 58, 185, 0.6), 0 0 35px 7px rgba(56, 189, 248, 0.4)",
            opacity: 0.9,
          }}
        />

        <div
          ref={leftCornerRef}
          className="absolute bottom-0 left-0 h-1/4 z-25"
          style={{
            background:
              "linear-gradient(to top, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.55) 15%, rgba(255, 255, 255, 0.4) 30%, rgba(255, 255, 255, 0.25) 45%, rgba(255, 255, 255, 0.1) 70%, rgba(255, 255, 255, 0) 85%)",
            boxShadow:
              "0 0 15px 3px rgba(172, 92, 255, 0.8), 0 0 25px 5px rgba(138, 58, 185, 0.6), 0 0 35px 7px rgba(56, 189, 248, 0.4)",
            opacity: 0.9,
          }}
        />

        <div
          ref={rightBorderRef}
          className="absolute bottom-0 right-0 h-1/4 w-[1px] z-25 rounded-full"
          style={{
            background:
              "linear-gradient(to top, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 20%, rgba(255, 255, 255, 0.3) 40%, rgba(255, 255, 255, 0.1) 60%, rgba(255, 255, 255, 0) 80%)",
            boxShadow:
              "0 0 15px 3px rgba(172, 92, 255, 0.8), 0 0 25px 5px rgba(138, 58, 185, 0.6), 0 0 35px 7px rgba(56, 189, 248, 0.4)",
            opacity: 0.9,
          }}
        />

        <div
          ref={rightCornerRef}
          className="absolute bottom-0 right-0 h-1/3 z-25"
          style={{
            background:
              "linear-gradient(to top, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.55) 15%, rgba(255, 255, 255, 0.4) 30%, rgba(255, 255, 255, 0.25) 45%, rgba(255, 255, 255, 0.1) 70%, rgba(255, 255, 255, 0) 85%)",
            boxShadow:
              "0 0 15px 3px rgba(172, 92, 255, 0.8), 0 0 25px 5px rgba(138, 58, 185, 0.6), 0 0 35px 7px rgba(56, 189, 248, 0.4)",
            opacity: 0.9,
          }}
        />
        
        <div
          ref={contentRef}
          className="relative flex flex-col h-full p-8 z-40"
        >          
          <div
            ref={iconRef}
            className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
            style={{
              background: "linear-gradient(225deg, #171c2c 0%, #121624 100%)",
              position: "relative",
              overflow: "hidden",
              boxShadow:
                "0 6px 12px -2px rgba(0, 0, 0, 0.25), 0 3px 6px -1px rgba(0, 0, 0, 0.15), inset 1px 1px 3px rgba(255, 255, 255, 0.12), inset -2px -2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >            
            <div
              className="absolute top-0 left-0 w-2/3 h-2/3 opacity-40"
              style={{
                background:
                  "radial-gradient(circle at top left, rgba(255, 255, 255, 0.5), transparent 80%)",
                pointerEvents: "none",
                filter: "blur(10px)",
              }}
            />
            
            <div
              className="absolute bottom-0 left-0 w-full h-1/2 opacity-50"
              style={{
                background:
                  "linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent)",
                pointerEvents: "none",
                backdropFilter: "blur(3px)",
              }}
            />
            
            <div className="flex items-center justify-center w-full h-full relative z-10">
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 0L9.4 5.4L14.8 5.4L10.6 8.8L12 14.2L8 10.8L4 14.2L5.4 8.8L1.2 5.4L6.6 5.4L8 0Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          
          <div className="mb-auto">
            <h3
              ref={titleRef}
              className="text-2xl font-medium text-white mb-3"
              style={{
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
              }}
            >
              {title}
            </h3>

            <p
              ref={descriptionRef}
              className="text-sm mb-6 text-gray-300"
              style={{
                lineHeight: 1.5,
                fontWeight: 350,
              }}
            >
              {subtitle}
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
};
