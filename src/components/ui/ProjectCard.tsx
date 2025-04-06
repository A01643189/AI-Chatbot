type ProjectCardProps = {
    title: string;
    description: string;
    icon: string;
    href: string;
  };
  
  export default function ProjectCard({ title, description, icon, href }: ProjectCardProps) {
    return (
      <a
        href={href}
        className="p-6 border rounded-lg shadow-md hover:shadow-xl bg-white dark:bg-[#1e1e1e] transition cursor-pointer"
      >
        <h2 className="text-2xl font-semibold mb-2 text-black dark:text-white">
          {icon} {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </a>
    );
  }
  