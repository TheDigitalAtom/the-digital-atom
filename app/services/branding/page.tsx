import ServicePage from "@/components/ServicePage";

export default function BrandingPage() {
  return (
    <ServicePage
      number="03"
      title="Branding"
      eyebrow="Identity systems built to stand apart"
      description="We create cohesive visual identities that give businesses a recognizable presence across websites, social media and every customer touchpoint."
      accent="#8a63ff"
      secondaryAccent="#bd50ff"
      capabilities={[
        "Brand strategy and positioning",
        "Logo and identity design",
        "Typography and color systems",
        "Brand guidelines",
        "Digital brand applications",
        "Creative direction",
      ]}
    />
  );
}