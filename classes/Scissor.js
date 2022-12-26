class Scissor extends Type {
    constructor() {
        super(window.imgScissor);
    }

    static factory() {
        return new Scissor();
    }

    getKiller() {
        return Rock;
    }

    getColor() {
        return "blue";
    }
}