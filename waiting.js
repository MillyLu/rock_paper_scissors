function renderWaitingScreen() {
    const app = document.querySelector('.app');
    app.textContent = '';

    const title = document.createElement('h1');
    title.classList.add('title');
    title.textContent = 'Игра';

    const content = document.createElement('div');
    content.classList.add('content');


    app.appendChild(title);
    app.appendChild(content);
    window.application.renderBlock(content, 'waitinggame');



}

function renderWaitingGame(container) {
    const waitingGame = document.createElement('h2');
    waitingGame.classList.add('waiting__title', 'subtitle');
    waitingGame.textContent = 'Ожидаем начала игры...';
    container.appendChild(waitingGame);
    page = 'waiting';

    let gameStatusSetInterval = setInterval(getGameStatus, 500);

    window.application.timers.push(gameStatusSetInterval);
}



window.application.blocks[`waitinggame`] = renderWaitingGame;

window.application.screens[`waiting`] = renderWaitingScreen;


function getGameStatus() {
    request({
        url: `${backURL}game-status`,
        params: {
            token: `${window.application.token}`,
            id: `${window.application.id}`
        },
        onSuccess: (data) => {

            if(page == 'waiting' && data["game-status"].status != 'waiting-for-start') {
                enemy = data["game-status"].enemy.login;
                window.application.renderScreen('movescreen');
            }
            if(data["game-status"].status == "waiting-for-enemy-move") {
                window.application.renderScreen(`competitorscreen`);
            } else if(data["game-status"].status == "waiting-for-your-move") {
                window.application.renderScreen('movescreen');
            } else if(data["game-status"].status == "lose") {
                window.application.renderScreen('losescreen');
            } else if(data["game-status"].status == "win") {
                window.application.renderScreen('winscreen');
            } 
        }    

        
    });
}


