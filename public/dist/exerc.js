const users = [];
async function userGit(username) {
    const urlAPI = `https://api.github.com/users/${username}`;
    const response = await fetch(urlAPI);
    const user = await response.json();
    if (user.message) {
        console.log('Usuário não encontrado...');
    }
    else {
        users.push(user);
        console.log(`Usuário salvo -----
                \nId: ${user.id}
                \nLogin: ${user.login}
                \nNome: ${user.name}
                \nBio: ${user.bio}
                \nRepositório Públicos: ${user.public_repos}             
    `);
    }
}
async function userGitResponse(username) {
    const user = users.find(user => user.login === username);
    if (typeof user === 'undefined') {
        console.log('Usuário não encontrado');
    }
    else {
        const response = await fetch(user.repos_url);
        const userRepos = await response.json();
        let message = `Id: ${user.id}
    \nLogin: ${user.login}
    \nNome: ${user.name}
    \nBio: ${user.bio}
    \nRepositório Públicos: ${user.public_repos}`;
        userRepos.forEach(repos => {
            message += `\nNome: ${repos.name}
      \nDescrição: ${repos.description}
      \nEstrelas: ${repos.stargazers_count}
      \nÉ um fork: ${repos.fork}
      `;
        });
        console.log(message);
    }
}
function usersList() {
    users.forEach((personUser) => {
        let message = `
            \nId: ${personUser.id}
            \nlogin: ${personUser.login}
            \nNome: ${personUser.name}
            \nBio: ${personUser.bio}
            \nRepositórios públicos: ${personUser.public_repos}
    `;
        console.log(message);
    });
}
function showUserTotal() {
    const repoTotal = users.map((personRepo) => {
        personRepo.public_repos = personRepo.public_repos + personRepo.public_repos;
        return personRepo.public_repos;
    });
    const totalRepo = repoTotal.reduce((a, b) => a + b, 0);
    return totalRepo;
}
function listRepoTopFive() {
    const topFive = users.slice().sort((a, b) => b.public_repos - a.public_repos).slice(0, 5);
    let textTopFive = `Top 5 usuários com mais repositórios
                    \nPosição --- Nome --- Repositório`;
    topFive.forEach((userItem, index) => {
        textTopFive += `\n${index + 1} = ${userItem.name} - ${userItem.public_repos}`;
    });
    console.log(textTopFive);
}
