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
        transition={{ duration: 0.2, ease: "easeOut" }}
        whileHover={{ scale: 1.03 }}
        className="transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-white/40 flex flex-col md:flex-row w-full max-w-none bg-[#0f0f0f] rounded-2xl overflow-hidden border border-white/10"
      >
        {/* Left Image Panel */}
        <div className="md:w-1/2 relative bg-white/5 backdrop-blur-md text-white min-h-[550px]">
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Description Panel */}
        <div className="md:w-1/2 py-16 px-10 flex flex-col justify-between bg-black text-white space-y-8">
          <div>
            <h4 className="text-4xl font-bold">{title}</h4>
            <ul className="list-disc list-inside mt-6 space-y-4 text-lg text-gray-300">
              {description.map((point, i) => (
                <li key={i} className="leading-relaxed">
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-3 mt-6">
            {stack.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.06,
                  duration: 0.25,
                  ease: "easeOut",
                }}
                className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-full text-base font-medium transition"
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
