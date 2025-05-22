import { GoChevronDown, GoSearch } from "react-icons/go";

export default function Filters() {
  return (
    <div className="w-full bg-background-cinza rounded-[8px] flex items-center px-2 py-3 my-4 justify-between">
      <div className="flex items-center gap-1.5">
        <button className="text-background rounded-full bg-link text-xs flex items-center gap-2.5 p-2 pr-6">
          <GoChevronDown className="w-4 h-4" />
          Type
        </button>
        <button className="text-background rounded-full bg-link text-xs flex items-center gap-2.5 p-2 pr-6">
          <GoChevronDown className="w-4 h-4" />
          Language
        </button>
      </div>

      <GoSearch className="text-link w-6 h-6" />
    </div>
  );
}
