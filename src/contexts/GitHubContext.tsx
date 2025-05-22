import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface GitHubUser {
  name: string;
  login: string;
  avatar_url: string;
  bio: string;
  company: string | null;
  location: string | null;
  blog: string | null;
  html_url: string;
  followers: number;
  following: number;
  twitter_username: string | null;
  public_repos: number;
}

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  private: boolean;
}

interface GitHubContextType {
  userData: GitHubUser | null;
  repositories: Repository[];
  starredRepos: Repository[];
  starredCount: number;
  loading: boolean;
  error: string;
  loadingRepos: boolean;
  loadingStarred: boolean;
}

const GitHubContext = createContext<GitHubContextType | undefined>(undefined);

interface GitHubProviderProps {
  children: ReactNode;
  username: string;
}

export function GitHubProvider({ children, username }: GitHubProviderProps) {
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [starredRepos, setStarredRepos] = useState<Repository[]>([]);
  const [starredCount, setStarredCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [loadingStarred, setLoadingStarred] = useState(false);
  const [error, setError] = useState("");

  // Função para buscar repositórios
  const fetchRepositories = async () => {
    try {
      setLoadingRepos(true);
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`);
      
      if (response.ok) {
        const repos = await response.json();
        setRepositories(repos);
      } else {
        console.warn('Não foi possível buscar repositórios');
      }
    } catch (err) {
      console.error('Erro ao buscar repositórios:', err);
    } finally {
      setLoadingRepos(false);
    }
  };

  // Função para buscar repositórios com star
  const fetchStarredRepos = async () => {
    try {
      setLoadingStarred(true);
      const response = await fetch(`https://api.github.com/users/${username}/starred?per_page=30`);
      
      if (response.ok) {
        const starred = await response.json();
        setStarredRepos(starred);
        
        // Também pega o count total
        const linkHeader = response.headers.get('Link');
        if (linkHeader) {
          const lastPageMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
          if (lastPageMatch) {
            setStarredCount(parseInt(lastPageMatch[1]));
          } else {
            setStarredCount(starred.length);
          }
        } else {
          setStarredCount(starred.length);
        }
      } else {
        console.warn('Não foi possível buscar repositórios com star');
      }
    } catch (err) {
      console.error('Erro ao buscar starred:', err);
    } finally {
      setLoadingStarred(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        
        // Busca dados do usuário
        const userResponse = await fetch(`/api/github/${username}`);
        
        if (!userResponse.ok) {
          const errorData = await userResponse.json();
          throw new Error(errorData.message || `Erro ${userResponse.status}`);
        }
        
        const userData = await userResponse.json();
        setUserData(userData);

        // Busca repositórios e starred em paralelo
        await Promise.all([
          fetchRepositories(),
          fetchStarredRepos()
        ]);
        
      } catch (err: any) {
        console.error("Erro ao buscar dados do perfil:", err);
        setError(err.message || "Falha ao carregar dados do perfil");
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchData();
    } else {
      setLoading(false);
      setError("Nome de usuário não fornecido");
    }
  }, [username]);

  return (
    <GitHubContext.Provider value={{ 
      userData, 
      repositories,
      starredRepos,
      starredCount, 
      loading, 
      loadingRepos,
      loadingStarred,
      error 
    }}>
      {children}
    </GitHubContext.Provider>
  );
}

export function useGitHub() {
  const context = useContext(GitHubContext);
  if (context === undefined) {
    throw new Error('useGitHub deve ser usado dentro de um GitHubProvider');
  }
  return context;
}