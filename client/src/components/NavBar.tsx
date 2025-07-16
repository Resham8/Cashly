import { Wallet } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./Button";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export function NavBar() {
  const navRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const navEl = navRef.current;
      gsap.fromTo(
        navEl,
        {
          maxWidth: "100%",
          marginInline: "auto",
        },
        {
          maxWidth: "50%",
          marginInline: "auto",
          scrollTrigger: {
            trigger: document.body,
            start: "200px top",
            end: "200px top",
            scrub: true,
          },
        }
      );

      gsap.to(navEl, {
        autoAlpha: 0,
        filter: "blur(6px)",
        scrollTrigger: {
          trigger: document.body,
          start: `${window.innerWidth}px top`,
          end: `${window.innerWidth + 100}px top`,
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4">
      <div
        ref={navRef}
        className="transition-all duration-300 bg-[#0a0d14] rounded-xl py-3 px-5 flex justify-between items-center shadow-md"
      >
        <div className="flex items-center gap-4">
          <div className="bg-background p-4 rounded-full transition-transform hover:rotate-12">
            <Wallet stroke="#20d3ee" />
          </div>
          <span className="text-white text-2xl font-semibold">Cashly</span>
        </div>
        <div className="space-x-3">         
          <Link to={"/login"}>
            <Button variant="secondary" label="Login" />
          </Link>
          <Link to={"/signup"}>
            <Button variant="primary" label="Sign Up" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
