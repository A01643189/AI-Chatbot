import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="max-w-6xl mx-auto px-6 py-24 flex flex-col-reverse md:flex-row items-center gap-12"
    >
      {/* Left Image + Glow */}
      <motion.div
        className="flex-1 flex justify-center relative"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-white/5 backdrop-blur-sm shadow-xl overflow-hidden border border-white/10 z-10">
          <img
            src="/profile-logo.png"
            alt="JR Logo"
            className="object-contain w-full h-full p-8"
          />
        </div>

        {/* Glow Behind */}
        <div className="absolute inset-0 z-0 before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-red-500/50 before:via-amber-500/30 before:to-transparent before:blur-3xl before:scale-150" />
      </motion.div>

      {/* Right Text */}
      <div className="flex-1 text-white">
        <motion.p
          className="uppercase tracking-widest text-xs text-gray-400 mb-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Let’s build together
        </motion.p>

        <motion.h2
          className="text-4xl md:text-5xl font-extrabold leading-tight mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Crafting digital experiences <br />
          <span className="bg-gradient-to-r from-red-500 via-amber-400 to-yellow-300 text-transparent bg-clip-text">
            that connect and inspire
          </span>
        </motion.h2>

        <motion.p
          className="text-gray-300 leading-relaxed mt-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          I'm Javier Romo, a full-stack developer who turns clients ideas into live web apps, quickly and efficiently. I specialize in building scalable, high-performance web apps using modern technologies like React, Next.js, Node.js, and Tailwind.css.
        </motion.p>

      </div>
    </section>
  );
}
