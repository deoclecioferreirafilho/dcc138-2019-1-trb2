// Imagens
var assetsMng = new AssetsMenager();
assetsMng.loadImage("fundo", "assets/midground.png");
console.log(assetsMng);

// Canvas
var canvas = document.querySelector("canvas");
canvas.width = 960;
canvas.height = 512;
var ctx = canvas.getContext("2d");

// Variáveis

var teclas = {
    espaco: 0,
    esquerda: 0,
    cima: 0,
    direita: 0,
    baixo: 0
}

var cena1 = new Scene({ ctx: ctx, w: canvas.width, h: canvas.height });
var fundo = new Sprite({ x: 0, y: 0, w: canvas.width, h: canvas.height, desenhar: desenhaFundo });
cena1.adicionar(fundo);

function desenhaFundo() {
    // ctx.save();
    // ctx.translate(this.x, this.y);
    //  ctx.rotate(this.a - Math.PI / 2);
    ctx.drawImage(
        this.scene.assets.img("fundo"),
        // this.w,
        // this.h,
        0, 0,
        this.w,
        this.h
    );
    ctx.restore();
}

function passo(t) {
    dt = (t - anterior) / 1000;
    if (assetsMng.progresso() === 100) {
        cena1.passo(dt);
    }
    anterior = t;
    ctx.fillText(1 / dt, 10, 20);
    requestAnimationFrame(passo);
}
var dt, anterior = 0;
requestAnimationFrame(passo);