import type { NextApiRequest, NextApiResponse } from 'next';

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

interface GitHubApiError {
  message: string;
  documentation_url?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GitHubUser | { error: string; message?: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username } = req.query;

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ 
      error: 'Username is required',
      message: 'Por favor forneça um nome de usuário válido'
    });
  }

  try {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'GitHub-Profile-App'
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers
    });

    if (response.status === 404) {
      return res.status(404).json({
        error: 'User not found',
        message: `Usuário '${username}' não encontrado no GitHub`
      });
    }

    if (response.status === 403) {
      const resetTime = response.headers.get('X-RateLimit-Reset');
      return res.status(403).json({
        error: 'Rate limit exceeded',
        message: 'Limite de requisições excedido. Tente novamente mais tarde.'
      });
    }

    if (!response.ok) {
      const errorData: GitHubApiError = await response.json();
      return res.status(response.status).json({
        error: 'GitHub API error',
        message: errorData.message || `Erro ${response.status} da API do GitHub`
      });
    }

    const userData: GitHubUser = await response.json();
    
    console.log(`✅ Dados do usuário ${username} obtidos com sucesso`);
    
    return res.status(200).json(userData);

  } catch (error) {
    console.error('❌ Erro ao buscar usuário do GitHub:', error);
    
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Erro interno do servidor. Tente novamente.'
    });
  }
}