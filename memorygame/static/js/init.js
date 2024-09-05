class Card {
    constructor(id, frontImg) {
        this.id = id;
        this.frontImg = frontImg;
        this.status = STATUS.BACK;
    }
  }
  
  class Timer {
    constructor(displayElement) {
        this.displayElement = displayElement;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.interval = null;
        this.running = false;
    }
  
    start() {
        if (!this.running) {
            this.startTime = Date.now() - this.elapsedTime;
            this.interval = setInterval(() => this.update(), 10);
            this.running = true;
        }
    }
  
    stop() {
        if (this.running) {
            clearInterval(this.interval);
            this.elapsedTime = Date.now() - this.startTime;
            this.running = false;
        }
    }
  
    reset() {
        this.stop();
        this.elapsedTime = 0;
        this.updateDisplay();
    }
  
    update() {
        this.elapsedTime = Date.now() - this.startTime;
        this.updateDisplay();
    }
  
    updateDisplay() {
        let totalMilliseconds = Math.floor(this.elapsedTime);
        let milliseconds = Math.floor((totalMilliseconds % 1000) / 10);
        let seconds = Math.floor((totalMilliseconds / 1000) % 60);
        let minutes = Math.floor((totalMilliseconds / (1000 * 60)) % 60);
  
        seconds = this.pad(seconds);
        minutes = this.pad(minutes);
        milliseconds = this.pad(milliseconds, 2);
  
        this.displayElement.text(`${minutes}:${seconds}:${milliseconds}`);
    }
  
    pad(number, length = 2) {
        return number.toString().padStart(length, '0');
    }
  }
  
  // Inicializa o temporizador
  let $timer = $('#timer');
  let timer = new Timer($timer);
  let initTimer = false;
  
  // Contador de tentativas
  let countTentativas = 0;
  let $tentativas = $('#tentativas');
  $tentativas.text('').text(countTentativas);
  
  const STATUS = {
    BACK: "BACK",
    FRONT: "FRONT",
    FOUND: "FOUND",
  };
  
  // Tabuleiro
  let $board = $("#board");
  
  // Imagens
  let frontCards = [
    "/imgs/dojutsus/byakugan.jpg",
    "/imgs/dojutsus/jogan.jpg",
    "/imgs/dojutsus/rinnegan.jpg",
    "/imgs/dojutsus/sannin-mode.jpg",
    "/imgs/dojutsus/sharingan.jpg",
  ];
  
  let cardsObject = [];
  let cardPairs = frontCards.concat(frontCards); // Duplicar as imagens para criar pares
  
  // Embaralha as cartas
  cardPairs.sort(() => 0.5 - Math.random());
  
  // Cria e renderiza as cartas no tabuleiro
  for (let i = 0; i < cardPairs.length; i++) {
    let $card = $("<div>", { id: i, class: "card" });
  
    let cardObject = new Card(i, cardPairs[i]);
    cardsObject.push(cardObject);
  
    let $innerCard = $("<div>", { class: "innerCard" });
    let $backCard = $("<div>", { class: "backCard" });
    let $frontCard = $("<div>", { class: "frontCard" });
    $frontCard.css("background-image", `url(${cardPairs[i]})`);
  
    $innerCard.append($backCard);
    $innerCard.append($frontCard);
    $card.append($innerCard);
    $board.append($card);
  
    $card.on("click", function () {
        if (!$(this).hasClass("flipped") && !$(this).hasClass("disabled")) {
            $(this).toggleClass("flipped");
            let id = $(this).attr("id");
            cardsObject[id].status = STATUS.FRONT;
            updateVarCards(cardsObject[id]);
        }
    });
  }
  
  // Guarda as cartas clicadas para comparação
  let varCards = {
    card1: -1,
    card2: -1,
  };
  
  function addTentativas(){
    countTentativas += 1;
    $tentativas.text('').text(countTentativas);
  }
  
  // Atualiza as cartas guardadas
  function updateVarCards(cardObject) {
    if (!initTimer) {
        timer.start();
        initTimer = true;
    }
    if (varCards.card1 === -1) {
        varCards.card1 = cardObject.id;
    } else if (varCards.card2 === -1) {
        varCards.card2 = cardObject.id;
  
        // Quando duas viram, todas as outras são bloqueadas
        blockCards();
  
        // Verifica as cartas
        setTimeout(() => {
            verifyCards();
            // Libera as cartas com exceção das já encontradas
            unblockCards();
        }, 1000); // Tempo de atraso antes de virar as cartas de volta
    }
  }
  
  function blockCards() {
    $(".card").addClass("disabled"); // Adiciona uma classe para desabilitar cliques
  }
  
  function unblockCards() {
    $(".card").removeClass("disabled"); // Remove a classe para permitir cliques novamente
    $(".card").each(function () {
        if (
            $(this).hasClass("flipped") &&
            cardsObject[$(this).attr("id")].status === STATUS.BACK
        ) {
            $(this).removeClass("flipped");
        }
    });
  }
  
  function verifyCards() {
    if (varCards.card1 !== -1 && varCards.card2 !== -1) {
      addTentativas();
        if (
            cardsObject[varCards.card1].frontImg ===
                cardsObject[varCards.card2].frontImg &&
            cardsObject[varCards.card1].id !== cardsObject[varCards.card2].id
        ) {
            cardsObject[varCards.card1].status = STATUS.FOUND;
            cardsObject[varCards.card2].status = STATUS.FOUND;
            $(`#${varCards.card1}`).off("click");
            $(`#${varCards.card2}`).off("click");
        } else {
            // Se as cartas não combinarem, vira-as de volta após o atraso
            $(`#${varCards.card1}`).removeClass("flipped");
            $(`#${varCards.card2}`).removeClass("flipped");
            cardsObject[varCards.card1].status = STATUS.BACK;
            cardsObject[varCards.card2].status = STATUS.BACK;
        }
        varCards.card1 = -1;
        varCards.card2 = -1;
    }
    if (anyBodyWon()) {
        timer.stop();
        alert("Parabéns! Você ganhou.");
    }
  }
  
  function anyBodyWon() {
    return cardsObject.every((card) => card.status === STATUS.FOUND);
  }