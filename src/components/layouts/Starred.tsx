import { useGitHub } from "@/contexts/GitHubContext";
import Project from "./Project";

export default function Starred() {
  const { starredRepos, loadingStarred } = useGitHub();

  if (loadingStarred) {
    return (
      <div className="w-full flex justify-center py-8">
        <p className="text-cinza">Carregando repositórios com star...</p>
      </div>
    );
  }

  if (starredRepos.length === 0) {
    return (
      <div className="w-full flex justify-center py-8">
        <p className="text-cinza">Nenhum repositório com star encontrado.</p>
      </div>
    );
  }

  return (
    <>
      {starredRepos.map((repo) => (
        <Project 
          key={repo.id}
          name={repo.name}
          fullName={repo.full_name}
          description={repo.description}
          language={repo.language}
          stars={repo.stargazers_count}
          forks={repo.forks_count}
          url={repo.html_url}
        />
      ))}
    </>
  );
}