export default function HeroSection() {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          👋 Hey, I'm Javier Romo
        </h1>
        <p className="max-w-2xl text-lg text-gray-300">
          I craft stunning UIs & scalable APIs — blending creativity with code.
        </p>
        <a href="#projects" className="mt-6 bg-white text-black px-6 py-3 rounded hover:opacity-80 transition">
          Explore Work
        </a>
      </section>
    );
  }
  