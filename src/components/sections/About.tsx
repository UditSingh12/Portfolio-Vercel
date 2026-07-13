import SectionHeader from '../ui/SectionHeader';

export default function About() {
  return (
    <section id="about" className="relative z-10 scroll-mt-32">
      <SectionHeader title="About Me" subtitle="who i am" />
      <div className="max-w-3xl">
        <h3 className="text-3xl md:text-5xl font-medium leading-tight text-white mb-8">
          Full-stack developer specializing in the MERN stack and TypeScript, with a systems-engineering mindset shaped by hands-on DevOps and CI/CD work.
        </h3>
        <p className="text-lg text-secondary leading-relaxed">
          I build for the entire lifecycle — architecting multi-tenant, role-based access systems, automating deployment pipelines with Docker and GitHub Actions, and integrating AI/ML directly into product workflows rather than bolting it on after the fact. My focus is production reliability: clean data models, secure auth boundaries, and infrastructure that doesn't break under real users. Currently exploring where classical software engineering discipline meets applied AI.
        </p>
      </div>
    </section>
  );
}
