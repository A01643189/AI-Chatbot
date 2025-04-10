import Link from "next/link";
import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-black px-6 py-24 text-center relative overflow-hidden">
      {/* White Glow Background Effect – centered and smaller */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-72 h-72 rounded-full bg-gradient-to-br from-white/20 via-white/10 to-transparent blur-3xl" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <p className="text-sm tracking-widest text-gray-400 uppercase mb-2">
          Ready to collaborate?
        </p>

        <h2 className="text-5xl font-bold mb-6">
          Let’s{" "}
          <span className="bg-gradient-to-r from-white/90 via-white/70 to-white/40 text-transparent bg-clip-text">
            connect
          </span>
        </h2>

        <p className="text-gray-300 mb-8 leading-relaxed">
          Got a project or idea? Let’s build something incredible together.
        </p>

        <Link
          href="mailto:javier.romo.jrz@gmail.com"
          className="inline-block bg-white text-black px-6 py-3 rounded-md font-semibold hover:opacity-90 transition"
        >
          Contact Me
        </Link>
      </motion.div>
    </section>
  );
}
