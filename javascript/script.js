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


// 切換語言
// 切換語言開關的事件監聽器
document.getElementById("langSwitch").addEventListener("change", function() {
    let langText = document.getElementById("langText");
    let selectedLang = this.checked ? "en" : "zh";  // 根據開關狀態選擇語言

    langText.textContent = selectedLang === "en" ? "EN" : "中"; // 更新切換開關旁邊的文字
    switchLanguage(selectedLang); // 確保語言切換函式被執行
});

// 語言切換函式
function switchLanguage(lang) {
    const translations = {
        "en": {
            "about us": "About us",
            "introduce": "Introduce",
            "application": "Application",
            "other": "Other",
            "Paragraph 1": "OiO Editor is a powerful editing platform that combines GPS technology, online content, interactive mechanisms, IoT devices, cloud computing, artificial intelligence, and e-commerce to achieve smarter and interactive urban design.",
            "OiO-int-1": "img/OiO-int-1-EN.png",
            "OiO-int-2": "img/OiO-int-2-EN.png",
            "OiO-int-3": "img/OiO-int-3-EN.png",
            "OiO-int-4": "img/OiO-int-4-EN.png",
            "OiO-int-5": "img/OiO-int-5-EN.png",
            "OiO-int-6": "img/OiO-int-6-EN.png",
            "OiO-APP-introduce-1": "img/image_about_OiO-EN.png",
            "OiO-APP-introduce-2": "img/image_about_OiO-2-EN.png",
            "introduceA-text": "Click to watch the<br> introduction and enrich<br> your travel experience!!",
            "introduceB-text": "The GPS triggering<br> mechanism is like <br>providing tourists with <br>a guided tour with their<br> own guide",
            "introduceC-text": "Enable AI to recognize <br>buildings and jump out <br>of the attraction's<br> content, doubling the fun!",
            "OiO-Editing-Platform":"img/OiO-Editing-Platform-EN.png",
            "question-1": "What is the main function of this website?",
            "answer-1": "Our website offers a tour guide service that recommends nearby attractions based on your GPS location.",
            "question-2": "How can I use the OiO Editor?",
            "answer-2": "YAll you need to do is allow access to your GPS location and the system will automatically recommend the most suitable attraction information.",
            "question-3": "Is this app free to use?",
            "answer-3": "Yes, our basic tour features are free, but some advanced features may require a paid subscription.",
            "about-us": "img/AboutUs-EN.png",
        },
        "zh": {
            "about us": "關於我們",
            "introduce": "OiO介紹",
            "application": "使用手冊",
            "other": "其他",
            "Paragraph 1": "OiO編輯器是一個強大的編輯平台，結合了GPS技術、線上內容、互動機制、物聯網設備、雲端運算、人工智慧和電子商務，實現更智慧和互動的城市設計。",
            "OiO-int-1": "img/OiO-int-1.png",
            "OiO-int-2": "img/OiO-int-2.png",
            "OiO-int-3": "img/OiO-int-3.png",
            "OiO-int-4": "img/OiO-int-4.png",
            "OiO-int-5": "img/OiO-int-5.png",
            "OiO-int-6": "img/OiO-int-6.png",
            "OiO-APP-introduce-1": "img/image_about_OiO.png",
            "OiO-APP-introduce-2": "img/image_about_OiO-2.png",
            "introduceA-text": "點擊景點即可觀看更<br>深入的景點介紹，豐<br>富旅遊體驗!!",
            "introduceB-text": "為遊客提供個人沉浸式<br>導覽體驗，GPS觸發機制<br>就像是有專屬導遊提供<br>在地化、專人化的導覽",
            "introduceC-text": "啟用AI辨識，AI 場景<br>建物識別，跳出該景點的<br>內容，樂趣加倍!",
            "OiO-Editing-Platform":"img/OiO-Editing-Platform.png",
            "question-1": "如何使用導覽功能？",
            "answer-1": "我們的網站提供一項導覽服務，根據您的GPS位置推薦附近的景點。",
            "question-2": "如何使用OiO編輯器？",
            "answer-2": "您只需允許存取您的 GPS 位置，系統將自動推薦最適合的景點資訊。",
            "question-3": "這個應用程式是否免費使用？",
            "answer-3": "是的，我們的基本導覽功能是免費的，部分進階功能可能需要付費訂閱。",
            "about-us": "img/AboutUs.png",

        }
    };

    // 切換文本和圖片，更新 hover-block 的 data-image 屬性但不改變 OiO-introduce-img
    document.querySelectorAll("[data-key]").forEach(element => {
        const key = element.getAttribute("data-key");
        if (translations[lang][key]) {
            if (element.tagName === "IMG" && !element.id.startsWith("introduce-img-")) {
                element.src = translations[lang][key];
            } else {
                element.innerHTML = translations[lang][key];
            }
        }
    });

    // 更新 hover-block 中的 data-image 屬性，但不改變 OiO-introduce-img-1、2、3、4、5、6 的 src
    document.querySelectorAll(".hover-block").forEach(block => {
        const key = block.querySelector("img").getAttribute("data-key");
        if (translations[lang][key]) {
            block.setAttribute("data-image", translations[lang][key]);
        }
    });
}

