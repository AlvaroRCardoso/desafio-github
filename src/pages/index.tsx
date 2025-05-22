import { useState } from "react";
import { GitHubProvider } from "@/contexts/GitHubContext";
import Perfil from "@/components/layouts/Perfil";
import Tabs from "@/components/layouts/Tabs";
import Repositories from "@/components/layouts/Repositories";
import Starred from "@/components/layouts/Starred";
import Filters from "@/components/layouts/Filters";

type TabType = "repositories" | "starred";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("repositories");
  
  // Username centralizado aqui
  const username = "AlvaroRCardoso";

  return (
    <GitHubProvider username={username}>
      <div className="px-6 py-10 box-border w-full h-full">
        <Perfil />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <Filters />
        {activeTab === "repositories" && <Repositories />}
        {activeTab === "starred" && <Starred />}
      </div>
    </GitHubProvider>
  );
}