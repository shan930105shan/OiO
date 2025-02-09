const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');

let width, height;

// 調整 canvas 尺寸
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// 定義泡泡類別
class Bubble {
    constructor() {
        this.radius = Math.random() * 100 + 150; // 更大尺寸
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.5; 
        this.vy = (Math.random() - 0.5) * 1.5;
        this.blur = Math.random() * 30 + 10; // 增加模糊程度
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x - this.radius > width) this.x = -this.radius;
        if (this.x + this.radius < 0) this.x = width + this.radius;
        if (this.y - this.radius > height) this.y = -this.radius;
        if (this.y + this.radius < 0) this.y = height + this.radius;
    }

    draw(ctx) {
        ctx.filter = `blur(${this.blur}px)`; // 模糊化泡泡
        ctx.globalCompositeOperation = 'lighter'; // 顏色融合

        const gradient = ctx.createRadialGradient(
            this.x, this.y, this.radius * 0.3,  
            this.x, this.y, this.radius         
        );
        gradient.addColorStop(0, 'rgba(200, 100, 255, 0.5)');
        gradient.addColorStop(1, 'rgba(255, 150, 250, 0.1)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

// 產生泡泡
const bubbles = [];
for (let i = 0; i < 8; i++) bubbles.push(new Bubble());

function animate() {
    ctx.clearRect(0, 0, width, height);
    bubbles.forEach(bubble => {
        bubble.update();
        bubble.draw(ctx);
    });
    requestAnimationFrame(animate);
}
animate();
