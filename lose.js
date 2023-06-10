function renderLoseScreen() {
  const app = document.querySelector(".app");
  app.textContent = "";

  const title = document.createElement("h1");
  title.classList.add("title");
  title.textContent = "Игра";

  const content = document.createElement("div");
  content.classList.add("content");

  app.appendChild(title);
  app.appendChild(content);
  window.application.renderBlock(content, `loseblock`);
  window.application.renderBlock(content, `gotolobbyblock`);
  window.application.renderBlock(content, `buttonplay`);
}

function renderLoseBlock(container) {
  const lose = document.createElement("h2");
  lose.classList.add("lose__title", "subtitle");
  lose.textContent = "Упс..Кажется, вы проиграли!";
  const losePicture = document.createElement("img");
  losePicture.classList.add("final__image");
  losePicture.setAttribute("src", "cute.png");
  container.appendChild(lose);
  container.appendChild(losePicture);
}

window.application.blocks[`loseblock`] = renderLoseBlock;

window.application.screens[`losescreen`] = renderLoseScreen;
