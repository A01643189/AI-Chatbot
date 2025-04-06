import ProjectCard from "@/components/ui/ProjectCard";

export default function ProjectsSection() {
  return (
    <section id="projects" className="max-w-5xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-8">🚀 Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProjectCard
          icon="🛍️"
          title="Ecommerce"
          description="Clothing brand store built with Stripe, Cloudinary, and admin tools."
          href="/ecommerce"
        />
        <ProjectCard
          icon="🤖"
          title="AI Components"
          description="Chatbot, form assistant, and memory UI components using OpenAI."
          href="/ai"
        />
      </div>
    </section>
  );
}
