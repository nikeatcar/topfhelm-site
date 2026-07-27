const canvas = document.getElementById("logoFog");
const ctx = canvas.getContext("2d");

function resizeCanvas() {

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const fog = [];
const dust = [];

for(let i=0;i<10;i++){



}

function spawnDust(){

    if(Math.random()<0.02){

        dust.push({

            x:-20,

            y:Math.random()*canvas.height,

            vx:0.6+Math.random()*0.8,

            vy:-0.15+Math.random()*0.3,

            size:1+Math.random()*2,

            alpha:.6

        });

    }

}

function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Туман

    fog.forEach(f=>{

        f.x+=f.speed;

        if(f.x-f.r>canvas.width){

            f.x=-f.r;

        }

        const g=ctx.createRadialGradient(
            f.x,
            f.y,
            0,
            f.x,
            f.y,
            f.r
        );

        g.addColorStop(0,`rgba(255,255,255,${f.alpha})`);
        g.addColorStop(1,"rgba(255,255,255,0)");

        ctx.fillStyle=g;
        ctx.beginPath();
        ctx.arc(f.x,f.y,f.r,0,Math.PI*2);
        ctx.fill();

    });

    // Пылинки

    spawnDust();

    for(let i=dust.length-1;i>=0;i--){

        const p=dust[i];

        p.x+=p.vx;
        p.y+=p.vy;

        ctx.fillStyle=`rgba(215,179,122,${p.alpha})`;

        ctx.beginPath();
        ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
        ctx.fill();

        if(p.x>canvas.width+20){

            dust.splice(i,1);

        }

    }

    requestAnimationFrame(draw);

}

draw();