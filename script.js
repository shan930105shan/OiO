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


const container = document.querySelector(".bubble-container");

// 切換語言
// 切換語言開關的事件監聽器

let translations = {};

// 讀取 CSV 並解析翻譯
fetch('data/translations.csv')
    .then(response => response.text())
    .then(text => {
        let rows = text.split("\n")
                        .map(row => row.trim())
                        .filter(row => row.length > 0)
                        .map(row => row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || []); 

        let headers = rows[0].slice(1).map(item => item.replace(/^"|"$/g, '').trim());

        rows.slice(1).forEach(row => {
            let key = row[0].replace(/^"|"$/g, '').trim();
            translations[key] = {};
            headers.forEach((lang, i) => {
                translations[key][lang] = row[i + 1] ? row[i + 1].replace(/^"|"$/g, '').trim() : "";
            });
        });

        let savedLanguage = localStorage.getItem("selectedLanguage") || "zh";
        document.getElementById("languageSelect").value = savedLanguage;
        switchLanguage(savedLanguage);
    })
    .catch(error => console.error("讀取 CSV 失敗:", error));

// 語言切換函式
function switchLanguage(lang) {
    localStorage.setItem("selectedLanguage", lang);

    document.querySelectorAll("[data-key]").forEach(element => {
        let key = element.getAttribute("data-key");
        if (translations[key] && translations[key][lang]) {
            if (element.tagName === "IMG") {
                if (!element.classList.contains("introduce-img") && !element.closest(".hover-block")) {
                    element.src = translations[key][lang];
                }
            } else {
                element.textContent = translations[key][lang];
            }
        }
    });

    // 更新所有 <source> 的語言對應圖片
    document.querySelectorAll('source[data-key]').forEach(source => {
        const key = source.getAttribute('data-key');
        if (translations[key] && translations[key][lang]) {
            source.srcset = translations[key][lang];
        }
    });
}

// 監聽 resize，自動重新套用語言設定（主要為圖片路徑切換）
window.addEventListener("resize", () => {
    const lang = document.getElementById("languageSelect").value;
    switchLanguage(lang);
});

// 語言選單變更事件
document.getElementById("languageSelect").addEventListener("change", function () {
    switchLanguage(this.value);
});

// 點擊 .introduce-img 更新主圖片
document.querySelectorAll(".introduce-img").forEach(img => {
    img.addEventListener("click", function () {
        const lang = document.getElementById("languageSelect").value;
        const key = this.getAttribute("data-key");

        if (translations[key] && translations[key][lang]) {
            document.getElementById("mainImage").src = translations[key][lang];
        }
    });
});

// hover-block 點擊事件：顯示對應的 popup 項目
document.addEventListener("DOMContentLoaded", () => {
    const hoverBlocks = document.querySelectorAll(".hover-block");

    hoverBlocks.forEach((block, index) => {
        block.addEventListener("click", (event) => {
            const popup = document.querySelector(`#popup-${index + 1}`);
            if (popup) {
                popup.style.display = "block";
                showPopup(popup.outerHTML);
            }

            event.stopPropagation(); // 防止事件冒泡導致關閉
        });
    });
});

// 顯示 popup 視窗
function showPopup(content) {
    const overlay = document.createElement("div");
    overlay.style.cssText = `
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.6);
        display: flex; align-items: center; justify-content: center;
        z-index: 9999;
    `;
    overlay.innerHTML = content;

    // 點擊任意處可關閉 popup
    overlay.addEventListener("click", () => {
        document.body.removeChild(overlay);
    });

    document.body.appendChild(overlay);
}


//互動手機監聽事件
//切換編輯平台教學
let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function updateDots() {
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.style.backgroundColor =" rgb(212, 172, 234)"; // 當前索引的 dot 變紫色
        } else {
            dot.style.backgroundColor = "gray"; // 其他的 dot 變灰色
        }
    });
}

function nextSlide() {
    slides[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add("active");
    updateDots();
}

function prevSlide() {
    slides[currentIndex].classList.remove("active");
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    slides[currentIndex].classList.add("active");
    updateDots();
}

// 初始化時執行一次更新 dots
updateDots();
        

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

// 推薦作品輪播僅電腦版
const images_rec = document.querySelectorAll(".slide_rec");
const slider = document.querySelector(".slider_rec");

let currentIndex_rec = 0;
let autoSlide = null;

// 更新圖片顯示（只限桌機）
function updateSlider() {
  images_rec.forEach((img) => {
    img.style.display = "none";
  });

  for (let i = 0; i < 4; i++) {
    const imgIndex = (currentIndex_rec + i) % images_rec.length;
    images_rec[imgIndex].style.display = "block";
  }
}

// 啟動桌機輪播
function startDesktopSlider() {
  updateSlider();
  autoSlide = setInterval(() => {
    currentIndex_rec = (currentIndex_rec + 1) % images_rec.length;
    updateSlider();
  }, 2000);
}

// 清除所有樣式（手機用）
function showAllImages() {
  clearInterval(autoSlide);
  images_rec.forEach((img) => {
    img.style.display = "block";
  });
}

// 根據螢幕寬度初始化
function handleResize() {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  if (isMobile) {
    showAllImages();
    slider.classList.add("mobile-mode");
    slider.classList.remove("desktop-mode");
  } else {
    currentIndex_rec = 0;
    startDesktopSlider();
    slider.classList.add("desktop-mode");
    slider.classList.remove("mobile-mode");
  }
}

// 初始執行一次
handleResize();

// 監聽視窗變化
window.addEventListener("resize", () => {
  handleResize();
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



