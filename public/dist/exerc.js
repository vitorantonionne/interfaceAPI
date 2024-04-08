const users = [];
async function userGitResponse(username) {
    const urlAPI = `https://api.github.com/users/${username}`;
    const response = await fetch(urlAPI);
    const user = await response.json();
    if (user.message) {
        console.log('Usuário não encontrado');
    }
    else {
        users.push(user);
        console.log(`Usuário encontrado
                  \nid: ${user.id}
                  \nlogin: ${user.login}
                  \nNome: ${user.name}
                  \nBio: ${user.bio}
                  \nRepositórios públicos: ${user.public_repos}`);
    }
}
userGitResponse('vitorantonionne');
