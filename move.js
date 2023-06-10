function renderMoveScreen() {
  const app = document.querySelector(".app");
  app.textContent = "";

  const title = document.createElement("h1");
  title.classList.add("title");
  title.textContent = "Игра";

  const content = document.createElement("div");
  content.classList.add("content");

  app.appendChild(title);
  app.appendChild(content);
  window.application.renderBlock(content, `move`);
}

function renderMoveBlock(container) {
  const move = document.createElement("h2");
  move.classList.add("move__title", "subtitle");
  move.textContent = "Ваш ход";
  container.appendChild(move);

  const youEnemy = document.createElement("p");
  youEnemy.classList.add("move__enemy");
  youEnemy.textContent = `Вы против - ${enemy}`;
  container.appendChild(youEnemy);

  const moveButtonRock = document.createElement("button");
  moveButtonRock.textContent = `Камень`;
  moveButtonRock.classList.add("move__button", "button", "button__rock");
  moveButtonRock.setAttribute("value", "rock");

  const moveButtonScissors = document.createElement("button");
  moveButtonScissors.textContent = "Ножницы";
  moveButtonScissors.classList.add(
    "move__button",
    "button",
    "button__scissors"
  );
  moveButtonScissors.setAttribute("value", "scissors");

  const moveButtonPaper = document.createElement("button");
  moveButtonPaper.textContent = "Бумага";
  moveButtonPaper.classList.add("move__button", "button", "button__paper");
  moveButtonPaper.setAttribute("value", "paper");

  container.appendChild(moveButtonRock);
  container.appendChild(moveButtonScissors);
  container.appendChild(moveButtonPaper);

  const moveButtons = document.querySelectorAll(".move__button");
  console.log(moveButtons);

  moveButtons.forEach((button) =>
    button.addEventListener("click", (e) => {
      const target = e.target;
      console.log(target.value);
      request({
        url: `${backURL}play`,
        params: {
          token: `${window.application.token}`,
          id: `${window.application.id}`,
          move: `${target.value}`,
        },
        onSuccess: (data) => {
          console.log(data);
          if (data["game-status"].status == "waiting-for-enemy-move") {
            window.application.renderScreen(`competitorscreen`);
          } else if (data["game-status"].status == "waiting-for-your-move") {
            window.application.renderScreen(`movescreen`);
          } else if (data["game-status"].status == "lose") {
            window.application.renderScreen(`losescreen`);
          } else if (data["game-status"].status == "win") {
            window.application.renderScreen(`winscreen`);
          }

          console.log(target.value);
        },
      });
    })
  );
}

window.application.blocks[`move`] = renderMoveBlock;

window.application.screens[`movescreen`] = renderMoveScreen;
