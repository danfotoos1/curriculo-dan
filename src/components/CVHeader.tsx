interface CVHeaderProps {
  name: string;
  title: string;
  birthDate: string;
  phone: string;
  email: string;
  linkedin: string;
  portfolio: string;
  projects: string | string[];
  address: string;
}

export const CVHeader = ({ name, title, birthDate, phone, email, linkedin, portfolio, projects, address }: CVHeaderProps) => {
  const projectsText = Array.isArray(projects) ? projects.join(' • ') : projects;
  const isProjectsUrl = typeof projectsText === 'string' && /^(https?:)?\/\//i.test(projectsText);
  return (
    <div className="mb-4 sm:mb-6">
      <div className="text-center mb-3 sm:mb-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cv-text-primary mb-1 leading-tight">
          {name}
        </h1>
        <p className="text-cv-highlight text-xs sm:text-sm font-semibold tracking-wider uppercase mb-2">
          {title}
        </p>
        <p className="text-cv-text-primary text-[10px] sm:text-xs mb-1">{birthDate}</p>
      </div>
      <div className="text-center text-cv-text-primary text-[10px] sm:text-xs space-y-0.5 px-2 sm:px-0 max-w-full overflow-hidden">
        <p className="break-words whitespace-normal">{address}</p>
        <p className="break-words whitespace-normal">Telefone: {phone}</p>
        <p className="break-words whitespace-normal">
          E-mail:{" "}
          <a 
            href={`mailto:${email}`} 
            className="text-cv-highlight hover:underline print:text-cv-text-primary break-all inline-block max-w-full"
          >
            {email}
          </a>
        </p>
        <p className="break-words whitespace-normal">
          LinkedIn:{" "}
          <a 
            href={`https://${linkedin}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-cv-highlight hover:underline print:text-cv-text-primary break-all inline-block max-w-full"
          >
            {linkedin}
          </a>
        </p>
        <p className="break-words whitespace-normal">
          Portfólio:{" "}
          <a 
            href={portfolio} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-cv-highlight hover:underline print:text-cv-text-primary break-all inline-block max-w-full"
          >
            {portfolio.replace('https://', '')}
          </a>
        </p>
        <p className="break-words whitespace-normal">
          Projetos:{" "}
          {isProjectsUrl ? (
            <a
              href={projectsText}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cv-highlight hover:underline print:text-cv-text-primary break-all inline-block max-w-full"
            >
              {projectsText.replace('https://', '')}
            </a>
          ) : (
            <span>{projectsText}</span>
          )}
        </p>
      </div>
    </div>
  );
};
