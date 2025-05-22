import { GoRepo, GoStar } from "react-icons/go";
import { Dispatch, SetStateAction } from "react";
import { useGitHub } from "@/contexts/GitHubContext";

interface TabsProps {
  activeTab: "repositories" | "starred";
  setActiveTab: Dispatch<SetStateAction<"repositories" | "starred">>;
}

export default function Tabs({ activeTab, setActiveTab }: TabsProps) {
  const { userData, starredCount } = useGitHub();

  const formatCount = (count: number): string => {
    if (count >= 1000) {
      return `${Math.floor(count / 1000)}k`;
    }
    return count.toString();
  };

  const reposCount = userData?.public_repos || 0;

  return (
    <div className="w-full h-fit flex justify-between">
      <button 
        onClick={() => setActiveTab("repositories")}
        className={`flex items-center gap-2 w-fit ${
          activeTab === "repositories" 
            ? "border-b-2 border-laranja text-preto" 
            : "border-b-2 border-transparent text-cinza"
        }`}
      >
        <span className={`p-2 flex items-center gap-2 text-sm`}>
          <GoRepo className="w-6 h-6"/>
          Repositories
        </span>
        <span className="w-auto min-w-10 px-2 h-5 rounded-full border-[1px] text-cinza bg-background-cinza border-cinza flex items-center justify-center text-xs">
          {formatCount(reposCount)}
        </span>
      </button>
      
      <button 
        onClick={() => setActiveTab("starred")}
        className={`flex items-center gap-2 w-fit ${
          activeTab === "starred" 
            ? "border-b-2 border-laranja text-preto" 
            : "border-b-2 border-transparent text-cinza"
        }`}
      >
        <span className={`p-2 flex items-center gap-2 text-sm`}>
          <GoStar className="w-6 h-6"/>
          Starred
        </span>
        <span className="w-auto min-w-10 px-2 h-5 rounded-full border-[1px] text-cinza bg-background-cinza border-cinza flex items-center justify-center text-xs">
          {formatCount(starredCount)}
        </span>
      </button>
    </div>
  );
}