export default function SkillsSection() {
    const tech = [
      "React", "Next.js", "Tailwind CSS", "TypeScript", "Firebase",
      "Stripe", "Cloudinary", "Prisma", "OpenAI", "Node.js", "Vercel"
    ];
  
    return (
      <section id="skills"className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-8">🛠️ Skills</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {tech.map((item) => (
            <span key={item} className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium">
              {item}
            </span>
          ))}
        </div>
      </section>
    );
  }
  