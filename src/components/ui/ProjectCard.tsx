import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";
import { motion } from "framer-motion";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiFramer,
  SiSanity,
  SiAuth0,
  SiMarkdown,
  SiSentry,
  SiGraphql,
  SiOpenai,
  SiStripe,
  SiCloudinary,
  SiFirebase,
  SiGooglegemini,
  SiClaude,
} from "react-icons/si";

interface ProjectCardProps {
  title: string;
  subtitle: string;
  description: string[];
  imageUrl: string;
  stack: string[];
  href: string;
}

const stackIconMap: Record<string, JSX.Element> = {
  "Next.js": <SiNextdotjs className="text-white" />,
  React: <SiReact className="text-cyan-400" />,
  "Tailwind CSS": <SiTailwindcss className="text-teal-300" />,
  TypeScript: <SiTypescript className="text-blue-500" />,
  "Framer Motion": <SiFramer className="text-pink-500" />,
  "Sanity CMS": <SiSanity className="text-red-400" />,
  "Auth.js": <SiAuth0 className="text-indigo-400" />,
  markdown: <SiMarkdown className="text-white" />,
  Sentry: <SiSentry className="text-fuchsia-500" />,
  GROQ: <SiGraphql className="text-pink-400" />
  ,
  Stripe: <SiStripe className="text-purple-400" />,
  Cloudinary: <SiCloudinary className="text-blue-400" />,
  Firebase: <SiFirebase className="text-orange-600" />,
  ChatGPT: <SiOpenai className="text-white" />,
  Claude: <SiClaude className="text-orange-300" />,
  Gemini: <SiGooglegemini className="text-blue-400" />,
  DeepSeek: (
    <img
      src="/deepseek.png"
      alt="DeepSeek"
      className="w-4 h-4 object-contain"
    />
  ),
};

export default function ProjectCard({
  title,
  subtitle,
  description,
  imageUrl,
  stack,
  href,
}: ProjectCardProps) {
  return (
    <Link href={href} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
        className="transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-white/40 flex flex-col md:flex-row w-full bg-[#0f0f0f] rounded-2xl overflow-hidden border border-neutral-800"
      >
        {/* Left Gradient Panel */}
        <div className="md:w-1/2 p-6 bg-white/5 backdrop-blur-sm text-white flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">{subtitle}</h3>
            <p className="text-lg font-bold">{title}</p>
          </div>
          <div className="mt-6">
            <Image
              src={imageUrl}
              alt={title}
              width={600}
              height={400}
              className="rounded-lg border border-white/20 shadow-lg"
            />
          </div>
        </div>

        {/* Right Description Panel */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between bg-black text-white space-y-4">
          <div>
            <h4 className="text-2xl font-bold">{title}</h4>
            <ul className="list-disc list-inside mt-4 space-y-2 text-sm text-gray-300">
              {description.map((point, i) => (
                <li key={i} className="leading-relaxed">
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mt-4">
            {stack.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 px-3 py-1 rounded-full text-xs font-medium transition"
              >
                {stackIconMap[tech] ?? null}
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
