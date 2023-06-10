function renderCompetitorScreen() {
    const app = document.querySelector('.app');
    app.textContent = '';

    const title = document.createElement('h1');
    title.classList.add('title');
    title.textContent = 'Игра';

    const content = document.createElement('div');
    content.classList.add('content');


    app.appendChild(title);
    app.appendChild(content);
    window.application.renderBlock(content, `competitor`);



}

function renderCompetitorBlock(container) {
    const competitorMove = document.createElement('h2');
    competitorMove.classList.add('competitor__title', 'subtitle');
    competitorMove.textContent = 'Ожидаем ход соперника...';
    container.appendChild(competitorMove);
    page = 'competitor';
    let gameStatusSetInterval = setInterval(getGameStatus, 500);

    window.application.timers.push(gameStatusSetInterval);

    

}



window.application.blocks[`competitor`] = renderCompetitorBlock;

window.application.screens[`competitorscreen`] = renderCompetitorScreen;