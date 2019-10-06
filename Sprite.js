function Sprite(params = {}) {
    var exemplo = {
        x: 10,
        y: 100,
        h: 32,
        w: 32,
        vx: 0,
        vy: 0,
        ax: 0,
        ay: 0,
        a: 0,
        vm: 0,
        props: {},
        cooldown: 0,
        va: 0,
        color: "blue",
        imune: 0,
        atirando: 0,
        scene: undefined,
        comportar: undefined
    }
    Object.assign(this, exemplo, params);
}

Sprite.prototype = new Sprite({});
Sprite.prototype.constructor = Sprite;

Sprite.prototype.desenhar = function (ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.a + Math.PI / 2);
    ctx.drawImage(
        this.scene.assets.img("player"),
        -this.w / 2,
        -this.h / 2,
        this.w,
        this.h
    );

    ctx.restore();
};

Sprite.prototype.mover = function (dt) {
    this.a = this.a + this.va * dt;

    this.vx = this.vm * Math.cos(this.a);
    this.vy = this.vm * Math.sin(this.a);

    this.x = this.x + this.vx * dt;
    this.y = this.y + this.vy * dt;

    this.cooldown = this.cooldown - dt;
}
Sprite.prototype.colidiuCom = function (alvo) {
    if (alvo.x + alvo.w / 2 < this.x - this.w / 2) return false;
    if (alvo.x - alvo.w / 2 > this.x + this.w / 2) return false;

    if (alvo.y + alvo.h / 2 < this.y - this.h / 2) return false;
    if (alvo.y - alvo.h / 2 > this.y + this.h / 2) return false;

    return true;
}