import { useState, useEffect } from "react";
import Image from "next/image";
import { GoChevronDown, GoLink, GoLocation, GoOrganization } from "react-icons/go";
import { FaInstagram } from "react-icons/fa";

// Interface para os dados que esperamos da API
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
}

export default function Perfil() {
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Nome de usuário do GitHub
  const username = "AlvaroRCardoso";
  // const username = "gabrielcordeiro-dev";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(`/api/github/re_${username}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Erro ${response.status}`);
        }
        
        const data = await response.json();
        setUserData(data);
      } catch (err: any) {
        console.error("Erro ao buscar dados do perfil:", err);
        setError(err.message || "Falha ao carregar dados do perfil");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const toggleAdditionalInfo = () => {
    setShowAdditionalInfo(!showAdditionalInfo);
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center p-6">
        <p>Carregando dados do perfil...</p>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="w-full flex justify-center items-center p-6">
        <p>{error || "Não foi possível carregar os dados do perfil"}</p>
      </div>
    );
  }

  const instagram = "AlvaroRCardoso";

  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <div className="relative w-[100px] h-[100px]">
        <Image
          src={userData.avatar_url || "/vercel.svg"}
          alt={`Imagem de Perfil de ${userData.name}`}
          width={100}
          height={100}
          className="rounded-full bg-background min-h-[100px]"
        />
        <div className="bg-background w-7 h-7 rounded-full text-[12px] flex justify-center items-center absolute right-0 bottom-0">
          😎
        </div>
      </div>
      
      <div className="text-center max-w-57">
        <h1 className="text-lg text-preto font-bold">{userData.name}</h1>
        <h2 className="text-cinza text-xs font-normal">{userData.bio}</h2>
      </div>
      
      <div className="w-full flex flex-col items-center gap-1">
        <button
          onClick={toggleAdditionalInfo}
          className="text-link flex flex-col items-center"
        >
          <p className="text-xs font-normal">Informações Adicionais</p>
          <div className={`transition-transform duration-300 ${showAdditionalInfo ? 'rotate-180' : ''}`}>
            <GoChevronDown className="w-6 h-6" />
          </div>
        </button>

        <div 
          className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${
            showAdditionalInfo 
              ? 'max-h-60 opacity-100 transform translate-y-0' 
              : 'max-h-0 opacity-0 transform -translate-y-4'
          }`}
        >
          <ul className="flex flex-col gap-2.5 p-4 rounded-2xl bg-background-cinza text-link">
            {userData.company && (
              <li className="flex items-center gap-2">
                <GoOrganization />
                <span className="text-xs">{userData.company}</span>
              </li>
            )}
            
            {userData.location && (
              <li className="flex items-center gap-2">
                <GoLocation />
                <span className="text-xs">{userData.location}</span>
              </li>
            )}
            
            {userData.blog && (
              <li className="flex items-center gap-2">
                <GoLink />
                <span className="text-xs">{userData.blog}</span>
              </li>
            )}
            
            {instagram && (
              <li className="flex items-center gap-2">
                <FaInstagram />
                <span className="text-xs">{instagram}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}