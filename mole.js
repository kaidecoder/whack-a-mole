const holes = document.querySelectorAll(".hole")
const scoreBoard = document.querySelector(".score")
const moles = document.querySelectorAll(".mole")
const countdownBoard = document.querySelector(".countdown")
const startButton = document.querySelector(".start-button")

let lastHole;
let timeUp = false;
let timeLimit = 20000
let score = 0
let countdown
let birdSound
let gameOverSound

function pickRandomHole(holes){
    const randomHole = Math.floor(Math.random() * holes.length)
    const hole = holes[randomHole]
    // choose a different hole each time
    if(hole === lastHole){
        return pickRandomHole(holes)
    }
    lastHole = hole
    return hole
}


function popOut(){
    const time = Math.random() * 1300 + 800
    const hole = pickRandomHole(holes)
    hole.classList.add("up")
    setTimeout(function(){
        hole.classList.remove("up")
        if (!timeUp) {
            popOut()
        }
    }, time)
}

function startGame(){
    birdSound = new Audio("./images/birds-19624.mp3")
    birdSound.play()
    countdown = timeLimit/1000
    scoreBoard.textContent = 0
    scoreBoard.style.display = "block"
    countdownBoard.textContent = countdown
    timeUp = false
    score = 0
    popOut()
    setTimeout(function(){
        timeUp = true
    }, timeLimit)

    let startCountDown = setInterval(function(){
        countdown -= 1
        countdownBoard.textContent = countdown
        if (countdown < 0){
            countdown = 0
            clearInterval(startCountDown)
            endGame()
        }
    }, 1000)

}

function endGame(){
    birdSound.pause()
    gameOverSound = new Audio("./images/sounds_game_over.wav")
    gameOverSound.play()
    if (score > 15){
        countdownBoard.textContent = "Great Job!!"
    }else if(score > 8){
        countdownBoard.textContent = "Wow.  Keep trying!"
    }else{
        countdownBoard.textContent = "Try harder!!!"
    }
}

startButton.addEventListener("click", startGame)

function whack(e){
    let clickSound = new Audio("./images/sounds_click.wav")
    clickSound.play()
    score++
    //this refers to what I click
    this.style.backgroundImage = "url('./images/My project (1).png')"
    //disable the click functionality after 1 whack
    this.style.pointerEvents = "none"
    setTimeout(() => {
        //Need arrow here to remember what 'this' represents
        this.style.backgroundImage = "url('./images/My project.png')"
        //reengage the click function
        this.style.pointerEvents = "all"
    }, 800)
    scoreBoard.textContent = score
    
}

moles.forEach(mole => {
    return mole.addEventListener('click', whack)
})


