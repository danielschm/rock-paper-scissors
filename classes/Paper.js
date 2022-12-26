class Paper extends Type {
    constructor() {
        super(window.imgPaper);
    }

    static factory() {
        return new Paper();
    }

    getKiller() {
        return Scissor;
    }

    getColor() {
        return "white";
    }

}