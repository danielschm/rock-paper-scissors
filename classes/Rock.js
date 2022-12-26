class Rock extends Type {
    constructor() {
        super(window.imgRock);
    }

    static factory() {
        return new Rock();
    }

    getKiller() {
        return Paper;
    }

    getColor() {
        return "red";
    }
}