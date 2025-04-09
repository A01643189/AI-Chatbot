import { motion } from "framer-motion";
import { JSX } from "react";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiFirebase,
  SiStripe,
  SiCloudinary,
  SiGooglegemini,
  SiClaude,
  SiOpenai,
  SiNodedotjs,
  SiVercel,
  SiFramer,
} from "react-icons/si";

const techIconMap: Record<string, JSX.Element> = {
  "React": <SiReact className="text-cyan-400 w-6 h-6" />,
  "Next.js": <SiNextdotjs className="text-white w-6 h-6" />,
  "Tailwind CSS": <SiTailwindcss className="text-teal-300 w-6 h-6" />,
  "TypeScript": <SiTypescript className="text-blue-500 w-6 h-6" />,
  "Firebase": <SiFirebase className="text-orange-500 w-6 h-6" />,
  "Stripe": <SiStripe className="text-purple-400 w-6 h-6" />,
  "Cloudinary": <SiCloudinary className="text-blue-400 w-6 h-6" />,
  "OpenAI": <SiOpenai className="text-white w-6 h-6" />,
  "Node.js": <SiNodedotjs className="text-green-400 w-6 h-6" />,
  "Vercel": <SiVercel className="text-white w-6 h-6" />,
  "Framer Motion": <SiFramer className="text-pink-500 w-6 h-6" />,
  Claude: <SiClaude className="text-orange-300 w-6 h-6" />,
  Gemini: <SiGooglegemini className="text-blue-400 w-6 h-6" />,
  DeepSeek: (
    <img
      src="/deepseek.png"
      alt="DeepSeek"
      className="w-8 h-8 object-contain"
    />
  ),
};

export default function SkillsSection() {
  const tech = [
    "React",
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
    "Firebase",
    "Stripe",
    "Cloudinary",
    "OpenAI",
    "Node.js",
    "Vercel",
    "Claude",
    "Gemini",
    "DeepSeek",
    "Framer Motion",
  ];

  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 text-center py-20">
      <motion.div
        className="text-center space-y-2 mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
      <p className="text-sm tracking-widest text-gray-400 uppercase">
        Planning to add more soon!
      </p>
      <h2 className="text-5xl font-bold">
        Web Development{" "}
        <span className="bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-purple-400 text-transparent bg-clip-text">
          Skills
        </span>
      </h2>
    </motion.div>

      <div className="flex flex-wrap justify-center gap-4">
        {tech.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 px-5 py-3 bg-neutral-800 text-white rounded-full shadow hover:bg-neutral-700 transition"
          >
            {techIconMap[item]}
            <span className="text-sm font-medium">{item}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
