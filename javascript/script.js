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
        gradient.addColorStop(0, 'rgba(211, 171, 233, 0.5)');
        gradient.addColorStop(1, 'rgba(178, 115, 211, 0.1)');

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

const container = document.querySelector(".bubble-container");

/*你的圖片清單
const images = [
    "img/001.png", // 測試圖片
    "img/002.png",
    "img/003.png"
];

// 生成泡泡的函式
function createBubble() {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    // 隨機選擇圖片
    const randomImg = images[Math.floor(Math.random() * images.length)];
    bubble.style.backgroundImage = `url(${randomImg})`;

    // 設定泡泡隨機大小
    let size = Math.random() * 60 + 50; // 40px ~ 100px
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    container.appendChild(bubble);

    // 設定泡泡的初始 3D 位置
    let startZ = Math.random() * -600 - 300; // 從更遠的地方開始 (-300 ~ -900px)
    let randomX = (Math.random(1,2) - 0.5) * 300; // 左右隨機偏移
    let randomY = (Math.random() - 0.5) * 300; // 上下隨機偏移
    let rotateZ = (Math.random() - 0.5) * 30; // 隨機旋轉角度

    // GSAP 讓泡泡浮現 & 消失
    gsap.fromTo(bubble,
        {
            opacity: 0,
            scale: 0.2,
            x: randomX,
            y: randomY,
            z: startZ,
            rotationZ: rotateZ
        },
        {
            opacity: 1,
            scale: 1.5,
            z: 0,
            duration: Math.random() * 2, // 3~5 秒浮動時間
            ease: "power1.out",
            onComplete: () => {
                gsap.to(bubble, {
                    opacity: 0,
                    scale: 2,
                    duration: 1,
                    onComplete: () => bubble.remove() // 移除泡泡，避免 DOM 堆積
                });
            }
        }
    );
}

// 每 800ms 生成一個泡泡
setInterval(createBubble, 3000);
*/



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
//title動畫
document.addEventListener("DOMContentLoaded", function () {
    let title = document.querySelector(".animate-title");

    let observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    title.classList.add("show"); // 加上 class 讓動畫開始
                    observer.unobserve(title); // 只觸發一次
                }
            });
        },
        { threshold: 0.5 } // 當 50% 標題進入畫面時觸發
    );

    observer.observe(title);
});
//OiO-introduce-img
document.addEventListener("DOMContentLoaded", () => {
    const mainImage = document.getElementById("mainImage");
    const hoverBlocks = document.querySelectorAll(".hover-block");

    let defaultImage = "img/OiO-introduce-img.png"; // 記錄原始圖片的路徑
    let isImageAtTop = false; // 用來追蹤圖片是否已經顯示在最上層

    // 點擊 hover-block，替換主圖片並顯示在最上層
    hoverBlocks.forEach(block => {
        block.addEventListener("click", (event) => {
            let newImage = block.getAttribute("data-image");
            mainImage.src = newImage;

            // 顯示在最上層
            if (!isImageAtTop) {
                mainImage.classList.add("top-position");
                isImageAtTop = true;
            }

            event.stopPropagation(); // 防止事件冒泡
        });
    });

    // 點擊其他地方恢復原始圖片並將圖片移回原來層級
    document.addEventListener("click", () => {
        if (isImageAtTop) {
            mainImage.src = defaultImage;
            mainImage.classList.remove("top-position");
            isImageAtTop = false;
        }
    });
});







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

