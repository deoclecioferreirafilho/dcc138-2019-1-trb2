// Imagens
var assetsMng = new AssetsManager();
assetsMng.loadImage("fundoBase", "assets/fundobase.jpg");
assetsMng.loadImage("fundo", "assets/midground.png");
assetsMng.loadImage("player", "assets/palhaco2.png");
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

var cena1 = new Scene({ ctx: ctx, w: canvas.width, h: canvas.height, assets: assetsMng });
var fundoBase = new Sprite({ x: 0, y: 0, w: canvas.width, h: canvas.height, desenhar: desenhaFundoBase });
var fundo = new Sprite({ x: 0, y: 0, w: canvas.width, h: canvas.height, desenhar: desenhaFundo });
var pc = new Sprite({ x: 100, y: canvas.height/2, w: 150, h: 82, comportar: porTeclasDirecionais(teclas) }); //, props: { tipo: "pc" }, desenhar: desenhaPC
cena1.adicionar(fundoBase);
cena1.adicionar(fundo);
cena1.adicionar(pc);

function desenhaFundoBase() {
    ctx.drawImage(
        this.scene.assets.img("fundoBase"),
        0, 0,
        this.w,
        this.h
    );
    ctx.restore();
}

function desenhaFundo() {
    ctx.drawImage(
        this.scene.assets.img("fundo"),
        0, 0,
        this.w,
        this.h
    );
    ctx.restore();
}



// Movimentos
function porTeclasDirecionais(teclas) {
    return function () {
        if (teclas.esquerda) { this.va = -2; }
        if (teclas.direita) { this.va = +2; }
        if (teclas.esquerda === teclas.direita) { this.va = 0; }
        if (teclas.cima) { this.vm = +120; }
        if (teclas.baixo) { this.vm = -120; }
        if (teclas.cima === teclas.baixo) { this.vm = 0; }
        if (teclas.espaco && this.cooldown <= 0) {
            var tiro = new Sprite({
                x: this.x, y: this.y,
                a: this.a - 0.1 + 0.2 * Math.random(),
                vm: 240, w: 10, h: 20,
                desenhar: desenhaTIRO,
                props: { tipo: "tiro" }
            });
            this.scene.adicionar(tiro);
            this.cooldown = 0.1;
            assetsMng.play("tiro");
        }
    }
}
addEventListener("keydown", function (e) {
    switch (e.keyCode) {
        case 32:
            teclas.espaco = 1;
            break;
        case 37:
            teclas.esquerda = 1;
            break;
        case 38:
            teclas.cima = 1;
            break;
        case 39:
            teclas.direita = 1;
            break;
        case 40:
            teclas.baixo = 1;
            break;
    }
});
addEventListener("keyup", function (e) {
    switch (e.keyCode) {
        case 32:
            teclas.espaco = 0;
            break;
        case 37:
            teclas.esquerda = 0;
            break;
        case 38:
            teclas.cima = 0;
            break;
        case 39:
            teclas.direita = 0;
            break;
        case 40:
            teclas.baixo = 0;
            break;
    }
});

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