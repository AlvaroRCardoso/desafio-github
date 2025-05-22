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

interface GitHubContextType {
  userData: GitHubUser | null;
  starredCount: number;
  loading: boolean;
  error: string;
}

const GitHubContext = createContext<GitHubContextType | undefined>(undefined);

interface GitHubProviderProps {
  children: ReactNode;
  username: string;
}

export function GitHubProvider({ children, username }: GitHubProviderProps) {
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [starredCount, setStarredCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        
        const userResponse = await fetch(`/api/github/${username}`);
        
        if (!userResponse.ok) {
          const errorData = await userResponse.json();
          throw new Error(errorData.message || `Erro ${userResponse.status}`);
        }
        
        const userData = await userResponse.json();
        setUserData(userData);

        const starredResponse = await fetch(
          `https://api.github.com/users/${username}/starred?per_page=1`
        );
        
        if (starredResponse.ok) {
          const linkHeader = starredResponse.headers.get('Link');
          if (linkHeader) {
            const lastPageMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
            if (lastPageMatch) {
              setStarredCount(parseInt(lastPageMatch[1]));
            } else {
              const starredData = await starredResponse.json();
              setStarredCount(starredData.length);
            }
          } else {
            const starredData = await starredResponse.json();
            setStarredCount(starredData.length);
          }
        } else {
          console.warn('Não foi possível buscar repositórios com star');
          setStarredCount(0);
        }
        
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
    <GitHubContext.Provider value={{ userData, starredCount, loading, error }}>
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