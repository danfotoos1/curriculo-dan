interface Skill {
  name: string;
  level: number;
}

interface CVSkillsProps {
  skills: Skill[];
}

export const CVSkills = ({ skills }: CVSkillsProps) => {
  return (
    <div>
      <h2 className="text-base sm:text-lg font-bold text-cv-text-primary mb-2 sm:mb-3 uppercase tracking-wide">
        Habilidades
      </h2>
      <div className="space-y-2.5">
        {skills.map((skill, index) => (
          <div key={index}>
            <div className="text-cv-text-primary text-[10px] sm:text-xs font-medium mb-1 break-words">
              {skill.name}
            </div>
            <div className="h-2 bg-cv-skill-bg rounded-full overflow-hidden">
              <div
                className="h-full bg-cv-skill-bar rounded-full"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