// 添加点击事件，切换 mainImage 的路径
document.querySelectorAll(".introduce-img").forEach(img => {
    img.addEventListener("click", function() {
        const lang = getCurrentLanguage(); // 假設這裡是您當前語言的變量或函數
        const key = this.getAttribute("data-key");
        const newSrc = translations[lang][key];

        if (newSrc) {
            document.getElementById("mainImage").src = newSrc;
        }
    });
});

// 確保 hover-block 的圖片保持不變
document.querySelectorAll(".hover-block img").forEach(img => {
    img.classList.add("hover-block-img");
});




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

//互動手機監聽事件

//切換編輯平台教學
let currentIndex = 0;
const images = ['img/Editing-PlatformA.png', 'img/Editing-PlatformB.png', 'img/Editing-PlatformC.png'];
const dots = document.querySelectorAll('.dot');
const imageElement = document.getElementById('Editing-Platform-image');

document.getElementById('nextButton').addEventListener('click', function() {
  currentIndex = (currentIndex + 1) % images.length;
  updateImage();
  updateDots();
});

document.getElementById('prevButton').addEventListener('click', function() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateImage();
  updateDots();
});

function updateImage() {
  imageElement.src = images[currentIndex];
}

function updateDots() {
  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

//常見問題手風琴
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.accordion-button').forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            let content = this.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });
});

//推薦作品
let currentIndex_rec = 0; // 目前顯示的圖片起始索引
const images_rec = document.querySelectorAll(".slide_rec");
const totalImages = images_rec.length;

// 更新圖片顯示
function updateSlider() {
  for (let i = 0; i < images_rec.length; i++) {
    const imgIndex = (currentIndex_rec + i) % totalImages; // 計算每張圖片的索引（循環）
    images_rec[i].src = `img/recommend-img${imgIndex + 1}.png`; // 更新圖片源
    // 根據索引顯示或隱藏圖片
    if (i >= 4) {
      images_rec[i].style.display = 'none'; // 超過四張的圖片隱藏
    } else {
      images_rec[i].style.display = 'block'; // 顯示前四張圖片
    }
  }
}

// 自動輪播，每2秒切換
let autoSlide = setInterval(() => {
  currentIndex_rec = (currentIndex_rec + 1) % totalImages; // 每2秒輪播一張
  updateSlider();
}, 2000);

// 當鼠標懸停在圖片上時停止輪播
document.querySelector(".slider_rec").addEventListener("mouseenter", () => {
  clearInterval(autoSlide); // 停止輪播
});

// 當鼠標離開圖片時恢復輪播
document.querySelector(".slider_rec").addEventListener("mouseleave", () => {
  autoSlide = setInterval(() => {
    currentIndex_rec = (currentIndex_rec + 1) % totalImages; // 每2秒輪播一張
    updateSlider();
  }, 2000);
});

// 初始顯示
updateSlider();






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

