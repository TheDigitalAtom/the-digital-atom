import ServicePage from "@/components/ServicePage";

export default function AiSolutionsPage() {
  return (
    <ServicePage
      number="04"
      title="AI Solutions"
      eyebrow="Intelligent systems for modern businesses"
      description="We design practical AI-powered tools and experiences that help businesses automate work, improve customer support and unlock new digital capabilities."
      accent="#c350ff"
      secondaryAccent="#ff5bd7"
      capabilities={[
        "AI website assistants",
        "Customer support chatbots",
        "Workflow automation",
        "AI-powered content systems",
        "Custom AI integrations",
        "Internal productivity tools",
      ]}
    />
  );
}