interface propUserGitHub {
  id: number
  login: string
  name: string
  bio: string
  public_repos: number
  repos_url: string
  message?: "Not Found"
}

interface GitHubRepoResponse {
  name: string
  description: string
  fork: boolean
  stargazers_count: string
}

const users: propUserGitHub[] = []

async function userGitResponse(username: string) {
  const urlAPI = `https://api.github.com/users/${username}`
  const response = await fetch(urlAPI)
  const user: propUserGitHub = await response.json()

  if (user.message) {
    console.log('Usuário não encontrado')
  } else {
    users.push(user)

    console.log(`Usuário encontrado
                  \nid: ${user.id}
                  \nlogin: ${user.login}
                  \nNome: ${user.name}
                  \nBio: ${user.bio}
                  \nRepositórios públicos: ${user.public_repos}`
    );
  }
} 