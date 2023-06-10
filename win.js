function renderWinScreen() {
  const app = document.querySelector(".app");
  app.textContent = "";

  const title = document.createElement("h1");
  title.classList.add("title");
  title.textContent = "Игра";

  const content = document.createElement("div");
  content.classList.add("content");

  app.appendChild(title);
  app.appendChild(content);
  window.application.renderBlock(content, `winblock`);
  window.application.renderBlock(content, `gotolobbyblock`);
  window.application.renderBlock(content, `buttonplay`);
}

function renderWinBlock(container) {
  const win = document.createElement("h2");
  win.classList.add("win__title", "subtitle");
  win.textContent = "Ура! Вы выиграли!";
  const winPicture = document.createElement("img");
  winPicture.classList.add("final__image");
  winPicture.setAttribute("src", "happy.png");
  container.appendChild(win);
  container.appendChild(winPicture);
}

function renderGoToLobbyBlock(container) {
  const buttonToLobby = document.createElement("button");
  buttonToLobby.classList.add("win__button_lobby", "button");
  buttonToLobby.textContent = "Перейти в лобби";
  container.appendChild(buttonToLobby);

  buttonToLobby.addEventListener("click", () => {
    window.application.renderScreen("lobby");
  });
}

window.application.blocks[`winblock`] = renderWinBlock;

window.application.blocks[`gotolobbyblock`] = renderGoToLobbyBlock;

window.application.screens[`winscreen`] = renderWinScreen;
