class Entity {
    constructor(x, y, type) {
        this.type = type;
        this.xDraw = x * window.res;
        this.yDraw = y * window.res;
        this.x = x;
        this.y = y;
        this.res = 60;
        this.ctx = document.getElementById("canvas").getContext("2d");
        this.changeRandomSpeed();
    }

    update() {
        this.xDraw = this.xDraw + this.xSpeed;
        if (this.xDraw + this.res > window.width && this.xSpeed > 0) {
            this.xSpeed *= -1;
        } else if (this.xDraw < 0 && this.xSpeed < 0) {
            this.xSpeed *= -1;
        }

        this.yDraw = this.yDraw + this.ySpeed;
        if (this.yDraw + this.res > window.height && this.ySpeed > 0) {
            this.ySpeed *= -1;
        } else if (this.yDraw < 0 && this.ySpeed < 0) {
            this.ySpeed *= -1;
        }

        this.x = Math.round(this.xDraw / window.res);
        this.y = Math.round(this.yDraw / window.res);

        this.checkCollision();
    }

    draw() {
        // this.ctx.fillStyle = "green";
        // this.ctx.fillRect(this.x * window.res, this.y * window.res, window.res, window.res);

        // this.ctx.fillStyle = this.type.getColor();
        // const size = this.res / 2;
        // this.ctx.beginPath();
        // this.ctx.ellipse(this.xDraw + size, this.yDraw + size, size, size, 0, 0, 180);
        // this.ctx.fill();

        this.ctx.drawImage(this.type.image, this.xDraw, this.yDraw, this.res, this.res);
    }

    checkCollision() {
        const oCollidedEntity = window.entities.find(e => {
            return e.x === this.x && e.y === this.y && e !== this;
        });
        if (oCollidedEntity) {
            this.onCollision(oCollidedEntity);
        }
    }

    onCollision(oEntity) {
        if (oEntity.type instanceof this.type.getKiller()) {
            this.type = this.type.getKiller().factory();
            this.changeRandomSpeed();
        }
    }

    changeRandomSpeed() {
        const iDirection = Math.random() > 0.5 ? 1 : -1;
        this.xSpeed = (Math.round(Math.random() * window.entitySpeed) + 1) * iDirection;
        this.ySpeed = (Math.round(Math.random() * window.entitySpeed) + 1) * iDirection;
    }
}