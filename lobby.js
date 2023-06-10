function renderLobbyScreen() {
    const app = document.querySelector('.app');
    app.textContent = '';

    const title = document.createElement('h1');
    title.classList.add('title');
    title.textContent = 'Лобби';

    const content = document.createElement('div');
    content.classList.add('content');


    app.appendChild(title);
    app.appendChild(content);
    window.application.renderBlock(content, 'playerlist');
    window.application.renderBlock(content, `buttonplay`);


}

function renderPlayerList(container) {
    const playerList = document.createElement('ul');
    playerList.classList.add('lobby__list');
    playerList.textContent = 'Список игроков:';
    container.appendChild(playerList);

    let playerStatusIntervalId = setInterval(() => {
        request({
            url: `${backURL}player-list`,
            onSuccess: (data) => {
                while(playerList.lastElementChild){
                    playerList.removeChild(playerList.lastElementChild);
                }

                for (let index = 0; index < data.list.length; index++) {
                    let player = data.list[index].login;
                    console.log(player);
                    let playerName = document.createElement('li');
                    playerName.classList.add('players');
                    playerName.textContent = player;
                    playerList.appendChild(playerName);
                 
                }
            }
        })
    }, 1000);

    window.application.timers.push(playerStatusIntervalId);

   
        

}

function renderButtonPlay(container) {
    const buttonPlay = document.createElement('button');
    buttonPlay.classList.add('lobby__button', 'button');
    buttonPlay.textContent = 'Играть!';
    container.appendChild(buttonPlay);

    buttonPlay.addEventListener('click', () => {
        request({
            url: `${backURL}start`,
            params: {
                token: `${window.application.token}`,
            },
            onSuccess: (data) => {
                let gameId = data["player-status"].game.id;
                window.application.id = gameId;
                console.log(window.application.id);
                if(window.application.id) {
                    window.application.renderScreen('waiting');
                }///////////////////
                
            }
        })
        
    });
 
}

window.application.blocks[`playerlist`] = renderPlayerList;
window.application.blocks[`buttonplay`] = renderButtonPlay;
window.application.screens[`lobby`] = renderLobbyScreen;


