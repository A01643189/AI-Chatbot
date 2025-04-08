import ProjectCard from "@/components/ui/ProjectCard";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function ProjectsSection() {
  return (
    <motion.section
      id="projects"
      className="bg-black px-4 md:px-6 space-y-24 py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <h2 className="text-4xl font-bold text-center mb-8">
        🚀 Featured Projects
      </h2>

      <div className="space-y-32">
        <div className="snap-center flex justify-center">
          <div className="w-full max-w-5xl">
            <ProjectCard
              title="Ecommerce"
              subtitle="Online Clothing Brand"
              imageUrl="/ecommerce.png"
              href="/ecommerce"
              description={[
                "Built with Stripe, Cloudinary, and custom admin dashboard.",
                "Responsive product listings and secure checkout flow.",
                "Admin features: edit, delete, restore, and upload product images.",
              ]}
              stack={[
                "Next.js",
                "React",
                "Tailwind CSS",
                "TypeScript",
                "Stripe",
                "Cloudinary",
              ]}
            />
          </div>
        </div>

        <div className="snap-center flex justify-center">
          <div className="w-full max-w-5xl">
            <ProjectCard
              title="AI Components"
              subtitle="AI-Powered Tools"
              imageUrl="/ai-components.png"
              href="/ai"
              description={[
                "Includes chatbot with memory, form autocomplete, and Copilot-style assistant.",
                "Built with OpenAI API and Firebase for persistence.",
                "Reusable components designed for production-grade UI.",
              ]}
              stack={[
                "Next.js",
                "React",
                "Tailwind CSS",
                "ChatGPT",
                "Claude",
                "DeepSeek",
                "Gemini",
                "TypeScript",
                "Firebase",
                "Framer Motion",
              ]}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
