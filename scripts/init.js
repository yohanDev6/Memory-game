 class Card {
    constructor(backImg, frontImg){
        this.backImg = backImg;
        this.frontImg = frontImg;
        this.status = BACK;
    }

    turnCard(){
        if (this.status == STATUS.BACK) {
            this.status == STATUS.FRONT;
        } else if (this.status == STATUS.FRONT){
            this.status == STATUS.BACK;
        }
    }
 }

 //status enum
 const STATUS = {
    BACK: "BACK",
    FRONT: "FRONT",
    FOUND: "FOUND"
 };