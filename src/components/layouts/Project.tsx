import { GoGitBranch, GoStarFill } from "react-icons/go";

export default function Project() {
  return (
    <div className="w-full flex flex-col justify-center py-4 gap-2">
      <h3 className="text-md text-preto font-light">Node / <span className="text-link font-normal">Releace</span></h3>
      <p className="text-xs text-cinza">Node.js Foundation Release Working Group.</p>
      <div className="flex items-center gap-3 text-preto text-xs">
        <span className="flex gap-2 items-center"><GoStarFill className="w-5 h-5" /> 0</span>
        <span className="flex gap-2 items-center"><GoGitBranch className="w-5 h-5" /> 0</span>
      </div>
    </div>
  );
}
