//* GLOBAL DOM ELEMENTS
const startScreenNode = document.querySelector("#start-screen")
const gameScreenNode = document.querySelector("#game-screen")
const gameOverScreenNode = document.querySelector("#game-over-screen")
const startBtnNode = document.querySelector("#start-btn")
const gameBoxNode = document.querySelector("#game-box")

//* GLOBAL GAME VARIABLES
let playerObj = null;
let enemiesArr = [];
let mainIntervalId = null;
let enemyIntervalId = null;

//* GLOBAL GAME FUNCTIONS
function gameStart() {

  // changing the screens
  startScreenNode.style.display = "none"
  gameScreenNode.style.display = "flex"

  // adding the initial elements of the game
  addPlayer()
  addEnemy()

  // start the main game interval
  mainIntervalId = setInterval(gameLoop, Math.round(1000/60))

  // starting other intervals
  enemyIntervalId = setInterval(addEnemy, 2000)

}

function gameLoop() {
  // console.log("running the interval")
  enemiesArr.forEach((enemy) => {
    enemy.automaticMovement()
  })
  checkEnemyDespawn()
  checkCollisionPlayerEnemy()
}

function addPlayer() {
  playerObj = new Player()
  // console.log(playerObj)
}

function addEnemy() {

  let randomPosY = Math.floor(Math.random() * 350 )
  let randomWidth = Math.floor(Math.random() * 75 ) + 25 // 25 - 100
  let randomHeight = Math.floor(Math.random() * 75 ) + 25 // 25 - 100

  let newEnemy = new Cube(randomPosY, randomWidth, randomHeight)
  enemiesArr.push(newEnemy)
  console.log(enemiesArr.length)
}

function checkEnemyDespawn() {
  if (enemiesArr[0] && enemiesArr[0].x < -100) {
    // TWO actions need to happen when removing an element from the game
    enemiesArr[0].node.remove() // remove it from the DOM
    enemiesArr.shift() // remove it from Javascript
  }
}

function checkCollision(element1, element2) {
    return (
      element1.x < element2.x + element2.width &&
      element1.x + element1.width > element2.x &&
      element1.y < element2.y + element2.height &&
      element1.y + element1.height > element2.y
    );
}

function checkCollisionPlayerEnemy() {
  enemiesArr.forEach((enemy) => {
    if (checkCollision(enemy, playerObj)) {
      console.log("collision detected, GAME OVER")
      gameOver()
    }
  })
}

function gameOver() {
  // STOP all intervals
  clearInterval(mainIntervalId)
  clearInterval(enemyIntervalId)

  // change screens
  gameScreenNode.style.display = "none"
  gameOverScreenNode.style.display = "flex"
}


//* EVENT LISTENERS
startBtnNode.addEventListener("click", gameStart)

window.addEventListener("keydown", (event) => {
  // console.log("key being pressed", event)
  if (event.code === "ArrowUp") {
    playerObj.moveUp()
  } else if (event.code === "ArrowDown") {
    playerObj.moveDown()
  }
})




