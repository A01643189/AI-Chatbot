import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="max-w-5xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-10"
    >
      {/* Left Text Column */}
      <div className="flex-1 text-white">
        <motion.p
          className="uppercase tracking-widest text-sm text-gray-400 mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          More about me
        </motion.p>

        <motion.h2
          className="text-4xl md:text-5xl font-bold leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Full-Stack Developer and{" "}
          <span className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-400 text-transparent bg-clip-text italic">
            a little bit of everything
          </span>
        </motion.h2>

        <motion.p
          className="mt-6 text-gray-300 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          I’m a full-stack developer with a passion for creating elegant,
          high-performance web experiences. I specialize in React, Next.js, Node.js,
          and bringing ideas to life with clean, scalable code.
        </motion.p>

        <motion.p
          className="mt-4 text-gray-400 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Whether it’s building sleek landing pages or full-featured apps, I love
          solving problems with thoughtful design and modern tools.
        </motion.p>

        <motion.p
          className="mt-4 text-gray-500 italic"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Let’s build something impactful together.
        </motion.p>
      </div>

      {/* Right Image */}
      <motion.div
        className="flex-1 flex justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <img
          src="/profile-logo.png"
          alt="Developer Logo"
          className="w-64 h-64 rounded-full object-cover border-2 border-white/10 shadow-lg"
        />
      </motion.div>
    </section>
  );
}
