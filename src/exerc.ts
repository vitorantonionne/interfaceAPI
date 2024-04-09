interface propUserGitHub {
  id: number
  login: string
  name: string
  bio: string
  public_repos: number
  repos_url: string
  message?: "Not Found"
}

interface gitHubRepoResponse {
  name: string
  description: string
  fork: boolean
  stargazers_count: string
}

const users: propUserGitHub[] = []

async function userGit(username: string) {
  const urlAPI = `https://api.github.com/users/${username}`
  const response = await fetch(urlAPI)
  const user:propUserGitHub = await response.json()

  if (user.message) {
    console.log('Usuário não encontrado...');
  } else {
    users.push(user)

    console.log(`Usuário salvo -----
                \nId: ${user.id}
                \nLogin: ${user.login}
                \nNome: ${user.name}
                \nBio: ${user.bio}
                \nRepositório Públicos: ${user.public_repos}             
    `);
  }
}

async function userGitResponse(username: string) {
  const user = users.find(user => user.login === username)

  if(typeof user === 'undefined') {
    console.log('Usuário não encontrado');
  } else {
    const  response = await fetch(user.repos_url)
    const userRepos: gitHubRepoResponse[] = await response.json()

    let message = `Id: ${user.id}
                      \nLogin: ${user.login}
                      \nNome: ${user.name}
                      \nBio: ${user.bio}
                      \nRepositório Públicos: ${user.public_repos}`
    
    userRepos.forEach(repos =>
      message +=  `\nNome: ${repos.name}
                   \nDescrição: ${repos.description}
                   \nEstrelas: ${repos.stargazers_count}
                   \nÉ um fork: ${repos.fork}
      `
    )
  }
}

function usersList() {
  let message = ''

  users.forEach((personUser) => {
    message += `
            \nId: ${personUser.id}
            \nlogin: ${personUser.login}
            \nNome: ${personUser.name}
            \nBio: ${personUser.bio}
            \nRepositórios públicos: ${personUser.public_repos}
    `
  })
}