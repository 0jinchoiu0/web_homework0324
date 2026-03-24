// 1. 更新右上角時間的功能
function updateTime() {
    const now = new Date();
    // 設定時間格式為台灣常見格式
    const timeString = now.toLocaleTimeString('zh-TW', { hour12: false });
    const timeElement = document.getElementById('current-time');
    
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// 每秒更新一次時間
setInterval(updateTime, 1000);
updateTime(); // 網頁載入時先執行一次

// 2. 倒數計時與進度條邏輯
const maxTime = 15; // 設定倒數秒數
let timeLeft = maxTime;

function startTimer() {
    const timer = setInterval(() => {
        timeLeft--;
        
        // 每次動態獲取 DOM 元素
        const countdownEl = document.getElementById('countdown');
        const progressBar = document.getElementById('progress-bar');
        const statusContainer = document.getElementById('status-container');
        
        // 更新畫面上的數字
        if (countdownEl) {
            countdownEl.textContent = timeLeft;
        }
        
        // 更新進度條寬度
        if (progressBar) {
            const percentage = (timeLeft / maxTime) * 100;
            progressBar.style.width = percentage + '%';
        }

        // 當時間倒數到 0 時
        if (timeLeft <= 0) {
            clearInterval(timer); // 停止計時器
            
            // 替換文字為「重新連線中」
            if (statusContainer) {
                statusContainer.innerHTML = '<span class="text-gray-800 font-bold"><i class="fa-solid fa-spinner fa-spin brand-text mr-2"></i>正在嘗試重新連線中...</span>';
            }
            if (progressBar) {
                progressBar.style.width = '100%';
            }
            
            // 模擬 3 秒後依然排不到，重置計時器繼續排隊
            setTimeout(() => {
                timeLeft = maxTime; 
                if (statusContainer) {
                    statusContainer.innerHTML = '系統將於 <span id="countdown" class="text-xl font-bold brand-text mx-1">15</span> 秒後自動為您重新連線...';
                }
                startTimer(); // 重新啟動倒數
            }, 3000);
        }
    }, 1000);
}

// 確保網頁的 HTML 都載入完成後，再啟動計時器
document.addEventListener('DOMContentLoaded', () => {
    startTimer();
});