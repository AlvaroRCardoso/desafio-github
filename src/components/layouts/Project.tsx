import { GoGitBranch, GoStarFill } from "react-icons/go";

interface ProjectProps {
  name: string;
  fullName: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  url: string;
}

export default function Project({ 
  name, 
  fullName, 
  description, 
  language, 
  stars, 
  forks, 
  url 
}: ProjectProps) {
  return (
    <div className="w-full flex flex-col justify-center py-4 gap-2 border-b-[1px] border-background-cinza">
      <h3 className="text-md text-preto font-light">
        {language && `${language} / `}
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-link font-normal hover:underline"
        >
          {name}
        </a>
      </h3>
      
      {description && (
        <p className="text-xs text-cinza line-clamp-3">{description}</p>
      )}
      
      <div className="flex items-center gap-3 text-preto text-xs">
        <span className="flex gap-2 items-center">
          <GoStarFill className="w-5 h-5" /> 
          {stars}
        </span>
        <span className="flex gap-2 items-center">
          <GoGitBranch className="w-5 h-5" /> 
          {forks}
        </span>
      </div>
    </div>
  );
}