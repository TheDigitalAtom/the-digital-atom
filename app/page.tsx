import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#02030b] text-white">
      <Navbar />

      <Hero />

      <Portfolio />

      <Footer />
    </main>
  );
}