import ServicePage from "@/components/ServicePage";

export default function WebDesignPage() {
  return (
    <ServicePage
      number="01"
      title="Web Design"
      eyebrow="Immersive interface systems"
      description="We design premium digital experiences that combine strong visual direction, intuitive user journeys and conversion-focused structure."
      accent="#22d9ff"
      secondaryAccent="#438cff"
      capabilities={[
        "Custom website design",
        "User experience and interface design",
        "Responsive design systems",
        "Interactive prototypes",
        "Landing pages and campaign experiences",
        "Visual direction and digital art direction",
      ]}
    />
  );
}