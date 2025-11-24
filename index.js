const playcr = document.getElementById("playcr");
const scorepoint = document.getElementById("score");
const block = document.getElementById("block");
const bestscr = document.getElementById("bestscr");

// time between jump
const jumpTime = 750;
function jump() {
    if (!playcr.classList.contains('jump')) {
        playcr.classList.add('jump');
        setTimeout(() => playcr.classList.remove('jump'), jumpTime);
    }
}


// BEST SCORE INIT
if (!localStorage.getItem("bestscr")) {
    localStorage.setItem("bestscr", 0);
}

// SCORE

let point = 0;

// حاول تستخدم 60ms أو قيمة مناسبة للـ game loop
const intervalId = setInterval(() => {
    point++;
    scorepoint.textContent = "Score: " + point;

    // تحويل القيمة لرقم (وضع 0 إذا ما كان فيه قيمة مخزنة)
    let best = Number(localStorage.getItem("bestscr")) || 0;

    if (point > best) {
        localStorage.setItem("bestscr", point);
        bestscr.textContent = "Best Score: " + point;
    } else {
        bestscr.textContent = "Best Score: " + best;
    }

    if (point > 3000){
        block.style.animation = "blockmove 1s linear infinite";
    } else if (point > 2000){
        block.style.animation = "blockmove 1.5s linear infinite";
    } else if (point > 1000){
        block.style.animation = "blockmove 2s linear infinite";
    } else if (point > 500){
        block.style.animation = "blockmove 2.5s linear infinite";
    }
}, 60);

// random obstacle
let blockTypes = [
    '<img src="imge/middle_lane_rock1_4.png">',
    '<img src="imge/middle_lane_rock1_2.png">',
    '<img src="imge/middle_lane_rock1_1.png">'
];



// ⭐⭐⭐ تحسين تغيير العائق على جميع الشاشات + تصادم أدق
setInterval(() => {
    const blockRect = block.getBoundingClientRect();
    const dinoRect = playcr.getBoundingClientRect();
    
    let blockRight = parseInt(window.getComputedStyle(block).getPropertyValue("right"));
    if (blockRight< -50){
        block.innerHTML = blockTypes[Math.floor(Math.random() * blockTypes.length)];}

    // collision detection (دقيق على كل الشاشات)
    const overlap =
        blockRect.left < dinoRect.right - 10 &&
        blockRect.right > dinoRect.left + 10 &&
        dinoRect.bottom > blockRect.top + 20;

    if (overlap) {
        alert("Game Over!");
        window.location.reload();
    }

}, 50);

// keyboard jump
document.addEventListener('keypress', (event) => {
    if ((event.key === " " || event.key === "Enter") &&
        !playcr.classList.contains('jump')) {
        jump();
    }
});
