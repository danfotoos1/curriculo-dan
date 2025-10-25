interface CVInterestsProps {
  interests: string[];
}

export const CVInterests = ({ interests }: CVInterestsProps) => {
  return (
    <div>
      <h2 className="text-base sm:text-lg font-bold text-cv-text-primary mb-2 sm:mb-3 uppercase tracking-wide">
        Interesses
      </h2>
      <ul className="space-y-1">
        {interests.map((interest, index) => (
          <li key={index} className="text-cv-text-secondary text-[10px] sm:text-xs">
            {interest}
          </li>
        ))}
      </ul>
    </div>
  );
};
