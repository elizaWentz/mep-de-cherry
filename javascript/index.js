const greenButton = document.getElementById('greenButtonimg');
const yellowButton = document.getElementById('yellowButtonimg');
const blueButton = document.getElementById('blueButtonimg');
const powerupButtonimg = document.getElementById("powerupButtonimg");
const powerupButton = document.getElementById("powerupButton");

const thierry = document.querySelector(".thierry");
const healthbar = document.querySelector(".healthBar");
const powerup = document.querySelector(".powerupBar");

const backgroundMusic = new Audio ("sound/achtergrondmuziek.mp3");
const mepSound = new Audio("sound/mep.mp3");
const schopSound = new Audio("sound/schop.mp3");
const powerupSound = new Audio("sound/emmawortelboer.mp3");
const introthierrySound = new Audio("sound/introductiethierry.mp3");
const thierryReactieSounds = [
    new Audio("sound/eeraangetast.mp3"),
    new Audio("sound/gewoonbelachelijk.mp3"),
    new Audio("sound/hetiseenschande.mp3"),
    new Audio("sound/ikbegrijpnietwaarom.mp3"),
    new Audio("sound/nietleuk.mp3"),
    new Audio("sound/hetisabsurd.mp3"),
    new Audio("sound/jehartisdicht.mp3"),
];
const thierrydefeat = new Audio("sound/jebenteenhardpersoon.mp3");
const youwin = new Audio("sound/youwin.mp3");


const healthLevels = [
    "images/healthbar/health0empty.png",
    "images/healthbar/health1.png",
    "images/healthbar/health2.png",
    "images/healthbar/health3.png",
    "images/healthbar/health4.png",
    "images/healthbar/health5.png", 
    "images/healthbar/health6.png",
];

const powerupLevels = [
    "images/powerup/power1empty.svg",
    "images/powerup/power2.svg",
    "images/powerup/power3.svg",
    "images/powerup/power4.svg",
    "images/powerup/power5.svg",
    "images/powerup/power6full.svg"
];

let loadingScreen = document.getElementById("loadingScreen");
let loadingText = document.getElementById("loadingText");
let zeroState = document.getElementById('zeroState');
let zeroStatePrompt = document.getElementById('zeroStatePrompt');
let gameOverScherm = document.getElementById('gameOverScherm');
let gameOverPrompt = document.getElementById('gameOverPrompt');
let gameOver = false;

let currentHealth = healthLevels.length;
let currentPower = 0; 

let mepCooldown = false;
let schopCooldown = false;

healthbar.style.display = "none";
powerup.style.display = "none"; 

//laadscherm
//anonieme functie
window.onload = function() {
    const dots = document.getElementById("dots");

    //fade-out text
    setTimeout(() => {
        loadingText.style.opacity = "0";

        setTimeout(() => {
            loadingText.style.display = "none"; 
        }, 500); 
    }, 3700);
    
    //fade-out scherm
    setTimeout(() => {
        loadingScreen.style.opacity = "0";

        setTimeout(() => {
            loadingScreen.style.display = "none";
        }, 1000);

        //inzoom-animatie op zeroState
        zeroState.style.transform = "scale(1)"; 
    }, 4700); 
};

function changeImage() { 
    zeroState.src = 'images/screens/background.png';

    //start achtergrondmuziek
    backgroundMusic.play();
    introthierrySound.play();

    
    zeroState.onload = function() {
        zeroStatePrompt.style.display = "none";

        thierry.style.visibility = "visible";
        thierry.style.opacity = "1";
        
        healthbar.style.display = "block";
        powerup.style.display = "block";
    };
}

blueButton.addEventListener("click", changeImage);

backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

//indruk knop effect
function pressButton(button, normalSrc, pressedSrc) {
    button.src = pressedSrc;

    // Na 200ms terug naar de normale afbeelding
    setTimeout(() => {
        button.src = normalSrc;
    }, 200);
}


/* math.floor omdat math.ceil zorgt voor afronding naar boven, oftewel een index teveel en verliest index 0*/
/*https://gomakethings.com/how-to-play-a-sound-with-javascript/*/
/*https://www.shecodes.io/athena/26906-how-to-play-a-random-audio-from-an-array-in-javascript*/
function playRandomThierryReactie() {
    thierryReactieSounds[Math.floor(Math.random() * thierryReactieSounds.length)].play();
}

