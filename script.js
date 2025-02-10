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

document.getElementById("langSwitch").addEventListener("change", function() {
    if (this.checked) {
        document.getElementById("langLabel").textContent = "中";
        switchLanguage("zh");
    } else {
        document.getElementById("langLabel").textContent = "EN";
        switchLanguage("en");
    }
});

function switchLanguage(lang) {
    const translations = {
        "en": {
            "about us": "About us",
            "introduce": "Introduce",
            "application": "Application",
            "other": "Other",
            "Paragraph 1" : "OiO Editor is a powerful editing platform that combines GPS technology, online content, interactive mechanisms, IoT devices, cloud computing, artificial intelligence and e-commerce to achieve smarter and interactive urban design."
        },
        "zh": {
            "about us": "關於我們",
            "introduce": "介紹",
            "application": "應用",
            "other": "其他",
            "Paragraph 1" : "OiO編輯器是一個強大的編輯平台，結合了GPS技術、線上內容、互動機制、物聯網設備、雲端運算、人工智慧和電子商務，實現更智慧和互動的城市設計。"
        }
    };

    // 切換菜單的文字
    document.querySelectorAll("#menu ul li a").forEach(link => {
        const key = link.getAttribute("data-key");
        if (translations[lang][key]) {
            link.textContent = translations[lang][key];
        }
    });

    // 切換頁面中內容的文字
    document.querySelectorAll("[data-key]").forEach(element => {
        const key = element.getAttribute("data-key");
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// 監聽所有具有 "fade-in" 類別的元素
const fadeInElements = document.querySelectorAll('.fade-in');

// 創建 IntersectionObserver 來監聽每個元素是否進入視口
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // 當元素進入視口時，添加 "visible" 類別
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);  // 一旦元素已顯示後停止監控
        }
    });
}, { threshold: 0.5 });  // 只有當元素進入視口 50% 時才觸發

// 為每個元素註冊監控
fadeInElements.forEach(element => {
    observer.observe(element);
});

