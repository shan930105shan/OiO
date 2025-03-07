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
    let selectedLang = this.checked ? "en" : "zh";  // 根据开关状态选择语言

    langText.textContent = selectedLang === "en" ? "EN" : "中"; // 更新切换开关旁边的文字
    switchLanguage(selectedLang); // 確保傳遞的是選擇的語言

});

// 語言切換函式
function switchLanguage(lang) {
    const translations = {
        "en": {
            "about us": "About us",
            "introduce": "Introduce",
            "application": "Application",
            "other": "Other",
            "Home-page":"img/首頁圖-EN.gif",
            "Paragraph 1": "OiO Editor is a powerful editing platform that combines GPS technology, online content, interactive mechanisms, IoT devices, cloud computing, artificial intelligence, and e-commerce to achieve smarter and interactive urban design.",
            "OiO-int-1": "img/OiO-int-1-EN.png",
            "OiO-int-2": "img/OiO-int-2-EN.png",
            "OiO-int-3": "img/OiO-int-3-EN.png",
            "OiO-int-4": "img/OiO-int-4-EN.png",
            "OiO-int-5": "img/OiO-int-5-EN.png",
            "OiO-int-6": "img/OiO-int-6-EN.png",
            "OiO-APP-introduce-1": "img/image_about_OiO-EN.png",
            "Paragraph-introduce-part1-1":"OiO Editor is a powerful urban design platform that integrates GPS, <br>interactive content, IoT, cloud, AI and e-commerce to make urban life <br>smarter and more interesting! Through GPS technology, you can <br>explore new surprises in the city anytime and anywhere.<br><br><br>",
            "Paragraph-introduce-part1-2":"OiO can also allow city equipment to operate intelligently and <br>collaboratively, improve efficiency, synchronize and store data at any <br>time, and put it at your fingertips. Artificial intelligence delivers <br>personalized content and analytics to optimize city management. <br>Merchants can also easily open online stores to drive economic <br>development.",
            "OiO-APP-introduce-2": "img/image_about_OiO-2-EN.png",
            "Paragraph-introduce-part2":"OiO is a platform that combines GPS, AR, and AI to provide <br>interactive tours and personalized content, allowing you to <br>explore the city through your mobile phone.",
            "Paragraph-introduce-part3":"OiO promotes business marketing and digital education, and <br>also allows users to enjoy endless fun while exploring the city. <br>From GPS positioning to AR interaction, every exploration is <br>full of surprises!",
            "Phone-image-mobile":"img/mobile-Phone-EN.png",
            "introduceA-text": "Click to watch the<br> introduction and enrich<br> your travel experience!!",
            "introduceB-text": "The GPS triggering<br> mechanism is like <br>providing tourists with <br>a guided tour with their<br> own guide",
            "introduceC-text": "Enable AI to recognize <br>buildings and jump out <br>of the attraction's<br> content, doubling the fun!",
            "OiO-Editing-Platform":"img/OiO-Editing-Platform-EN.png",
            "question-1": "Is this app free? The APP is free to download, and some of the electronic content it contains requires payment.", 
            "answer-1": "The APP is free to download, and some of the electronic content it contains requires payment.", 
            "question-2": "Do I have to turn on GPS authorization?", 
            "answer-2": "Yes, most electronic content will be triggered by GPS, giving you an exclusive tour guide-like experience.", 
            "question-3": "Do electronic contents have to be downloaded? ", 
            "answer-3": "In order to ensure that your user experience is not affected by network connection problems, our electronic contents need to be downloaded before use. ", 
            "question-4": "Can I still experience electronic content without the Internet?", 
            "answer-4": "After opening the electronic content, as long as the APP is not closed, you can still perform non-connected application operations, including but not limited to GPS-triggered, recognition-triggered images, audio files, AR orientation guidance and other electronic content.", 
            "question-5": "Can the downloaded electronic content be removed?", 
            "answer-5": "It can be removed and re-downloaded in the purchased e-book list, but the built-in The trigger record will be deleted when removed, and the GPS trigger will be reset. Please confirm whether to delete it. ",
            "question-6": "Why can't I find the OiO app download on Google Play and App store?", 
            "answer-6": "Please first confirm whether the mobile operating system has been upgraded to Android13 / iOS 11 or above. If the system has met the minimum operating environment requirements and still cannot find the OiO App, please contact us by email and we will help you troubleshoot the problem.",
            "about-us": "img/AboutUs-EN.png",
            "OiO-APP-introduce-mobile":"img/mobile_image_about_OiO-EN.png",
            "OiO-APP-introduce-mobile-2":"img/mobile_image_about_OiO-2-EN.png",
            "mobile-OiO-Editing-Platform":"img/mobile-OiO-Editing-Platform-EN.png",
            "mobile-AboutUs":"img/mobile-AboutUs-EN.png",
            "FAQ":"FAQ",
            "Detailed-user-manual":"Detailed user manual", 
            "Privacy-statement":"Privacy statement", 
            "Download":"How to download OiO APP?", 
            "Contact-us":"Contact us", 
            "Phone":"Tel: 02-21001400", 
            "Address":"Address: 1st Floor, No. 19, Lane 218, Jilin Road, Zhongshan District, Taipei City"
        },
        "zh": {
            "about us": "關於我們",
            "introduce": "OiO介紹",
            "application": "使用手冊",
            "other": "其他",
            "Home-page":"img/首頁圖.gif",
            "Paragraph 1": "OiO編輯器是一個強大的編輯平台，結合了GPS技術、線上內容、互動機制、物聯網設備、雲端運算、人工智慧和電子商務，實現更智慧和互動的城市設計。",
            "OiO-int-1": "img/OiO-int-1.png",
            "OiO-int-2": "img/OiO-int-2.png",
            "OiO-int-3": "img/OiO-int-3.png",
            "OiO-int-4": "img/OiO-int-4.png",
            "OiO-int-5": "img/OiO-int-5.png",
            "OiO-int-6": "img/OiO-int-6.png",
            "OiO-APP-introduce-1": "img/image_about_OiO.png",
            "Paragraph-introduce-part1-1":"OiO編輯器是一個超強的城市設計平台，將GPS、互動內容、物聯網、雲端、<br>AI和電子商務融合在一起，讓城市生活更智慧、更有趣！透過GPS技術，所有<br>資訊和內容都能精準地帶到你身邊，讓你隨時隨地探索城市新驚喜。<br><br><br>",
            "Paragraph-introduce-part1-2":"OiO還能讓城市設備智慧協同運作，提高效率，隨時同步和儲存資料，讓你隨<br>手查看。AI根據你的需求提供個性化內容，並分析數據來優化城市管理。商家<br>也能輕鬆開設網店，帶動城市經濟發展。",
            "OiO-APP-introduce-2": "img/image_about_OiO-2.png",
            "Paragraph-introduce-part2":"OiO是一個結合GPS、AR、AI等技術的智慧城市平台，提供互動<br>式導覽和個性化內容，讓使用者透過手機探索城市、享受沉浸式<br>體驗。<br>",
            "Paragraph-introduce-part3":"OiO不僅促進了商業行銷和數位教育，也透過互動式導覽和沉浸<br>式體驗，讓使用者在探索城市的同時，享受無窮的樂趣。從GPS<br>定位到AR互動，每一次探索充滿了驚喜！",
            "Phone-image-mobile":"img/mobile-Phone.png",
            "introduceA-text": "點擊景點即可觀看更<br>深入的景點介紹，豐<br>富旅遊體驗!!",
            "introduceB-text": "為遊客提供個人沉浸式<br>導覽體驗，GPS觸發機制<br>就像是有專屬導遊提供<br>在地化、專人化的導覽",
            "introduceC-text": "啟用AI辨識，AI 場景<br>建物識別，跳出該景點的<br>內容，樂趣加倍!",
            "OiO-Editing-Platform":"img/OiO-Editing-Platform.png",
            "question-1": "這個應用程式是免費的嗎？	APP是免費下載的，內含的電子內容有部分需付費體驗",
            "answer-1": "APP是免費下載的，內含的電子內容有部分需付費體驗。",
            "question-2": "一定要開啟GPS授權嗎？",
            "answer-2": "是的，多數電子內容會使用GPS觸發，讓您有專屬導覽員般的體驗。",
            "question-3": "電子內容一定要下載嗎？",
            "answer-3": "為使您的使用體驗盡可能不被網路連線問題所影響，我們的電子內容都需要下載後才能使用。",
            "question-4": "在沒有網路的狀態下還能體驗電子內容嗎？",
            "answer-4": "在開啟電子內容後，只要不關閉APP，仍可進行非連網的應用操作，包含但不限於GPS觸發、辨識觸發之圖像、音檔、AR方位指引等電子內容。",
            "question-5": "已經下載的電子內容能不能移除？",
            "answer-5": "可以移除，並可在已購入電子書清單中重新下載，但內建的觸發紀錄會於移除時一併刪除，GPS觸發將會重置，請務必確認是否刪除。",
            "question-6": "為什麼在Google Play 及 App store 找不到 OiO 應用程式下載？",
            "answer-6": "請先確認手機作業系統是否已升級至 Android13 / iOS 11 以上，若系統已達最低作業環境需求仍未找到OiO App，請來信與我們聯繫，我們會協助您排除問題。",
            "about-us": "img/AboutUs.png",
            "OiO-APP-introduce-mobile":"img/mobile_image_about_OiO.png",
            "OiO-APP-introduce-mobile-2":"img/mobile_image_about_OiO-2.png",
            "mobile-OiO-Editing-Platform":"img/mobile-OiO-Editing-Platform.png",
            "mobile-AboutUs":"img/mobile-AboutUs.png",
            "FAQ":"常見問題",
            "Detailed-user-manual":"詳細使用手冊",
            "Privacy-statement":"隱私權說明",
            "Download":"如何下載 OiO APP？",
            "Contact-us":"聯絡我們",
            "Phone":"電話: 02-21001400",
            "Address":"地址: 台北市中山區吉林路218巷19號1樓"
        }
    };

     // 获取所有包含 data-key 属性的 <source> 元素
     const sources = document.querySelectorAll('source[data-key]');

     sources.forEach(source => {
         const key = source.getAttribute('data-key'); // 获取 data-key 的值
         if (translations[lang] && translations[lang][key]) {
             source.srcset = translations[lang][key]; // 更新 srcset
         }
     });
    // 讓 <picture> 重新載入，確保 <source> 更新
    //imgElement.parentElement.load();
     // 触发图片的重新加载，确保图片路径和替代文本正确
    

    // 切换文本和图片，更新 hover-block 的 data-image 属性但不改变 OiO-introduce-img
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

    // 更新 hover-block 中的 data-image 属性，但不改变 OiO-introduce-img-1、2、3、4、5、6 的 src
    document.querySelectorAll(".hover-block").forEach(block => {
        const key = block.querySelector("img").getAttribute("data-key");
        if (translations[lang][key]) {
            block.setAttribute("data-image", translations[lang][key]);
        }
    });

}

