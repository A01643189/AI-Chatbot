import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-black">
      
      {/* ✅ Background Image fills the section naturally */}
      <Image
        src="/blurred-background.jpg"
        alt="blurred cosmic background"
        fill
        priority
        sizes="100vw"
        quality={100}
        className="absolute z-0 w-full h-full brightness-135 contrast-150"
      />

      {/* Foreground Content */}
      <div className="relative z-10 pt-24">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          👋 Hey, I'm Javier Romo
        </h1>
        <p className="max-w-2xl text-lg text-gray-200">
          I craft stunning UIs & scalable APIs — blending creativity with code.
        </p>
        <a
          href="#projects"
          className="mt-6 inline-block bg-white text-black px-6 py-3 rounded hover:opacity-80 transition"
        >
          Explore Work
        </a>
      </div>
    </section>
  );
}
