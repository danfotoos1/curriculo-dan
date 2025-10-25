interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  description: string;
}

interface CVExperienceProps {
  experiences: ExperienceItem[];
}

export const CVExperience = ({ experiences }: CVExperienceProps) => {
  return (
    <div className="mb-4 sm:mb-5">
      <h2 className="text-base sm:text-lg font-bold text-cv-text-primary mb-2 sm:mb-3 uppercase tracking-wide">
        Experiência
      </h2>
      <div className="space-y-3">
        {experiences.map((exp, index) => (
          <div key={index} className="flex gap-2 sm:gap-3">
            <div className="text-cv-text-secondary text-[10px] sm:text-xs font-medium whitespace-nowrap leading-tight">
              {exp.period}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-cv-text-primary font-bold mb-0.5 text-xs sm:text-sm leading-tight break-words">
                {exp.role} — {exp.company}
              </h3>
              <p className="text-cv-text-secondary text-[10px] sm:text-xs leading-snug break-words">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
