import { useGitHub } from "@/contexts/GitHubContext";
import Project from "./Project";

export default function Repositories() {
  const { repositories, loadingRepos } = useGitHub();

  if (loadingRepos) {
    return (
      <div className="w-full flex justify-center py-8">
        <p className="text-cinza">Carregando repositórios...</p>
      </div>
    );
  }

  if (repositories.length === 0) {
    return (
      <div className="w-full flex justify-center py-8">
        <p className="text-cinza">Nenhum repositório encontrado.</p>
      </div>
    );
  }

  return (
    <>
      {repositories.map((repo) => (
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