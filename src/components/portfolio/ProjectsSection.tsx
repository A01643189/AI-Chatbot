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
      className="bg-black px-4 md:px-6 space-y-16 py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.div
        className="text-center space-y-2 mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
      <p className="text-sm tracking-widest text-gray-400 uppercase">
        Featured Sample Work
      </p>
      <h2 className="text-5xl font-bold">
        Sample{" "}
        <span className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-lime-300 text-transparent bg-clip-text">
          work
        </span>
      </h2>
    </motion.div>



      <div className="divide-y divide-neutral-800">
        {/* Project 1 */}
        <div className="snap-center flex justify-center pb-12">
          <div className="w-full max-w-7xl">
            <ProjectCard
              title="Ecommerce"
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

        {/* Project 2 */}
        <div className="snap-center flex justify-center pt-12">
          <div className="w-full max-w-7xl">
            <ProjectCard
              title="AI Components"
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
