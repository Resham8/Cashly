import {HeroSection} from "../components/HeroSection";

import { NavBar } from "../components/NavBar";

export default function LandingPage() {
  return (
    <div className="w-full h-auto bg-background min-h-screen">
      <NavBar />
      <HeroSection title="Your Wallet, Upgraded."/>        
    </div>
  );
}
