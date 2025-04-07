import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-black">
      
      {/* ✅ Background Image with brilliance + contrast */}
      <Image
        src="/blurred-background.jpg"
        alt="blurred cosmic background"
        fill
        priority
        sizes="100vw"
        quality={100}
        className="absolute z-0 w-full h-full object-cover brightness-125 contrast-150"
      />

      {/* 🔤 Foreground Content */}
      <div className="relative z-10 px-6 pt-24 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-white drop-shadow-md">
          Your next-level website starts here.
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-300">
          Landing pages, ecommerce, components and more.
        </p>
        <a
          href="#projects"
          className="mt-8 inline-block bg-white text-black font-semibold px-6 py-3 rounded-md hover:opacity-90 transition"
        >
          Explore Work
        </a>
      </div>
    </section>
  );
}
