import SectionHeader from '../ui/SectionHeader';

export default function Experience() {
  const experiences = [
    {
      company: "College Dilao Pvt. Ltd.",
      role: "Data Analyst Intern",
      period: "Aug 2025 – Feb 2026",
      description: "Automated data pipelines to process large-scale educational datasets, and built analysis workflows that directly improved the accuracy of student-college matching algorithms — reducing manual reporting overhead while surfacing cleaner signal for downstream decision-making."
    }
  ];

  return (
    <section id="experience" className="relative z-10 scroll-mt-32">
      <SectionHeader title="Experience" subtitle="where i've worked" />
      
      <div className="space-y-12">
        {experiences.map((exp, i) => (
          <div key={i} className="group flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
            <div className="md:w-1/4">
              <span className="font-mono text-sm text-secondary">{exp.period}</span>
            </div>
            <div className="md:w-3/4 space-y-2">
              <h3 className="text-xl font-medium text-white group-hover:text-primary transition-colors">{exp.role}</h3>
              <p className="text-secondary font-medium">{exp.company}</p>
              <p className="text-secondary/80 pt-2 leading-relaxed">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
