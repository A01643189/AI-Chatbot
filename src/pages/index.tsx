import HeroSection from "@/components/portfolio/HeroSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import TechStackSection from "@/components/portfolio/TechStackSection";
import ContactSection from "@/components/portfolio/ContactSection";
import PortfolioFooter from "@/components/portfolio/PortfolioFooter";
import PortfolioNavbar from "@/components/portfolio/PortfolioNavbar";
import Image from "next/image";

export default function PortfolioHome() {
  return (
    <div className="relative min-h-screen text-white bg-black">
      {/* Background */}
      <Image
        src="/blurred-background.jpg"
        alt="Blurred Background"
        fill
        priority
        className="fixed z-0 object-cover w-full h-full"
      />

      <main className="relative z-10 space-y-32 scroll-smooth">
        <PortfolioNavbar />
        <HeroSection />
        <ProjectsSection />
        <TechStackSection />
        <ContactSection />
        <PortfolioFooter />
      </main>
    </div>
  );
}
