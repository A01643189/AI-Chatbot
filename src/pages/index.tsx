import HeroSection from "@/components/portfolio/HeroSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import AboutSection from "@/components/portfolio/AboutSection";
import ContactSection from "@/components/portfolio/ContactSection";
import PortfolioFooter from "@/components/portfolio/PortfolioFooter";
import PortfolioNavbar from "@/components/portfolio/PortfolioNavbar";

export default function PortfolioHome() {
  return (
    <div className="relative min-h-screen text-white bg-black ">
      <main className="relative z-10 space-y-32 scroll-smooth">
        <PortfolioNavbar />
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <AboutSection />
        <ContactSection />
        <PortfolioFooter />
      </main>
    </div>
  );
}