function getCurrentLang() {
    return document.querySelector("#langSwitch").checked ? "en" : "zh";
}

function updateDataImage() {
    const lang = getCurrentLang(); 
    
    document.querySelectorAll(".hover-block").forEach(block => {
        const img = block.querySelector("img");
        const key = img.getAttribute("data-key");

        let imagePath = "";

        if (window.innerWidth <= 768) {
            imagePath = `img/mobile-${key}${lang === "en" ? "-EN" : ""}.png`;
        } else {
            imagePath = `img/${key}${lang === "en" ? "-EN" : ""}.png`;
        }

        block.setAttribute("data-image", imagePath);
        // **如果這個 block 是主要顯示的，則同步更新 main-image**
        if (block.classList.contains("active")) { // 假設有個 class 標記當前的主圖片
            newMainImagePath = imagePath;
        }
        });

        // **更新 main-image 的 src**
        const mainImage = document.querySelector("#mainImage");
        if (mainImage && newMainImagePath) {
            mainImage.src = newMainImagePath;
        }
        if (mainImage) {
            // 找到目前 hover-block 的 data-image，並設置給 main-image
            const firstBlock = document.querySelector(".hover-block");
            if (firstBlock) {
                mainImage.src = firstBlock.getAttribute("data-image");
            }
        }
}

// **監聽視窗大小變化**
window.addEventListener("resize", updateDataImage);

// **監聽語言切換**
document.addEventListener("languageChange", updateDataImage);
document.querySelector("#langSwitch").addEventListener("change", () => {
    updateDataImage();
});
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



