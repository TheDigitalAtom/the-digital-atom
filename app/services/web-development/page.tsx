import ServicePage from "@/components/ServicePage";

export default function WebDevelopmentPage() {
  return (
    <ServicePage
      number="02"
      title="Web Development"
      eyebrow="High-performance digital engineering"
      description="We engineer fast, scalable and maintainable websites using modern technology, thoughtful architecture and production-quality development practices."
      accent="#4e8fff"
      secondaryAccent="#6f6bff"
      capabilities={[
        "Next.js and React development",
        "Custom frontend engineering",
        "Responsive implementation",
        "Animation and interaction systems",
        "Performance optimization",
        "API and third-party integrations",
      ]}
    />
  );
}