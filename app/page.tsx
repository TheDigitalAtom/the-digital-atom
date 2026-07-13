import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import InteractiveCursor from "@/components/InteractiveCursor";
import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import SectionTransition from "@/components/SectionTransition";
import Services from "@/components/Services";
import SiteAtmosphere from "@/components/SiteAtmosphere";
import WorldHUD from "@/components/WorldHUD";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020714]">
      <SiteAtmosphere />

      <WorldHUD />

      <InteractiveCursor />

      <div className="relative z-10">
        <Navbar />

        <Hero />

        <SectionTransition label="Entering service systems" />

        <Services />

        <SectionTransition label="Accessing studio protocol" />

        <About />

        <SectionTransition label="Accessing project archive" />

        <Portfolio />

        <SectionTransition label="Opening communication channel" />

        <Contact />

        <Footer />
      </div>
    </main>
  );
}