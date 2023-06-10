function renderAuthScreen() {
  const app = document.querySelector(".app");
  app.textContent = "";

  const picture = document.createElement("div");
  picture.classList.add("picture");

  const title = document.createElement("h1");
  title.classList.add("title", "title_auth");
  title.textContent = "Камень, ножницы, бумага";

  const content = document.createElement("div");
  content.classList.add("content");

  app.appendChild(picture);
  app.appendChild(title);
  app.appendChild(content);
  window.application.renderBlock(content, "authorization");
}

function renderAuthorization(container) {
  const inputAuth = document.createElement("input");
  inputAuth.classList.add("input__auth");
  inputAuth.setAttribute("placeholder", "Введите Логин");
  const buttonAuth = document.createElement("button");
  buttonAuth.classList.add("button_auth", "button");
  buttonAuth.textContent = "Войти";

  container.appendChild(inputAuth);
  container.appendChild(buttonAuth);

  buttonAuth.addEventListener("click", () => {
    request({
      url: `${backURL}login`,
      params: {
        login: `${inputAuth.value}`,
      },
      onSuccess: (data) => {
        window.application.token = data.token;

        request({
          url: `${backURL}player-status`,
          params: {
            token: `${window.application.token}`,
          },
          onSuccess: (data) => {
            if (data["player-status"].status == "lobby") {
              window.application.renderScreen(`lobby`);
            }
            if (data["player-status"].status == "game") {
              window.application.renderScreen(`movescreen`);
            }
          },
        });
      },
    });
  });
}

window.application.blocks[`authorization`] = renderAuthorization;
window.application.screens[`auth`] = renderAuthScreen;
