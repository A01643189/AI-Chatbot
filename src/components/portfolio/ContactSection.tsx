import Link from "next/link";

export default function ContactSection() {
  return (
    <section id="contact" className="w-full py-16 text-center px-6 bg-white/10 backdrop-blur">
      <h2 className="text-4xl font-bold mb-4">📩 Let's Connect</h2>
      <p className="text-gray-300 mb-6">
        Got a project in mind or just want to chat? I'm available!
      </p>
      <Link
        href="mailto:javier.romo.jrz@gmail.com"
        className="inline-block bg-white text-black px-6 py-3 rounded-md font-semibold hover:opacity-80 transition"
      >
        Contact Me
      </Link>
    </section>
  );
}
