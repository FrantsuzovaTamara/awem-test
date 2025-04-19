class TESTapi {
  constructor() {
    this.log("Инициализация API", "#007bff");
    this.globalInit();
  }

  log(message, color = "black") {
    console.log(
      `%c[PLAYABLE]%c ${message}`,
      `background: #222; color: ${color}; padding: 2px 4px; border-radius: 3px; font-weight: bold;`,
      "color: black; font-weight: normal;"
    );
  }

  globalInit() {
    window.playableGoToStore = () => {
      this.log("Игрок нажал «Установить» → переход в стор", "green");
    };

    window.playableLoaded = () => {
      this.log("Плейбл загружен и готов к отображению", "orange");
    };

    window.playableFinished = () => {
      this.log("Плейбл завершён", "red");
    };

    window.playableStarted = () => {
      this.log("Плейбл начался", "purple");
    };
  }
}

export default TESTapi;
