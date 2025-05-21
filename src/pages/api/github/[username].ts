import { NextApiRequest, NextApiResponse } from 'next';

type GitHubUserResponse = {
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
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { username } = req.query;
  
  if (!username || Array.isArray(username)) {
    return res.status(400).json({ 
      error: 'Nome de usuário inválido ou ausente' 
    });
  }
  
  if (username.startsWith('re_')) {
    username = username.substring(3);
  }
  
  try {
    console.log("API chamada para username:", username);
    
    const token = process.env.GITHUB_TOKEN;
    
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json'
    };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else {
      console.log("Aviso: Nenhum token do GitHub encontrado nas variáveis de ambiente");
    }
    
    const apiUrl = `https://api.github.com/users/${username}`;
    console.log("Fazendo requisição para:", apiUrl);
    
    const response = await fetch(apiUrl, {
      headers: {
        ...headers,
        'User-Agent': 'NextJS-App'
      }
    });
    
    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Resposta de erro da API do GitHub (${response.status}):`, errorBody);
      console.error(`URL completa utilizada: https://api.github.com/users/${username}`);
      throw new Error(`Erro na API do GitHub: ${response.status} - ${errorBody}`);
    }
    
    const data = await response.json();
    
    const filteredData: GitHubUserResponse = {
      name: data.name,
      login: data.login,
      avatar_url: data.avatar_url,
      bio: data.bio,
      company: data.company,
      location: data.location,
      blog: data.blog,
      html_url: data.html_url,
      followers: data.followers,
      following: data.following,
      twitter_username: data.twitter_username
    };
    
    return res.status(200).json(filteredData);
  } catch (error: any) {
    console.error('Erro ao buscar dados do GitHub:', error);
    
    return res.status(500).json({ 
      error: 'Falha ao buscar dados do perfil do GitHub',
      message: error.message 
    });
  }
}