function changeThierryMep() {
    thierry.src = "images/thierry/thierrymep.png";

    mepSound.play();

    setTimeout(() => {
        thierry.src = "images/thierry/thierryboos.png";
        thierry.style.opacity = "1"; 

        setTimeout(() => {
            playRandomThierryReactie();
        }, 100);
    }, 700);

    updatePowerup();
    updateHealth();
}

function changeThierrySchop() {
    thierry.src = "images/thierry/thierryschop.png";

    schopSound.play();

    setTimeout(() => {
        thierry.src = "images/thierry/thierryboos.png";
        thierry.style.opacity = "1"; 

        setTimeout(() => {
            playRandomThierryReactie();
        }, 100);
    }, 700);

    updatePowerup();
    updateHealth();
}

// is currentHealth groter dan 0, current power --
function updateHealth() {
    if (currentHealth > 0) {
        currentHealth--; // Verlaag healthwaarde
        healthbar.src = healthLevels[currentHealth];
    }
}

// is poweruplevel groter dan current power => -1, current power ++
function updatePowerup() {
    if (currentPower < powerupLevels.length - 1) {
        currentPower++;
        powerup.src = powerupLevels[currentPower];
    }


    if (currentPower === powerupLevels.length - 1) {
        blueButton.style.display = "none";
        powerupButton.style.display = "block";
    }
}

function showGameOver() {

    gameOverScherm.style.visibility = "visible";
    gameOverScherm.style.opacity = "1";
    gameOverPrompt.style.visibility = "visible";
    gameOverPrompt.style.opacity = "1";

    healthbar.style.display = "none";
    powerup.style.display = "none";
    thierry.style.display = "none"; 
    powerupButton.style.display = "none";
    blueButton.style.display = "block";

    backgroundMusic.pause();

    gameOver = true;
}

/* ChatGPT, antwoord op “Hoe maak ik een cooldown button bij een png?”, 22 maart 2025, https://chat.openai.com/chat.*/
greenButton.addEventListener("click", () => {
    if (mepCooldown) {
        return; //voorkomt trigger changeThierryMep //
    }

    mepCooldown = true; 
    greenButton.src = "images/buttons/meppushed.png";

    //bij druk op knop start functie:
    changeThierryMep();

    //Cooldown van 2 seconden
    setTimeout(() => {
        greenButton.src = "images/buttons/mep.png";
        mepCooldown = false;
    }, 2000);
});



yellowButton.addEventListener("click", () => {
    if (schopCooldown) {
        return;
    }

    schopCooldown = true;
    yellowButton.src = "images/buttons/schoppushed.png";

    changeThierrySchop();

    setTimeout(() => {
        yellowButton.src = "images/buttons/schop.png";
        schopCooldown = false;
    }, 2000);
});

blueButton.addEventListener("click", () => {
    pressButton(blueButton, "images/buttons/powerup.png", "images/buttons/bluepushed.png");

    if (gameOver==true) {
        location.reload(); // Alleen refreshen als de game voorbij is
    } else {
        changeImage(); // Start de game normaal als het nog niet Game Over is
    }
});

powerupButton.addEventListener("click", () => {
    pressButton(powerupButtonimg, "images/buttons/powerupactivated.png", "images/buttons/powerpushed.png");

    //classlist voegt CSS klasse op HTML-element
    /*https://developer.mozilla.org/en-US/docs/Web/API/Element/classList*/
    document.body.classList.add("shake-effect");

    powerupSound.play();

    // Verwijder het shake-effect na de animatie
    setTimeout(() => {
        document.body.classList.remove("shake-effect");
    }, 600);

    thierry.src = "images/thierry/thierrymep2.png";

    setTimeout(() => {
        thierry.src = "images/thierry/thierrydefeated.png";
        setTimeout(() => {
            thierrydefeat.play();
        }, 100);

        setTimeout(() => {
            showGameOver();

            setTimeout(() => {
                youwin.play();
            }, 400);
        }, 3000);
    }, 1500);
});
