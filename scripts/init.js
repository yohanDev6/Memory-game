$(document).ready(function() {
    class Card {
        constructor(id, frontImg) {
            this.id = id;
            this.frontImg = frontImg;
            this.status = STATUS.BACK;
        }
    }

    const STATUS = {
        BACK: "BACK",
        FRONT: "FRONT",
        FOUND: "FOUND"
    };

    let $board = $("#board");

    // Imagens
    let frontCards = [
        "../imgs/dojutsus/byakugan.jpg",
        "../imgs/dojutsus/jogan.jpg",
        "../imgs/dojutsus/rinnegan.jpg",
        "../imgs/dojutsus/sannin-mode.jpg",
        "../imgs/dojutsus/sharingan.jpg"
    ];

    let cardsObject = [];
    let cardPairs = frontCards.concat(frontCards); // Duplicar as imagens para criar pares

    // Embaralha as cartas
    cardPairs.sort(() => 0.5 - Math.random());

    for (let i = 0; i < cardPairs.length; i++) {
        let $card = $('<div>', { id: i, class: 'card' });

        let cardObject = new Card(i, cardPairs[i]);
        cardsObject.push(cardObject);

        let $innerCard = $('<div>', { class: 'innerCard' });
        let $backCard = $('<div>', { class: 'backCard' });
        let $frontCard = $('<div>', { class: 'frontCard' });
        $frontCard.css('background-image', `url(${cardPairs[i]})`);
        $frontCard.css('border-radius', '12px');

        $innerCard.append($backCard);
        $innerCard.append($frontCard);
        $card.append($innerCard);
        $board.append($card);

        $card.on('click', function() {
            $(this).toggleClass('flipped');
            let id = $(this).attr('id');
            cardsObject[id].status = STATUS.FRONT;
        });
    }
});