window.onload = async function () {
    await loadImages();
    setup();
    window.gameInterval = setInterval(function () {
        draw();
        update();
    }, 20);
};

function setup() {
    window.width = document.getElementById("canvas").width;
    window.height = document.getElementById("canvas").height;
    window.res = 60;
    window.entityCount = 20;
    window.entitySpeed = 4;
    window.entities = [];
    spawnEntities();
}

async function loadImages() {
    const fnLoadImg = (src) => {
        const oImage = new Image();
        oImage.src = src;
        return new Promise(resolve => {
            oImage.onload = () => {
                resolve(oImage);
            }
        })
    }

    window.imgPaper = await fnLoadImg("./img/paper.webp");
    window.imgRock = await fnLoadImg("./img/stone.webp");
    window.imgScissor = await fnLoadImg("./img/scissor.webp");
}

function spawnEntities() {
    for (let i = 0; i < window.entityCount; i++) {
        window.entities.push(new Entity(getRandomX(), getRandomY(), new Paper()));
    }

    for (let i = 0; i < window.entityCount; i++) {
        window.entities.push(new Entity(getRandomX(), getRandomY(), new Rock()));
    }

    for (let i = 0; i < window.entityCount; i++) {
        window.entities.push(new Entity(getRandomX(), getRandomY(), new Scissor()));
    }
}

function getRandomX() {
    return Math.round(Math.random() * window.width / window.res);
}

function getRandomY() {
    return Math.round(Math.random() * window.height / window.res);
}

function draw() {
    const ctx = getCtx();

    // --------------- background --------------------------------------
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.width, this.height);

    window.entities.forEach(e => e.draw());
}

function update() {
    window.entities.forEach(e => e.update());
}

function getCtx() {
    return document.getElementById("canvas").getContext("2d");
}