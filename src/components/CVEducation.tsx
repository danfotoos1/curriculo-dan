interface EducationItem {
  year: string;
  degree: string;
  details: string;
}

interface CVEducationProps {
  education: EducationItem[];
}

export const CVEducation = ({ education }: CVEducationProps) => {
  return (
    <div className="mb-4 sm:mb-5">
      <h2 className="text-base sm:text-lg font-bold text-cv-text-primary mb-2 sm:mb-3 uppercase tracking-wide">
        Formação Acadêmica
      </h2>
      <div className="space-y-2">
        {education.map((edu, index) => (
          <div key={index} className="flex gap-2 sm:gap-3">
            <div className="text-cv-text-secondary text-[10px] sm:text-xs font-medium whitespace-nowrap">
              {edu.year}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-cv-text-primary font-bold mb-0.5 text-xs sm:text-sm leading-tight break-words">
                {edu.degree}
              </h3>
              <p className="text-cv-text-secondary text-[10px] sm:text-xs leading-snug break-words">
                {edu.details}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
